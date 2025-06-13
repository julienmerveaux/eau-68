import { create } from 'zustand';
import { fetchCommunes68, getDonneesPrincipalesReseau, getReseauxByCommune } from '@/services/apiHubeau';

export interface Commune {
    nom_commune: string;
    code_commune: string;
}

export interface ResauxDistribution {
    code_reseau: string;
    nom_reseau: string;
    nom_commune: string;
}

export interface DonneesPrincipalesReseau {
    date_prelevement: string;
    nom_commune: string;
    installation: string;
    service_public_distribution: string;
    conclusions_sanitaires: string;
    conformite_bacteriologique: string;
    conformite_physico_chimique: string;
    respect_references_qualite: string;
}

type CommuneStore = {
    communes: Commune[];
    resauxDistribution: ResauxDistribution[];
    donneesPrincipalesReseau: DonneesPrincipalesReseau[];
    isLoading: boolean;
    error: string | null;
    fetchCommuneHautRhin: () => Promise<void>;
    fetchReseauxByCommune: (codeCommune: string) => Promise<void>;
    fetchDonneesPrincipalesReseau: (codeReseau: string) => Promise<void>;
};

export const communeStore = create<CommuneStore>((set, get) => ({
    communes: [],
    resauxDistribution: [],
    donneesPrincipalesReseau: [],
    isLoading: false,
    error: null,

    fetchCommuneHautRhin: async () => {
        set({ isLoading: true, error: null });
        try {
            const data = await fetchCommunes68();
            set({ communes: data });
        } catch (error: any) {
            set({ error: error.message || 'Erreur inconnue lors du fetch des communes' });
        } finally {
            set({ isLoading: false });
        }
    },

    fetchReseauxByCommune: async (codeCommune: string) => {
        set({ isLoading: true, error: null });
        try {
            const data = await getReseauxByCommune(codeCommune);
            set({ resauxDistribution: data });
        } catch (error: any) {
            set({ error: error.message || 'Erreur inconnue lors du fetch des réseaux' });
        } finally {
            set({ isLoading: false });
        }
    },

    fetchDonneesPrincipalesReseau: async (codeReseau: string) => {
        set({ isLoading: true, error: null });
        try {
            const data = await getDonneesPrincipalesReseau(codeReseau);
            set({ donneesPrincipalesReseau: data });
        } catch (error: any) {
            set({ error: error.message || 'Erreur inconnue lors du fetch des données principales' });
        } finally {
            set({ isLoading: false });
        }
    }
}));
