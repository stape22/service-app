import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabase/client';
const AuthContext = createContext(undefined);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        });
        // Initial session fetch
        supabase.auth.getSession().then(({ data }) => {
            setSession(data.session);
            setUser(data.session?.user ?? null);
            setLoading(false);
        });
        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);
    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        const { error, data } = await supabase.auth.signInWithPassword({ email, password });
        if (error)
            setError(error.message);
        setSession(data.session ?? null);
        setUser(data.session?.user ?? null);
        setLoading(false);
    };
    const logout = async () => {
        setLoading(true);
        setError(null);
        const { error } = await supabase.auth.signOut();
        if (error)
            setError(error.message);
        setSession(null);
        setUser(null);
        setLoading(false);
    };
    const signup = async (email, password) => {
        setLoading(true);
        setError(null);
        const { error, data } = await supabase.auth.signUp({ email, password });
        if (error)
            setError(error.message);
        setSession(data.session ?? null);
        setUser(data.session?.user ?? null);
        setLoading(false);
    };
    return (_jsx(AuthContext.Provider, { value: { user, session, loading, error, login, logout, signup }, children: children }));
};
export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx)
        throw new Error('useAuth must be used within an AuthProvider');
    return ctx;
}
