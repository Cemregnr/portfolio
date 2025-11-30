import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function page() {
    const articles = [
        {
            title: "Interactive Grammar Teaching Techniques for ESL Students",
            content: "Discover innovative methods to make grammar lessons engaging and memorable for English learners...",
            thumbnail: "/article.png",
            slug: "interactive-grammar-teaching-techniques",
            views: 245,
            read_time: 5,
            category: { title: "Language Skills", thumbnail: "/categories/LanguageSkills.jpeg", slug: "language-skills" },
            author: { full_name: "Cemre Güner", image: "/avatar.jpg" },
        },
        {
            title: "Effective Vocabulary Building Methods for ESL Students",
            content: "Proven strategies to help students expand their vocabulary through contextual learning and practice...",
            thumbnail: "/article.png",
            slug: "effective-vocabulary-building-methods",
            views: 320,
            read_time: 6,
            category: { title: "Language Skills", thumbnail: "/categories/LanguageSkills.jpeg", slug: "language-skills" },
            author: { full_name: "Cemre Güner", image: "/avatar.jpg" },
        },
        {
            title: "IELTS Speaking Test: Advanced Tips and Strategies",
            content: "Master the IELTS Speaking section with these proven techniques and practice methods...",
            thumbnail: "/article.png",
            slug: "ielts-speaking-test-tips-strategies",
            views: 410,
            read_time: 7,
            category: { title: "Exams", thumbnail: "/categories/Exams.jpeg", slug: "exams" },
            author: { full_name: "Cemre Güner", image: "/avatar.jpg" },
        },
        {
            title: "TOEFL Writing Section: Structure and Tips",
            content: "Learn how to structure your TOEFL writing responses for maximum impact and scoring...",
            thumbnail: "/article.png",
            slug: "toefl-writing-section-structure-tips",
            views: 290,
            read_time: 6,
            category: { title: "Exams", thumbnail: "/categories/Exams.jpeg", slug: "exams" },
            author: { full_name: "Cemre Güner", image: "/avatar.jpg" },
        },
        {
            title: "Digital Tools for Online English Teaching",
            content: "Explore the best digital platforms and tools to enhance your online English teaching experience...",
            thumbnail: "/article.png",
            slug: "digital-tools-online-english-teaching",
            views: 180,
            read_time: 5,
            category: { title: "Technology", thumbnail: "/categories/Technology.jpeg", slug: "technology" },
            author: { full_name: "Cemre Güner", image: "/avatar.jpg" },
        },
        {
            title: "Modern English Teaching Methodologies for 21st Century",
            content: "Discover innovative teaching approaches that engage today's learners and improve outcomes...",
            thumbnail: "/article.png",
            slug: "modern-english-teaching-methodologies",
            views: 520,
            read_time: 8,
            category: { title: "Teaching Methods", thumbnail: "/categories/TeachingMethods.jpeg", slug: "teaching-methods" },
            author: { full_name: "Cemre Güner", image: "/avatar.jpg" },
        },
        {
            title: "ESL Student Assessment: Testing and Evaluation Methods",
            content: "Learn effective ways to assess student progress and adapt your teaching methods accordingly...",
            thumbnail: "/article.png",
            slug: "esl-student-assessment-testing-evaluation",
            views: 195,
            read_time: 6,
            category: { title: "Assessment", thumbnail: "/categories/Assessment.jpeg", slug: "assessment" },
            author: { full_name: "Cemre Güner", image: "/avatar.jpg" },
        },
        {
            title: "Academic English Writing: Research Papers and Essays",
            content: "Master the art of academic writing with structured approaches to research papers and essays...",
            thumbnail: "/article.png",
            slug: "academic-english-writing-research-papers",
            views: 340,
            read_time: 9,
            category: { title: "Academic Writing", thumbnail: "/categories/AcademicWriting.jpeg", slug: "academic-writing" },
            author: { full_name: "Cemre Güner", image: "/avatar.jpg" },
        },
        {
            title: "Teaching Business English: Corporate Communication Skills",
            content: "Help professionals develop effective communication skills for the modern workplace...",
            thumbnail: "/article.png",
            slug: "teaching-business-english-communication",
            views: 260,
            read_time: 7,
            category: { title: "Communication Skills", thumbnail: "/categories/CommunicationSkills.jpeg", slug: "communication-skills" },
            author: { full_name: "Cemre Güner", image: "/avatar.jpg" },
        },
        {
            title: "Creating Effective Online English Courses",
            content: "Step-by-step guide to designing and delivering engaging online English learning experiences...",
            thumbnail: "/article.png",
            slug: "creating-effective-online-english-courses",
            views: 430,
            read_time: 8,
            category: { title: "Online Teaching", thumbnail: "/categories/OnlineTeaching.jpeg", slug: "online-teaching" },
            author: { full_name: "Cemre Güner", image: "/avatar.jpg" },
        },
    ];

    return (
        <div>
            <section className="lg:px-33 px-5 lg:my-30 my-10">
                <div className="relative mb-20">
                    <h1 className="lg:text-7xl text-4xl font-bold">English Learning Articles</h1>
                    <p className="italic font-normal text-sm mt-2 text-black">Explore comprehensive resources for English language learning and teaching.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
                    {articles?.map((article, index) => (
                        <div key={article.slug} className="border-2 border-black bg-linear-to-b from-primary/10 to-primary/60 rounded-xl p-2 shadow-lg h-auto">
                            <Image 
                                width={300} 
                                height={320} 
                                src={article?.thumbnail} 
                                className="w-full h-80 object-cover rounded-xl" 
                                alt={article?.title} 
                            />
                            
                            <div className="space-y-3 pt-5">
                                <div className="inline-flex items-center just gap-2 bg-primary p-1 w-auto text-xs me-2 rounded-full">
                                    <span className="w-2 h-2 bg-white rounded-full"></span>
                                    <p>{article?.category?.title}</p>
                                </div>
                                <h1 className="text-2xl font-bold drop-shadow-lg text-black">{article?.title}</h1>
                                <div className="flex items-center gap-5 text-xs text-black font-light">
                                    <div className="flex gap-1 items-center">
                                        <span className="w-3 h-3 text-black">👁</span>
                                        <p className="font-bold mb-0">{article?.views} Views</p>
                                    </div>
                                    <div className="flex gap-1 items-center">
                                        <span className="w-3 h-3 text-black">🕐</span>
                                        <p className="font-bold mb-0">{article?.read_time} Mins Read</p>
                                    </div>
                                </div>
                            </div>
                            {/* Post card footer */}
                            <div className="flex items-center justify-between gap-4 font-semibold mt-6">
                                <div className="flex items-center gap-2 bg-linear-to-b from-primary/10 to-primary/60 p-2 rounded-xl w-full min-h-[60px] h-[60px]">
                                    <Image 
                                        width={32} 
                                        height={32} 
                                        src={article?.author?.image} 
                                        className="w-8 h-8 object-cover rounded-full" 
                                        alt={article?.author?.full_name} 
                                    />
                                    <div className="flex flex-col justify-center h-full">
                                        <h1 className="text-sm text-black font-bold mb-0 flex items-center h-full">{article?.author?.full_name}</h1>
                                        <p className="text-xs font-light text-black italic mt-0 flex items-center h-full">English Teacher</p>
                                    </div>
                                </div>
                                <Link href={`/articles/${article.slug}`} className="bg-white  text-[12px] font-bold px-4 py-2 rounded-xl border border-whtie">
                                    <span className="text-primary">→</span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}