import { create } from 'zustand';
import {
  signUpService,
  loginService,
  removeFavoriteCommune, addFavoriteCommune, logoutService,
} from '@/services/firebaseAuth';

import {User} from "@/interface/interface"

type UserStore = {
  user: User | null;
  isLoading: boolean;

  // --- Getters ---
  isLoggedIn: () => boolean;
  getUserName: () => string;
  getUser:() => any;


  // --- Setters ---
  setUser: (user: User) => void;
  clearUser: () => void;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  addFavoriteCommune: (commune: string) => Promise<void>;
  deleteFavoriteCommune: (commune: string) => Promise<void>;
  deconnected: () => Promise<void>;
};

export const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  isLoading: false,

  // --- Getters ---
  isLoggedIn: () => !!get().user,
  getUserName: () => get().user?.name ?? '',
  getUser: () => get().user ?? '',

  // --- Setters ---
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),

  signUp: async (name, email, password) => {
    set({ isLoading: true });
    try {
      const data = await signUpService(name, email, password);
      set({ user: { ...data, favorites: [] } }); // on initialise avec un tableau vide
    } catch (error) {
      console.error('Erreur lors de la création du compte Firebase :', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const data = await loginService(email, password);
      set({ user: data });
      set({isLoggedIn : true})
    } catch (error) {
      console.error('Erreur lors de la connexion Firebase :', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  addFavoriteCommune: async (commune: string) => {
    set({ isLoading: true });
    try {
      await addFavoriteCommune(commune);
      const updatedUser = get().user;
      if (updatedUser) {
        const currentFavorites = updatedUser.favorites || [];
        set({
          user: {
            ...updatedUser,
            favorites: [...currentFavorites, commune],
          },
        });
      }
    } catch (error) {
      console.error('Erreur lors de l’ajout aux favoris :', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  deleteFavoriteCommune: async (commune) => {
    set({ isLoading: true });
    try {
      await removeFavoriteCommune(commune);
      const updatedUser = get().user;
      if (updatedUser) {
        set({
          user: {
            ...updatedUser,
            favorites: updatedUser.favorites.filter((fav) => fav !== commune),
          },
        });
      }
    } catch (error) {
      console.error('Erreur lors de la suppression des favoris :', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  deconnected: async () => {
    try {
      await logoutService();
      set({user: null});
    }catch (e) {
      console.error(e);
    }
  }
}));
