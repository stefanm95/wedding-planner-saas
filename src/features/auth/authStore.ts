import { create } from "zustand";
import { mockUser } from "../../data/mockData";
import type { User } from "../../types/domain";

type AuthState = {
  user: User | null;
  login: () => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: mockUser,
  login: () => set({ user: mockUser }),
  logout: () => set({ user: null }),
}));
