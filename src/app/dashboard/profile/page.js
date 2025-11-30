"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import { toast } from "sonner";
import { RefreshComponent } from "@/lib/utils";

export default function page() {
    const { user } = useAuth();
    const [profile, setProfile] = useState({ full_name: "", job_title: "", country: "", biography: "", image: "" });
    const [loading, setLoading] = useState(false);
    const [loadingProfile, setLoadingProfile] = useState(false);

    const fetchProfile = async () => {
        if (!user?.id) return;
        setLoadingProfile(true);
        const { data, error } = await supabase.from("user_profiles").select("*").eq("id", user.id).single();
        if (data) setProfile(data);
        if (error) toast.error("Error fetching profile: " + error.message);
        setLoadingProfile(false);
    };

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        
        if (!file.type.startsWith('image/')) {
            toast.error("Please select a valid image file");
            return;
        }

        
        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image size must be less than 5MB");
            return;
        }

        setLoading(true);
        
        try {
            const fileExt = file.name.split(".").pop().toLowerCase();
            const fileName = `${user.id}_${Date.now()}.${fileExt}`;
            const filePath = `avatars/${fileName}`;
            
           
            const { error: uploadError } = await supabase.storage
                .from("blog-bucket")
                .upload(filePath, file, { upsert: true });
                
            if (uploadError) {
                throw uploadError;
            }

          
            const { data } = supabase.storage
                .from("blog-bucket")
                .getPublicUrl(filePath);

            if (!data.publicUrl) {
                throw new Error("Failed to get public URL");
            }

            
            const { error: updateError } = await supabase
                .from("user_profiles")
                .update({ image: data.publicUrl })
                .eq("id", user.id);

            if (updateError) {
                console.error("Database update error:", updateError);
                
                toast.success("Image uploaded, but profile update failed. Please refresh the page.");
            } else {
                toast.success("Avatar updated successfully!");
            }

           
            setProfile((prev) => ({ ...prev, image: data.publicUrl }));
            
        } catch (error) {
            console.error("Image upload error:", error);
            toast.error("Error uploading image. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user?.id) {
            toast.error("User not found");
            return;
        }
        setLoading(true);

       
        const updateData = {
            full_name: profile.full_name || ''
        };

        const { error } = await supabase.from("user_profiles").update(updateData).eq("id", user.id);
        if (error) {
            toast.error("Error updating profile: " + error.message);
            setLoading(false);
            return;
        } else {
            toast.success("Profile updated successfully!");
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user?.id) {
            fetchProfile();
        }
    }, [user?.id]);

    
    if (!user) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <i className="fas fa-spinner fa-spin text-4xl text-primary mb-4"></i>
                    <p className="text-black">Loading profile...</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <section className="lg:px-33 px-5 lg:my-30 my-10 flex justify-center items-center">
                <div className="bg-linear-to-b from-primary/10 to-primary/60 border border-primary/30 backdrop-blur-md w-full p-10 rounded-2xl">
                    <form onSubmit={handleSubmit} className="space-y-10">
                        <div className="mb-10 flex justify-between items-center">
                            <div className="flex items-center gap-6">
                                <Image 
                                    src={profile?.image || "/avatar.jpg"} 
                                    width={132} 
                                    height={132} 
                                    className="rounded-full h-33 w-33 object-cover" 
                                    alt="Profile Avatar"
                                    loading="eager"
                                    priority
                                    onError={(e) => {
                                        e.target.src = "/avatar.jpg";
                                    }}
                                />
                                <input 
                                    type="file" 
                                    id="profile-image" 
                                    className="hidden" 
                                    accept="image/*"
                                    disabled={loading}
                                    onChange={handleImageUpload} 
                                />
                                <label 
                                    htmlFor="profile-image" 
                                    className={`bg-linear-to-b from-primary/10 to-primary/60 border border-primary/30 hover:from-primary/20 hover:to-primary/70 transition-all duration-500 text-[15px] text-black font-bold px-6 py-3 rounded-lg ${loading ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}`}
                                >
                                    {loading ? (
                                        <><i className="fas fa-spinner fa-spin mr-2"></i>Uploading...</>
                                    ) : (
                                        <>Upload Picture <i className="fas fa-image ms-2" /></>
                                    )}
                                </label>
                            </div>

                            <div className="text-black text-sm cursor-pointer hover:text-primary transition-colors" onClick={fetchProfile}>
                                <i className="fas fa-refresh mr-2"></i>Refresh
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-black font-medium">Full name</label>
                            <input className="bg-white/20 border border-primary/30 text-black placeholder-gray-600 p-4 rounded-lg w-full outline-none focus:border-primary/60" name="full_name" value={profile?.full_name || ''} onChange={handleChange} placeholder="Enter your full name" type="text" />
                        </div>

                        <div className="flex md:flex-row flex-col justify-between gap-6">
                            <div className="space-y-4 w-full">
                                <label className="text-black font-medium">Job Title</label>
                                <input className="bg-white/20 border border-primary/30 text-black placeholder-gray-600 p-4 rounded-lg w-full outline-none focus:border-primary/60" name="job_title" value={profile?.job_title || ''} onChange={handleChange} placeholder="Enter your job title" type="text" />
                            </div>
                            <div className="space-y-4 w-full">
                                <label className="text-black font-medium">Country</label>
                                <input className="bg-white/20 border border-primary/30 text-black placeholder-gray-600 p-4 rounded-lg w-full outline-none focus:border-primary/60" name="country" value={profile?.country || ''} onChange={handleChange} placeholder="Enter your country" type="text" />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-black font-medium">Biography</label>
                            <textarea 
                                className="bg-white/20 border border-primary/30 text-black placeholder-gray-600 p-4 rounded-lg w-full outline-none focus:border-primary/60 min-h-32" 
                                name="biography" 
                                value={profile?.biography || ''} 
                                onChange={handleChange} 
                                placeholder="Tell us about yourself"
                            />
                        </div>

                        <div className="mt-10">
                            <button type="submit" disabled={loading || !user?.id} className="bg-linear-to-b from-primary/10 to-primary/60 border border-primary/30 hover:from-primary/20 hover:to-primary/70 transition-all duration-500 text-[15px] text-black font-bold px-6 py-3 rounded-lg w-full disabled:opacity-50">
                                {loading ? "Saving..." : "Save Changes"} <i className="fas fa-save ms-1"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </section>
          
        </div>
    );
}
