"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function page() {
    const [categories, setCategories] = useState([
        { id: 1, title: "Teaching Methods", thumbnail: "/categories/TeachingMethods.jpeg", slug: "teaching-methods" },
        { id: 2, title: "Language Skills", thumbnail: "/categories/LanguageSkills.jpeg", slug: "language-skills" },
        { id: 3, title: "Exams", thumbnail: "/categories/Exams.jpeg", slug: "exams" },
        { id: 4, title: "Technology", thumbnail: "/categories/Technology.jpeg", slug: "technology" },
        { id: 5, title: "Assessment", thumbnail: "/categories/Assessment.jpeg", slug: "assessment" },
        { id: 6, title: "Online Teaching", thumbnail: "/categories/OnlineTeaching.jpeg", slug: "online-teaching" },
        { id: 7, title: "Academic Writing", thumbnail: "/categories/AcademicWriting.jpeg", slug: "academic-writing" },
        { id: 8, title: "Communication Skills", thumbnail: "/categories/CommunicationSkills.jpeg", slug: "communication-skills" }
    ]);
    return (
        <div className="">
            <section className="lg:px-33 px-5 lg:my-30 my-10">
                <div className="mb-10 relative">
                    <h1 className="lg:text-7xl text-4xl font-bold">English Learning Categories</h1>
                    <p className="italic font-normal text-sm mt-2 text-gray-500">Explore different areas of English language learning and teaching methodologies.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-between mt-10">
                    {categories?.map((category, index) => (
                        <Link href={`/categories/${category.slug}`} key={category.id}>
                            <div className="relative h-48 w-full rounded-xl overflow-hidden group cursor-pointer">
                                <Image 
                                    width={300} 
                                    height={192} 
                                    src={category.thumbnail} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                                    alt={category.title} 
                                />
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
