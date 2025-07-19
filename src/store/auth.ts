import { create } from "zustand";

interface User {
  email: string;
  name: string;
}

interface AuthStore {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  register: (user: User, token: string) => void;
}

export const useAuth = create<AuthStore>((set) => ({
  user: null,
  token: null,
  login: (user, token) => {
    localStorage.setItem("token", token);
    set({ user, token });
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },
  register: (user, token) => {
    localStorage.setItem("token", token);
    set({ user, token });
  }
}));
