import { create } from 'zustand';
// import {signUpService } from '@/services/firebaseAuth'

type User = {
  id: string;
  name: string;
  email: string;
  token?: string;
};

type UserStore = {
  user: User | null;
  isLoading: boolean;

  // --- Getters ---
  isLoggedIn: () => boolean;
  getUserName: () => string;

  // --- Setters ---
  setUser: (user: User) => void;
  clearUser: () => void;
  signUp: (name: string, email: string, password: string) => Promise<void>;

};

export const useUserStore = create<UserStore>((set, get) => ({
  user: {},
  isLoading: false,

  // --- Getters ---
  isLoggedIn: () => !!get().user,
  getUserName: () => get().user?.name ?? '',

  // --- Setters ---
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),

  signUp: async (name: string, email: string, password: string) => {
    set({ isLoading: true });
    try {
      // const data = await signUpService(name, email, password);
      // set({ user: data });
    } catch (error) {
      console.error('Erreur lors de la création du compte Firebase :', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
}));
