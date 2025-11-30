"use client"

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export default function ConfirmEmail() {
    const [loading, setLoading] = useState(true);
    const [confirmed, setConfirmed] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const handleEmailConfirmation = async () => {
            try {
                
                const token_hash = searchParams.get('token_hash');
                const type = searchParams.get('type');

                console.log('Confirmation attempt:', { token_hash: token_hash ? 'present' : 'missing', type });

                if (token_hash && type === 'email') {
                    console.log('Verifying OTP...');
                    
                    const { data, error } = await supabase.auth.verifyOtp({
                        token_hash,
                        type: 'email'
                    });

                    if (error) {
                        console.error('Verification error:', error);
                        setError(error.message);
                        toast.error(`Confirmation failed: ${error.message}`);
                    } else {
                        console.log('Email confirmed successfully:', data);
                        setConfirmed(true);
                        toast.success("Email confirmed successfully! You can now login.");
                        
                        
                        setTimeout(() => {
                            router.push('/auth/login');
                        }, 3000);
                    }
                } else {
                    setError('Invalid confirmation link. Missing token or type.');
                    console.log('Missing parameters:', { token_hash, type });
                }
            } catch (err) {
                console.error('Confirmation error:', err);
                setError(err.message || 'An unexpected error occurred');
                toast.error('Email confirmation failed');
            } finally {
                setLoading(false);
            }
        };

        handleEmailConfirmation();
    }, [searchParams, router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="bg-linear-to-b from-primary/10 to-primary/60 backdrop-blur-md w-132 p-10 rounded-2xl text-center">
                    <div className="animate-spin text-4xl mb-4">⟳</div>
                    <h1 className="text-2xl font-bold mb-4">Confirming your email...</h1>
                    <p className="text-gray-400">Please wait while we verify your email address.</p>
                </div>
            </div>
        );
    }

    if (confirmed) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="bg-linear-to-b from-green-500/10 to-green-500/60 backdrop-blur-md w-132 p-10 rounded-2xl text-center">
                    <div className="text-6xl mb-4">✅</div>
                    <h1 className="text-2xl font-bold mb-4">Email Confirmed!</h1>
                    <p className="text-gray-400 mb-6">Your email has been successfully confirmed. You can now login to your account.</p>
                    <p className="text-sm text-gray-500">Redirecting to login page in 3 seconds...</p>
                    <div className="mt-4">
                        <Link 
                            href="/auth/login"
                            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors"
                        >
                            Go to Login
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="bg-linear-to-b from-red-500/10 to-red-500/60 backdrop-blur-md w-132 p-10 rounded-2xl text-center">
                    <div className="text-6xl mb-4">❌</div>
                    <h1 className="text-2xl font-bold mb-4">Confirmation Failed</h1>
                    <p className="text-gray-400 mb-6">{error}</p>
                    <div className="space-y-3">
                        <Link 
                            href="/auth/login"
                            className="block bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
                        >
                            Try Login Again
                        </Link>
                        <Link 
                            href="/auth/register"
                            className="block bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors"
                        >
                            Register New Account
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return null;
}