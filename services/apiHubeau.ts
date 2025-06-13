export interface Commune {
    code_commune: string;
    nom_commune: string;
    [key: string]: any;
}

export interface Reseau {
    code_reseau: string;
    nom_reseau: string;
    nom_commune: string;
}

export interface DonneeReseau {
    date_prelevement: string;
    nom_commune: string;
    installation: string;
    service_public_distribution: string;
    conclusions_sanitaires: string;
    conformite_bacteriologique: string;
    conformite_physico_chimique: string;
    respect_references_qualite: string;
}

// Communes via geo.api.gouv.fr (code INSEE)
export async function fetchCommunes68(): Promise<Commune[]> {
    const res = await fetch('https://geo.api.gouv.fr/departements/68/communes');
    if (!res.ok) {
        throw new Error(`Erreur communes Haut‑Rhin : ${res.status}`);
    }
    const data = await res.json();
    return data.map((c: any) => ({
        code_commune: c.code,
        nom_commune: c.nom,
    }));
}

// Réseaux pour une commune donnée
export async function getReseauxByCommune(nom_commune: string): Promise<Reseau[]> {
    const url = `https://hubeau.eaufrance.fr/api/v1/qualite_eau_potable/communes_udi?annee=2025&nom_commune=${encodeURIComponent(nom_commune)}&size=50`;

    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Erreur ${res.status} lors de la récupération des réseaux pour la commune ${nom_commune}`);
    }

    const data = await res.json();

    const reseaux = (data.data as any[]).map((item) => ({
        code_reseau: item.code_reseau,
        nom_reseau: item.nom_reseau,
        nom_commune: item.nom_commune,
    }));

    // Suppression des doublons selon nom_reseau
    const seen = new Set<string>();
    const reseauxUniques = reseaux.filter((reseau) => {
        if (seen.has(reseau.nom_reseau)) return false;
        seen.add(reseau.nom_reseau);
        return true;
    });

    return reseauxUniques;
}

// Données principales d'un réseau
export async function getDonneesPrincipalesReseau(codeReseau: string): Promise<DonneeReseau[]> {
    const url = `https://hubeau.eaufrance.fr/api/v1/qualite_eau_potable/resultats_dis?code_reseau=${codeReseau}&size=5`;

    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Erreur ${res.status} lors de la récupération des données du réseau`);
    }

    const data = await res.json();

    return (data.data as any[]).map(item => ({
        date_prelevement: item.date_prelevement,
        nom_commune: item.nom_commune,
        installation: item.nom_installation_amont ?? item.nom_uge ?? "N/A",
        service_public_distribution: item.nom_distributeur ?? "N/A",
        conclusions_sanitaires: item.conclusion_conformite_prelevement ?? "N/A",
        conformite_bacteriologique: item.conformite_references_bact_prelevement ?? "N/A",
        conformite_physico_chimique: item.conformite_references_pc_prelevement ?? "N/A",
        respect_references_qualite: item.conclusion_conformite_prelevement ?? "N/A",
    }));
}
