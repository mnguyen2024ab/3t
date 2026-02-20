import { User } from '@/types/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { supabase } from '@/lib/supabase';

type AuthStore = {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, username: string) => Promise<void>;
    logout: () => Promise<void>;
};

export const useAuthStore = create<AuthStore>()(
    persist(
        (set, get) => ({
            user: null,
            isAuthenticated: false,
            login: async (email: string, password: string) => {
                try {
                    const { data, error } = await supabase.auth.signInWithPassword({
                        email,
                        password
                    })

                    if (error) throw error;
                    if (!data.user) throw new Error("Login failed: User data is missing");

                    const { user } = data;

                    const newUser: User = {
                        id: user.id,
                        email: user.email || '',
                        username: user.user_metadata?.username || 'user'
                    }

                    set({
                        user: newUser,
                        isAuthenticated: true,
                    })
                } catch (error) {
                    throw error;
                }
            },
            register: async (email: string, password: string, username: string) => {
                try {
                    const { data, error } = await supabase.auth.signUp({
                        email,
                        password,
                        options: {
                            data: {
                                username
                            }
                        }
                    })

                    if (error) throw error;
                    if (!data.user) throw new Error("Registration failed: User data is missing");

                    const { user } = data;

                    const newUser: User = {
                        id: user.id,
                        email: user.email || '',
                        username: user.user_metadata?.username || 'user'
                    }

                    set({
                        user: newUser,
                        isAuthenticated: !!data.session,
                    })
                } catch (error) {
                    throw error;
                }
            },
            logout: async () => {
                const { error } = await supabase.auth.signOut();

                if (error) {
                    throw error;
                }

                set({
                    user: null,
                    isAuthenticated: false,
                })
            },
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => AsyncStorage)
        }
    )
)

// Listen for Supabase auth state changes and sync with the store
supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        if (session?.user) {
            const newUser: User = {
                id: session.user.id,
                email: session.user.email || '',
                username: session.user.user_metadata?.username || 'user'
            }
            useAuthStore.setState({ user: newUser, isAuthenticated: true });
        }
    } else if (event === 'SIGNED_OUT') {
        useAuthStore.setState({ user: null, isAuthenticated: false });
    } else if (event === 'USER_UPDATED') {
        if (session?.user) {
            const newUser: User = {
                id: session.user.id,
                email: session.user.email || '',
                username: session.user.user_metadata?.username || 'user'
            }
            useAuthStore.setState({ user: newUser, isAuthenticated: true });
        }
    }
});