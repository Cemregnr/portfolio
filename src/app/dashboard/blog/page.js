"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import { formatDate } from "@/lib/utils";

export default function DashboardBlog() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    const { data, error } = await supabase
      .from("articles")
      .select(`
        id, title, content, thumbnail, slug, date_created, views,
        categories:category_id (title, slug),
        user_profiles:profile_id (full_name, image)
      `)
      .order("date_created", { ascending: false });
    if (!error && data) setArticles(data);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">⏳</div>
          <p className="text-white">Loading articles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-5 lg:px-33 py-5 my-20">
      <h1 className="text-4xl font-bold mb-8">Dashboard Blog Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.length > 0 ? (
          articles.map((article) => (
            <Link key={article.id} href={`/${article.slug}`}>
              <div className="bg-primary/30 rounded-xl p-5 flex flex-col h-full shadow-lg hover:scale-[1.02] transition-transform">
                <Image
                  width={400}
                  height={220}
                  src={article.thumbnail || "/article.png"}
                  className="w-full h-44 object-cover rounded-xl mb-4"
                  alt={article.title}
                />
                <div className="inline-flex items-center gap-2 bg-primary/80 p-1 w-auto text-xs me-2 rounded-full">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                  <p>{article.categories?.title || "Category"}</p>
                </div>
                <h1 className="text-xl font-bold drop-shadow-lg text-white line-clamp-2">{article.title}</h1>
                <div className="flex items-center gap-5 text-xs text-gray-300 font-light mt-2">
                  <div className="flex gap-1 items-center">
                    <span className="w-3 h-3 text-gray-300">👁</span>
                    <p className="font-bold mb-0">{article.views || 0} Views</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 font-semibold bg-primary/30 p-2 rounded-xl mt-auto">
                  <div className="flex items-center gap-2">
                    <Image
                      width={32}
                      height={32}
                      src={article.user_profiles?.image || "/avatar.jpg"}
                      className="w-8 h-8 object-cover rounded-full"
                      alt={article.user_profiles?.full_name || "Author"}
                    />
                    <div>
                      <h1 className="text-sm text-white font-bold mb-0">{article.user_profiles?.full_name || "Author"}</h1>
                      <p className="text-xs font-light text-gray-100 italic mt-0">English Teacher</p>
                    </div>
                  </div>
                  <div className="bg-primary/80 text-[12px] font-bold px-4 py-2 rounded-xl border border-primary/40">
                    <span className="text-white">→</span>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center text-gray-400 py-8">
            <p>No articles found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
