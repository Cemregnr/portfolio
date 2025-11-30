"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function CreatePost() {
  const { user } = useAuth();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Teaching Methods");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("You must be logged in");

    setLoading(true);

    const { data, error } = await supabase.from("articles").insert([
      {
        title,
        content,
        category,
        profile_id: user.id,
      },
    ]);

    if (error) {
      console.log("Insert Error:", error);
      alert("Failed to create post");
    } else {
      alert("Post created successfully!");
      router.push("/blog"); // Blog sayfasına yönlendir
    }

    setLoading(false);
  };

  return (
    <div className="px-5 py-10">
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border rounded-lg"
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-3 border rounded-lg h-40"
          required
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-3 border rounded-lg"
        >
          <option value="Teaching Methods">Teaching Methods</option>
          <option value="Exams">Exams</option>
          <option value="Language Skills">Language Skills</option>
          <option value="Classroom Tips">Classroom Tips</option>
        </select>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  );
}
