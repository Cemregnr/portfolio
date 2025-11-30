"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

export default function page() {
    const router = useRouter();
    const { loading, profile, user } = useAuth();
    const [stats, setStats] = useState([]);
    const [articles, setArticles] = useState([]);
    const [loadingDashboardStats, setLoadingDashboardStats] = useState(false);
    
    useEffect(() => {
        if (!loading && !user) {
            router.push('/auth/login');
        }
    }, [loading, user, router]);

    const fetchDashboardData = async () => {
        if (!user?.id) {
            return;
        }
        setLoadingDashboardStats(true);

        const { data: articles, error: articleError } = await supabase
            .from("articles")
            .select(
                `
                id, title, content, thumbnail, date_created, slug,
                categories:category_id (title),
                user_profiles:profile_id(full_name, id)
            `
            )
            .eq("profile_id", user.id)
            .order("date_created", { ascending: false });

        if (articleError) {
            toast.error("Error fetching articles");
            console.log("Error fetching articles", articleError);
            setLoadingDashboardStats(false);
            return;
        }

        const totalViews = articles?.reduce((sum, article) => sum + (article.views || 0), 0) || 0;

        const statsArray = [
            { title: "Views", value: totalViews, icon: "👁", bg: "bg-white/20", text: "text-black" },
            { title: "Posts", value: articles?.length || 0, icon: "📄", bg: "bg-white/20", text: "text-black" }
        ];

        setArticles(articles || []);
        setStats(statsArray);
        setLoadingDashboardStats(false);
    };

    const deletePost = async (postId) => {
        const { error } = await supabase.from("articles").delete().eq("id", postId);

        if (error) {
            toast.error("Error deleting post");
            console.log("Error deleting post", error);
            return;
        } else {
            toast.success("Post deleted successfully");
            setArticles((prev) => prev.filter((article) => article.id !== postId));
        }
    };

    useEffect(() => {
        if (user?.id) {
            fetchDashboardData();
        }
    }, [user?.id]); // Only depend on user.id, not entire user object

    // Don't render if user is not loaded yet
    if (!user && loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin text-4xl mb-4">⟳</div>
                    <p className="text-white">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    // Show loading while fetching data
    if (loadingDashboardStats) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin text-4xl mb-4">⟳</div>
                    <p className="text-white">Loading data...</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <section className="lg:px-33 px-5 my-20 space-y-10 z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {stats?.length > 0 ? stats?.map((stat, index) => (
                        <div key={index} className="p-5 rounded-lg flex items-center gap-4 bg-linear-to-b from-primary/10 to-primary/60 border border-primary/30">
                            <div className={`text-3xl p-3 rounded-lg ${stat?.bg} ${stat?.text} flex items-center justify-center w-12 h-12`}>
                                {stat.icon}
                            </div>
                            <div className="flex flex-col">
                                <h2 className="text-3xl font-bold text-black">{stat?.value}</h2>
                                <p className="text-sm text-gray-800">{stat?.title}</p>
                            </div>
                        </div>
                    )) : (
                        <div className="col-span-2 text-center text-gray-600 py-4">
                            Loading statistics...
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 gap-4 items-stretch">
                    <div className="p-5 rounded-lg bg-linear-to-b from-primary/10 to-primary/60 border border-primary/30 space-y-8 h-full flex flex-col" onClick={fetchDashboardData}>
                        <div className="space-y-1">
                            <h2 className="text-3xl font-bold text-black">Posts</h2>
                            <p className="text-sm text-gray-800">All Posts</p>
                        </div>
                        <div className="overflow-y-auto flex-1 max-h-80">
                            {articles?.length > 0 ? articles?.map((article, index) => (
                                <div key={article.id || index} className="border border-primary/20 py-4 px-4 mb-3 rounded-lg bg-white/10">
                                    <div className="flex gap-4 items-start">
                                        <Image 
                                            width={80} 
                                            height={80} 
                                            src={article?.thumbnail || "/assets/images/default/defaultArticle.png"} 
                                            className="w-20 h-20 object-cover rounded-md shrink-0"
                                            alt={article?.title || "Article"} 
                                        />
                                        <div className="space-y-2 flex-1">
                                            <p className="text-sm text-black font-medium line-clamp-2">{article?.title}</p>
                                            <div className="flex flex-wrap gap-2 text-xs text-gray-700">
                                                <span className="flex items-center gap-1">
                                                    <span className="w-3 h-3 flex items-center justify-center text-black">📅</span>
                                                    {formatDate(article?.date_created)}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <span className="w-3 h-3 flex items-center justify-center text-black">👁</span>
                                                    {article?.views || 0}
                                                </span>
                                            </div>
                                            <div className="flex gap-2 mt-2">
                                                <Link href={`/${article?.slug}`} className="h-8 w-8 flex items-center justify-center bg-green-700 rounded-md text-white text-xs hover:bg-green-600">
                                                    👁
                                                </Link>
                                                <Link href={`/dashboard/article?id=${article?.id}`} className="h-8 w-8 flex items-center justify-center bg-blue-700 rounded-md text-white text-xs hover:bg-blue-600">
                                                    ✏
                                                </Link>
                                                <button onClick={() => deletePost(article?.id)} className="h-8 w-8 flex items-center justify-center bg-red-700 rounded-md text-white text-xs hover:bg-red-600">
                                                    ✕
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )) : (
                                <div className="text-center text-gray-600 py-8">
                                    <p>No posts found</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
