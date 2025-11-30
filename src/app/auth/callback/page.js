"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AuthCallback() {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const handleAuthCallback = async () => {
            try {
               
                const { data, error } = await supabase.auth.getSession();
                
                if (error) {
                    console.error('Auth callback error:', error);
                    router.push('/auth/login?error=auth-callback-error');
                } else if (data.session) {
                    console.log('Auth callback successful:', data.session.user.email);
                    router.push('/dashboard');
                } else {
                    console.log('No session found, redirecting to login');
                    router.push('/auth/login');
                }
            } catch (err) {
                console.error('Auth callback error:', err);
                router.push('/auth/login?error=callback-error');
            } finally {
                setLoading(false);
            }
        };

        handleAuthCallback();
    }, [router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="bg-linear-to-b from-primary/10 to-primary/60 backdrop-blur-md w-132 p-10 rounded-2xl text-center">
                    <div className="animate-spin text-4xl mb-4">⟳</div>
                    <h1 className="text-2xl font-bold mb-4">Processing authentication...</h1>
                    <p className="text-gray-400">Please wait while we complete your login.</p>
                </div>
            </div>
        );
    }

    return null;
}