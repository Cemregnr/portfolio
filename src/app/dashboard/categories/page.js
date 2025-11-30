"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

export default function page() {
    const { user } = useAuth();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const { data, error } = await supabase.from("categories").select("*");
        
        if (error) {
            toast.error("Failed to fetch categories");
            console.log("Categories error:", error);
        } else {
            setCategories(data || []);
        }
        setLoading(false);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin text-4xl mb-4">⟳</div>
                    <p className="text-white">Loading categories...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="">
            <section className="lg:px-33 px-5 lg:my-30 my-10">
                <div className="mb-10 relative">
                    <h1 className="lg:text-7xl text-4xl font-bold">Categories</h1>
                    <p className="italic font-normal text-sm mt-2 text-gray-500">Manage your blog categories.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-between mt-10">
                    {categories?.map((category, index) => (
                        <Link href={`/categories/${category.slug}`} key={category.id}>
                            <div className="relative h-48 w-full rounded-xl overflow-hidden group cursor-pointer bg-linear-to-b from-primary/10 to-primary/60 border border-primary/30">
                                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/60 to-transparent rounded-xl"></div>
                                <div className="absolute w-full bottom-0 p-4">
                                    <h3 className="text-white font-bold text-lg mb-2 drop-shadow-lg">{category.title}</h3>
                                    <p className="text-white/80 text-sm drop-shadow-lg">Explore articles and resources</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}