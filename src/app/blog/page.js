"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Globe } from "lucide-react";

// Kategoriye göre ikon ve arka plan rengi
const categoryStyles = {
  "Teaching Methods": {
    icon: <Globe size={14} className="text-white" />,
    bg: "bg-purple-500/80",
  },
  "Exams": {
    icon: <Globe size={14} className="text-white" />,
    bg: "bg-red-500/80",
  },
  "Language Skills": {
    icon: <Globe size={14} className="text-white" />,
    bg: "bg-green-500/80",
  },
  "Classroom Tips": {
    icon: <Globe size={14} className="text-white" />,
    bg: "bg-blue-500/80",
  },
};

// Örnek post verileri
const posts = [
  {
    id: 1,
    title: "Modern English Teaching Methodologies for 21st Century Learners",
    category: "Teaching Methods",
    date: "29 Nov 2025",
    read: "8 mins",
    img: "/article.png",
  },
  {
    id: 2,
    title: "IELTS Speaking Test: Advanced Tips & Strategies",
    category: "Exams",
    date: "28 Nov 2025",
    read: "5 mins",
    img: "/article.png",
  },
  {
    id: 3,
    title: "Teaching Business English: Corporate Communication Skills",
    category: "Language Skills",
    date: "27 Nov 2025",
    read: "4 mins",
    img: "/article.png",
  },
  {
    id: 4,
    title: "Classroom Management Tips for New English Teachers",
    category: "Classroom Tips",
    date: "25 Nov 2025",
    read: "6 mins",
    img: "/article.png",
  },
  {
    id: 5,
    title: "Interactive Grammar Teaching Techniques",
    category: "Language Skills",
    date: "26 Nov 2025",
    read: "3 mins",
    img: "/article.png",
  },
  {
    id: 6,
    title: "Effective Vocabulary Building Methods for ESL Students",
    category: "Language Skills",
    date: "25 Nov 2025",
    read: "4 mins",
    img: "/article.png",
  },
  {
    id: 7,
    title: "TOEFL Writing Section: Structure & Tips",
    category: "Exams",
    date: "24 Nov 2025",
    read: "6 mins",
    img: "/article.png",
  },
  {
    id: 8,
    title: "Teaching English Pronunciation: Phonetics Made Easy",
    category: "Language Skills",
    date: "23 Nov 2025",
    read: "5 mins",
    img: "/article.png",
  },
];

function BlogCard({ post }) {
  const category = categoryStyles[post.category];

  return (
    <Link href={`/blog/${post.id}`}>
      <div className="relative h-48 w-full rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300">
        <Image
          width={300}
          height={192}
          src={post.img}
          className="w-full h-full object-cover"
          alt={post.title}
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/60 to-transparent rounded-xl"></div>

        <div className="absolute w-full bottom-0 p-3">
          <div className="flex items-center gap-2 mb-1">
            <div className={`${category.bg} p-1 rounded-full backdrop-blur-sm`}>
              {category.icon}
            </div>
            <p className="text-white text-xs font-medium drop-shadow-lg">{post.category}</p>
          </div>

          <h4 className="text-white font-semibold text-sm mb-1 drop-shadow-lg">
            {post.title}
          </h4>

          <div className="flex items-center gap-1 text-white text-xs">
            <p>{post.date}</p>
            <p>•</p>
            <p>{post.read}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function Blog() {
  return (
    <div className="px-5 lg:px-33 py-5 my-20">
      {/* Üst Büyük Kart */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <div className="relative h-96 lg:h-[450px] rounded-xl overflow-hidden">
            <Image
              width={600}
              height={450}
              src="/article.png"
              className="w-full h-full object-cover"
              alt="Main Article"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/60 to-transparent rounded-xl"></div>
            <div className="absolute w-full bottom-0 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-purple-500/80 p-2 rounded-full backdrop-blur-sm">
                  <Globe size={20} className="text-white" />
                </div>
                <p className="text-white text-lg font-medium drop-shadow-lg">Teaching Methods</p>
              </div>
              <h1 className="text-white font-bold text-2xl lg:text-3xl mb-4 drop-shadow-lg">
                Modern English Teaching Methodologies for 21st Century Learners
              </h1>
              <div className="flex items-center gap-3 text-white text-base">
                <img className="w-10 h-10 rounded-full border-2 border-white/50" src="/avatar.jpg" alt="Avatar" />
                <p className="drop-shadow-lg">By Cemre Güner</p>
                <p>•</p>
                <p className="drop-shadow-lg">29 Nov 2025</p>
                <p>•</p>
                <p className="drop-shadow-lg">8 mins read</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sağ Küçük Kartlar */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          {posts.slice(1, 3).map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>

      {/* Alt Kısım  */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {posts.slice(3).map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
