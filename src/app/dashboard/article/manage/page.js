"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";
export default function page() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { user } = useAuth();

    const articleId = searchParams.get("id");

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [thumbnail, setThumbnail] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingArticle, setLoadingArticle] = useState(false);
    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        
        const staticCategories = [
            { id: 1, title: "Teaching Methods", slug: "teaching-methods" },
            { id: 2, title: "Language Skills", slug: "language-skills" },
            { id: 3, title: "Exams", slug: "exams" },
            { id: 4, title: "Technology", slug: "technology" },
            { id: 5, title: "Assessment", slug: "assessment" },
            { id: 6, title: "Online Teaching", slug: "online-teaching" },
            { id: 7, title: "Academic Writing", slug: "academic-writing" },
            { id: 8, title: "Communication Skills", slug: "communication-skills" }
        ];
        
        setCategories(staticCategories);
        
        
        const { data, error } = await supabase.from("categories").select("*");
        
        if (!error && data && data.length > 0) {
            setCategories(data);
        }
        
        if (!category && staticCategories.length > 0) {
            setCategory(staticCategories[0].id);
        }
    };

    const fetchArticle = async () => {
        if (articleId && user) {
            setLoadingArticle(true);

            const { data, error } = await supabase.from("article").select("*").eq("id", articleId).eq("profile_id", user?.id).single();

            if (error) {
                toast.error("Failed to load article");
                console.error("Fetch Error: ", error);
            } else {
                setTitle(data?.title);
                setContent(data?.content);
                setThumbnail(data?.thumbnail);
                setCategory(data?.category_id);
            }

            setLoadingArticle(false);
        }
    };

    useEffect(() => {
        fetchCategories();
        fetchArticle();
    }, []);

    const handleThumbnailChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setThumbnail(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const wordCount =
            content
                ?.replace(/<[^>]*>/g, "")
                ?.trim()
                ?.split(/\s+/)?.length || 0;
        const readTime = Math.ceil(wordCount / 200);

        let thumbnailUrl = "";
        if (thumbnail && thumbnail.name) {
            const fileExt = thumbnail.name.split(".").pop();
            const fileName = `${Date.now()}.${fileExt}`;
            const filePath = `${user?.id}/${fileName}`;

            const { error: uploadError } = await supabase.storage.from("blog-bucket").upload(filePath, thumbnail);

            if (uploadError) {
                toast.error("THumbnail Upload Failed");
                console.log("Upload error: ", uploadError);
                setLoading(false);
                return;
            }

            const { data: publicUrlData } = supabase.storage.from("blog-bucket").getPublicUrl(filePath);
            thumbnailUrl = publicUrlData.publicUrl;
        }

        const slug = title
            ?.toLowerCase()
            ?.trim()
            ?.replace(/[^\w\s-]/g, "") 
            .replace(/\s+/g, "-") 
            .replace(/-+/g, "-"); 

        
        if (articleId) {
            const { error } = await supabase
                .from("articles")
                .update({
                    title,
                    content,
                    category_id: category,
                    thumbnail: thumbnailUrl || undefined,
                    read_time: readTime,
                })
                .eq("id", articleId)
                .eq("profile_id", user?.id);

            if (error) {
                toast.error("Failed to update article");
                console.error("Update Error: ", error);
                setLoading(false);
                return;
            }

            toast.success("Article updated successfully");
        } else {
            const { data, error } = await supabase
                .from("articles")
                .insert({
                    title,
                    content,
                    category_id: category,
                    thumbnail: thumbnailUrl || undefined,
                    read_time: readTime,
                    slug,
                    profile_id: user?.id,
                })
                .select("id")
                .single();

            if (error) {
                toast.error("Failed to create article");
                console.error("Insert Error: ", error);
                setLoading(false);
                return;
            }

            toast.success("Article created successfully");
            
            setTimeout(() => {
                router.push('/dashboard');
            }, 1500);
        }

        setLoading(false);
    };

    return (
        <div>
           
            <section className="lg:px-33 px-5 lg:my-30 my-10 flex justify-center items-center">
                <div className="bg-linear-to-b from-primary/10 to-primary/60 border border-[#110c1f] backdrop-blur-md w-full p-10 rounded-2xl">
                    <div className="flex justify-between items-center mb-10">
                        <h1 className="lg:text-5xl text-4xl font-bold" onClick={fetchArticle}>
                            Create New Post 
                        </h1>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-10 relative">
                    
                        <div className="flex lg:flex-row flex-col gap-7 items-center">
                            <Image 
                                width={500} 
                                height={500} 
                                src={typeof thumbnail === "string" ? thumbnail : thumbnail ? URL.createObjectURL(thumbnail) : "/article.png"} 
                                className="w-160 h-80 object-cover rounded-xl" 
                                alt="Thumbnail Preview" 
                                loading="eager"
                            />
                            <div>
                                <input type="file" id="article-image" className="hidden" onChange={handleThumbnailChange} />
                                <label htmlFor="article-image" className="bg-linear-to-b from-primary/90 to-primary/60 hover:from-primary/60  hover:to-primary/90 transition-all duration-500 text-[15px] text-white font-bold px-6 py-3 rounded-lg w-full cursor-pointer">
                                    Upload Thumbnail
                                </label>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label htmlFor="title">Title</label>
                            <input
                                id="title"
                                type="text"
                                placeholder="Enter a catchy title"
                                className="border-3 p-4 rounded-lg w-full outline-none"
                                value={title}
                                onChange={(e) => {
                                    setTitle(e.target.value);
                                }}
                                required
                            />
                        </div>

                        {/* Content Field  */}
                        <div className="space-y-4">
                            <label htmlFor="content">Content</label>
                            <textarea
                                id="content"
                                type="text"
                                placeholder="Write content..."
                                className="border-3 p-4 rounded-lg w-full outline-none"
                                value={content}
                                onChange={(e) => {
                                    setContent(e.target.value);
                                }}
                                required
                            />
                        </div>

                        {/* Category  */}
                        <div className="flex md:flex-row flex-col justify-between gap-5">
                            <div className="space-y-4 w-full">
                                <label htmlFor="category" onClick={fetchCategories}>
                                    Category
                                </label>
                                <select
                                    id="category"
                                    className="border-3 p-4 rounded-lg w-full outline-none text-black font-medium"
                                    value={category || ''}
                                    onChange={(e) => {
                                        setCategory(e.target.value);
                                    }}
                                    required
                                >
                                    <option value="" disabled>Select a category...</option>
                                    {categories?.map((cat) => (
                                        <option key={cat.id} value={cat.id} className="bg-linear-to-b from-primary/10 to-primary/60 text-black">
                                            {cat.title}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="mt-10">
                            <button type="submit" className="bg-linear-to-b from-primary/90 to-primary/60 hover:from-primary/60  hover:to-primary/90 transition-all duration-500 text-[15px] text-white font-bold px-6 py-3 rounded-lg w-full cursor-pointer">
                                {loading ? (
                                    articleId ? (
                                        <>
                                            Updating Post <span className="animate-spin ms-2">⟳</span>
                                        </>
                                    ) : (
                                        <>
                                            <>
                                                Creating Post <span className="animate-spin ms-2">⟳</span>
                                            </>
                                        </>
                                    )
                                ) : articleId ? (
                                    <>
                                        Update Post <span className="ms-2">✏️</span>
                                    </>
                                ) : (
                                    <>
                                        Create Post <span className="ms-2">✏️</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
}
