import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    referral_code: string;
    status: boolean;
    subscription_tier: string;
    created_at: string;
    avatar_url: string;
}

interface UserStore {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    
    // Actions
    setUser: (user: User) => void;
    clearUser: () => void;
    setLoading: (loading: boolean) => void;
    updateUser: (updates: Partial<User>) => void;
}

export const useUserStore = create<UserStore>()(
    persist(
        (set, get) => ({
            user: null,
            isAuthenticated: false,
            isLoading: false,

            setUser: (user: User) => set(() => ({
                user,
                isAuthenticated: true,
                isLoading: false
            })),

            clearUser: () => set(() => ({
                user: null,
                isAuthenticated: false,
                isLoading: false
            })),

            setLoading: (loading: boolean) => set(() => ({
                isLoading: loading
            })),

            updateUser: (updates: Partial<User>) => set((state) => ({
                user: state.user ? { ...state.user, ...updates } : null
            }))
        }),
        {
            name: "user-storage", 
        }
    )
);