"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [cooldown, setCooldown] = useState(0);
    const [lastAttempt, setLastAttempt] = useState(0);
    const [resendingEmail, setResendingEmail] = useState(false);

    const router = useRouter();

    // Cooldown timer
    useEffect(() => {
        if (cooldown > 0) {
            const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [cooldown]);

    const resendConfirmationEmail = async () => {
        if (!email) {
            toast.error("Please enter your email address first");
            return;
        }

        setResendingEmail(true);
        try {
            const { error } = await supabase.auth.resend({
                type: 'signup',
                email: email,
                options: {
                    emailRedirectTo: `${window.location.origin}/auth/confirm`
                }
            });

            if (error) {
                console.error('Resend email error:', error);
                toast.error("Failed to resend confirmation email. Please try again.");
            } else {
                toast.success("Confirmation email sent! Check your inbox.");
            }
        } catch (err) {
            console.error('Resend error:', err);
            toast.error("Failed to resend confirmation email.");
        } finally {
            setResendingEmail(false);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        
        const now = Date.now();
        if (now - lastAttempt < 5000) { 
            const remainingTime = Math.ceil((5000 - (now - lastAttempt)) / 1000);
            toast.error(`Please wait ${remainingTime} seconds before trying again`);
            return;
        }

        if (cooldown > 0) {
            toast.error(`Please wait ${cooldown} seconds before trying again`);
            return;
        }

        if (!email || !password) {
            toast.error("Please fill in all fields");
            return;
        }

        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error("Please enter a valid email address");
            return;
        }

        setLoading(true);

        
        const normalizedEmail = email.toLowerCase().trim();

        const { data, error } = await supabase.auth.signInWithPassword({
            email: normalizedEmail,
            password,
        });

        if (error) {
            console.error('Login error:', error);
            console.error('Error details:', { status: error.status, message: error.message, code: error.code });
            setLastAttempt(Date.now());
            
            if (error.message.includes('rate limit') || error.message.includes('Too Many Requests') || error.status === 429) {
                toast.error("Too many login attempts. Please wait 2 minutes.");
                setCooldown(120); 
            } else if (error.status === 400) {
               
                if (error.message.includes('Invalid login credentials') || error.message.includes('invalid')) {
                    toast.error("Invalid credentials. Please check your email for confirmation link or resend it.", {
                        duration: 6000,
                    });
                    console.log('🚨 LOGIN HELP:');
                    console.log('1. Check your email (cemregnr9@gmail.com) for Supabase confirmation email');
                    console.log('2. Click the confirmation link in the email');
                    console.log('3. Then try logging in again with the same password: Deneme123');
                    console.log('4. If no email found, check spam folder or use "Resend Email" button');
                } else if (error.message.includes('Email not confirmed')) {
                    toast.error("Please check your email and click the confirmation link before logging in.");
                } else {
                    toast.error("Login failed. Please check your email and password.");
                }
            } else {
                toast.error(`Login failed: ${error.message}`);
            }
            setLoading(false);
            return;
        }

        toast.success("Login successful! Redirecting...");
        setLoading(false);
        router.push("/"); 
    };
    return (
        <div>
            <section className="lg:px-33 px-5 lg:my-20 my-10 flex justify-center items-center">
                <div className="bg-linear-to-b from-primary/10 to-primary/60  backdrop-blur-md w-132 p-10 rounded-2xl">
                    <div className="mb-10">
                        <h1 className="lg:text-5xl text-4xl font-bold">Login </h1>
                        <p className="font-normal text-sm mt-2">Welcome</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-5 relative">
                        <input type="email" placeholder="Email Address" className="border-3 border-primary p-2 rounded-lg w-full outline-none" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" placeholder="Password" className="border-3 border-primary p-2 rounded-lg w-full outline-none" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button type="submit" disabled={loading || cooldown > 0} className="lg:flex justify-center items-center bg-linear-to-b from-primary/10 to-primary cursor-pointer text-[15px] font-bold px-6 py-3 rounded-full border-0 me-3 w-full disabled:opacity-50 disabled:cursor-not-allowed">
                            {loading ? (
                                <>
                                    Logging In... <span className="animate-spin">⟳</span>
                                </>
                            ) : cooldown > 0 ? (
                                <>
                                    Please wait {cooldown}s...
                                </>
                            ) : (
                                <>
                                    Login <span>👤</span>
                                </>
                            )}
                        </button>
                    </form>
                    
                    <p className="font-light text-xs text-center mt-10 text-gray-300">
                        Don't have an account yet?
                        <Link className="border-b border-dashed border-gray-300" href="/auth/register">
                            Register Account
                        </Link>
                    </p>
                </div>
            </section>
        </div>
    );
}
