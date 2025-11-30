"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";


const AuthContext = createContext({});

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    


    useEffect(() => {
        
        const getInitialSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user ?? null);
            
            if (session?.user) {
                
                try {
                    const { data: profileData, error: profileError } = await supabase
                        .from('user_profiles')
                        .select('*')
                        .eq('id', session.user.id)
                        .single();
                    
                    if (profileData) {
                        setProfile(profileData);
                    } else if (profileError && profileError.code === 'PGRST116') {
                        
                        const { data: newProfile, error: createError } = await supabase
                            .from('user_profiles')
                            .insert({
                                id: session.user.id,
                                full_name: session.user.user_metadata?.fullName || session.user.email,
                                role: 'user'
                            })
                            .select()
                            .single();
                        
                        if (!createError && newProfile) {
                            setProfile(newProfile);
                            console.log('Profile created successfully:', newProfile);
                        } else {
                            console.error('Error creating profile:', createError);
                        }
                    }
                } catch (error) {
                    console.log('Profile fetch error:', error);
                }
            }
            setLoading(false);
        };

        getInitialSession();

        
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                setUser(session?.user ?? null);
                
                if (session?.user) {
                   
                    try {
                        const { data: profileData, error: profileError } = await supabase
                            .from('user_profiles')
                            .select('*')
                            .eq('id', session.user.id)
                            .single();
                        
                        if (profileData) {
                            setProfile(profileData);
                        } else if (profileError && profileError.code === 'PGRST116') {
                            // Profile doesn't exist, create one
                            const fullName = session.user.user_metadata?.fullName || 
                                           session.user.user_metadata?.full_name || 
                                           session.user.email?.split('@')[0] || 
                                           'User';
                            
                            const { data: newProfile, error: createError } = await supabase
                                .from('user_profiles')
                                .insert({
                                    id: session.user.id,
                                    full_name: fullName,
                                    role: 'user'
                                })
                                .select()
                                .single();
                            
                            if (!createError && newProfile) {
                                setProfile(newProfile);
                            }
                        }
                    } catch (error) {
                        
                    }
                } else {
                    setProfile(null);
                }
                setLoading(false);
            }
        );

        return () => subscription.unsubscribe();
    }, []);

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (!error) {
            setUser(null);
            setProfile(null);
        }
        return { error };
    };

    const value = {
        user,
        profile,
        loading,
        signOut
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};