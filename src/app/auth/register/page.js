"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export default function Register() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [cooldown, setCooldown] = useState(0);
    const [lastAttempt, setLastAttempt] = useState(0);

    const router = useRouter();

    // Cooldown timer
    useEffect(() => {
        if (cooldown > 0) {
            const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [cooldown]);

    const handleRegister = async (e) => {
        e.preventDefault();
        console.log('Registration form submitted'); // Debug log
        console.log('Form data:', { fullName, email, password, confirmPassword }); // Debug log
        
        // Rate limiting check
        const now = Date.now();
        if (now - lastAttempt < 10000) { // 10 second cooldown
            const remainingTime = Math.ceil((10000 - (now - lastAttempt)) / 1000);
            toast.error(`Please wait ${remainingTime} seconds before trying again`);
            return;
        }
        
        if (cooldown > 0) {
            toast.error(`Please wait ${cooldown} seconds before trying again`);
            return;
        }
        
        if (!fullName || !email || !password || !confirmPassword) {
            toast.error("Please fill in all fields");
            return;
        }

        if (fullName.trim().length < 2) {
            toast.error("Full name must be at least 2 characters long");
            return;
        }

        // Enhanced email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error("Please enter a valid email address");
            return;
        }

        // Check for common test domains that Supabase rejects
        const testDomains = ['example.com', 'test.com', 'dummy.com', 'fake.com'];
        const emailDomain = email.split('@')[1];
        if (testDomains.includes(emailDomain)) {
            toast.error("Please use a real email address. Test domains are not allowed.");
            return;
        }

        // Enhanced password validation
        if (password.length < 8) {
            toast.error("Password must be at least 8 characters long");
            return;
        }

        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
            toast.error("Password must contain at least one uppercase letter, one lowercase letter, and one number");
            console.log('Password validation failed:', password); // Debug log
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        setLoading(true);

        // Normalize email and data
        const normalizedEmail = email.toLowerCase().trim();
        const trimmedFullName = fullName.trim();

        const { data, error } = await supabase.auth.signUp({
            email: normalizedEmail,
            password,
            options: {
                data: { fullName: trimmedFullName },
                emailRedirectTo: `${window.location.origin}/auth/confirm`
            },
        });

        if (error) {
            console.error('Registration error:', error);
            setLastAttempt(Date.now());
            
            if (error.message.includes('rate limit') || error.message.includes('Too Many Requests') || error.status === 429) {
                toast.error("Too many attempts. Please wait 5 minutes before trying again.");
                setCooldown(300); // 5 minute cooldown
            } else if (error.status === 422 || error.message.includes('invalid')) {
                // More specific validation error handling
                if (error.message.includes('email')) {
                    toast.error("Invalid email format. Please check your email address.");
                } else if (error.message.includes('password')) {
                    toast.error("Password doesn't meet requirements. Use 8+ characters with uppercase, lowercase, and number.");
                } else {
                    toast.error(`Registration failed: ${error.message}`);
                }
            } else {
                toast.error(`Registration failed: ${error.message}`);
            }
            setLoading(false);
            return;
        }

        const userId = data?.user?.id;
        if (userId) {
            // Skip profile creation for now - will be handled by trigger
            console.log('User created successfully with ID:', userId);
            console.log('Profile will be created automatically by database trigger');
        }

        // Success message - check if email confirmation is needed
        if (data?.user && !data.user.email_confirmed_at) {
            toast.success("Registration successful! Please check your email to confirm your account before logging in.");
        } else {
            toast.success("Registration successful!");
        }
        
        setLoading(false);
        
        // Redirect to login page after successful registration
        setTimeout(() => {
            router.push('/auth/login');
        }, 2000);
    };

    return (
        <div>
          
            <section className="lg:px-33 px-5 lg:my-20 my-10 flex justify-center items-center">
                <div className="bg-linear-to-b from-primary/10 to-primary/60 backdrop-blur-md w-132 p-10 rounded-2xl">
                    <div className="mb-10">
                        <h1 className="lg:text-5xl text-4xl font-bold">Register </h1>
                        <p className="font-normal text-sm mt-2">Welcome! Sign up to continue.</p>
                    </div>
                    <form onSubmit={handleRegister} className="space-y-5 relative">
                        <input type="text" placeholder="Full Name" className="border-3 border-primary p-2 rounded-lg w-full outline-none" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                        <input type="email" placeholder="Email Address" className="border-3 border-primary p-2 rounded-lg w-full outline-none" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" placeholder="Password" className="border-3 border-primary p-2 rounded-lg w-full outline-none" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <input type="password" placeholder="Confirm Password" className="border-3 border-primary p-2 rounded-lg w-full outline-none" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        <button 
                            type="submit" 
                            disabled={loading || cooldown > 0} 
                            onClick={() => console.log('Button clicked!')} // Debug log
                            className="lg:flex justify-center items-center bg-linear-to-b from-primary/10 to-primary cursor-pointer text-[15px] font-bold px-6 py-3 rounded-full border-0 me-3 w-full disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    Creating Account... <span className="animate-spin">⟳</span>
                                </>
                            ) : cooldown > 0 ? (
                                <>
                                    Please wait {cooldown}s...
                                </>
                            ) : (
                                <>
                                    Create Account <span>👤</span>
                                </>
                            )}
                        </button>
                    </form>
                    <p className="font-light text-xs text-center mt-10 text-gray-300">
                        Already have an account?
                        <Link className="border-b border-dashed border-gray-300" href="/auth/login">
                            Login Now
                        </Link>
                    </p>
                </div>
            </section>
            
        </div>
    );
}
