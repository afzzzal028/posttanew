"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase-client";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) { setLoading(false); return; }
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user || null);
      setLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });
    return () => listener?.subscription?.unsubscribe();
  }, []);

  async function signUp(email, password, name) {
    if (!supabase) return { error: "Auth not configured" };
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });
    if (error) return { error: error.message };
    return { success: true, user: data.user };
  }

  async function signIn(email, password) {
    if (!supabase) return { error: "Auth not configured" };
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };
    return { success: true, user: data.user };
  }

  async function signOut() {
    if (!supabase) return;
    await supabase.auth.signOut();
  }

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
