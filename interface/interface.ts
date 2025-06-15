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


export interface ResauxDistribution {
    code_reseau: string;
    nom_reseau: string;
    nom_commune: string;
}

export interface User  {
    id: string;
    name: string;
    email: string;
    favorites?: string[];
    token?: string;
};