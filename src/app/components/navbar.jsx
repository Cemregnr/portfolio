"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Heart, Eye, Trash2, Search, Menu } from "lucide-react";
import {Sheet,SheetClose,SheetContent,SheetDescription, SheetFooter,SheetHeader, SheetTitle,  SheetTrigger,} from "@/components/ui/sheet"
  

const Navbar = () => {
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [bookmarkedArticles, setBookmarkedArticles] = useState([
    {
      id: 1,
      title: "Example Article Title",
      views: 123,
      image: "/reading.jpg"
    },
    {
      id: 2,
      title: "Sample Article Title",
      views: 256,
      link: "/"
    }
  ]);

  const handleDeleteArticle = (articleId) => {
    setBookmarkedArticles(prev => prev.filter(article => article.id !== articleId));
  };

  return(
    <div>
      <header className="flex flex-row items-center my-5 mx-5 min-h-16 justify-between container px-2 sm:px-4 md:px-8 lg:px-12 xl:px-20 py-2 sm:py-4">
        
        {/*  Blog, Dashboard, Categories, Contact */}
        <div className="flex gap-3 sm:gap-5 md:gap-8 items-center shrink-0">
          <Link href="../blog">
            <h1 className="text-xs sm:text-sm font-semibold border-b-2 border-transparent hover:border-primary transition-colors duration-200 whitespace-nowrap">Blog</h1>
          </Link>
          <div className="relative">
            <button 
              onClick={() => setDashboardOpen(!dashboardOpen)}
              className="text-xs sm:text-sm font-semibold border-b-2 border-transparent hover:border-primary transition-colors duration-200 whitespace-nowrap"
            >
              Dashboard
            </button>
            {dashboardOpen && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 min-w-48">
                <Link href="/dashboard" className="block px-4 py-2 text-sm hover:bg-gray-100">
                  Overview
                </Link>
                <Link href="/dashboard/article/manage" className="block px-4 py-2 text-sm hover:bg-gray-100">
                  Create Article
                </Link>
                <Link href="/dashboard/articles/all" className="block px-4 py-2 text-sm hover:bg-gray-100">
                  Articles
                </Link>
                <Link href="/dashboard/profile" className="block px-4 py-2 text-sm hover:bg-gray-100">
                  Edit Profile
                </Link>
              </div>
            )}
          </div>
          <Link href="../categories">
            <h1 className="text-xs sm:text-sm font-semibold border-b-2 border-transparent hover:border-primary transition-colors duration-200 whitespace-nowrap">Categories</h1>
          </Link>
          <Link href="../contact">
            <h1 className="text-xs sm:text-sm font-semibold border-b-2 border-transparent hover:border-primary transition-colors duration-200 whitespace-nowrap">Contact</h1>
          </Link>
        </div>

        {/*  Homepage */}
        <div className="hidden sm:flex justify-center flex-1">
          <Link
            href="/"
            className="text-sm bg-black rounded-md p-1 font-semibold flex items-center justify-center"
          >
            <span className="text-white mr-1">Home</span>
            <span className="w-12 h-8 rounded bg-white text-black flex items-center justify-center">
              Page
            </span>
          </Link>
        </div>

        {/* Cemre Güner, Heart, Search */}
        <div className="flex gap-2 sm:gap-4 items-center shrink-0">
          <Link href="../cemre-guner" className="hidden sm:block">
            <h1 className="text-xs sm:text-sm font-semibold border-b-2 border-transparent hover:border-primary transition-colors duration-200 whitespace-nowrap">Cemre Güner</h1>
          </Link>
          
          {/* BOOKMARKED SECTION */}
          <Dialog>
            <DialogTrigger asChild>
              <button className="flex items-center justify-center p-1 sm:p-2 hover:bg-gray-100 rounded-md transition-colors border border-gray-300">
                <Heart size={20} className="text-gray-700" />
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-xl text-black bg-linear-to-b from-primary/60 to-primary/45 border border-gray-800">
              <DialogHeader>
                <DialogTitle className="text-lg font-semibold text-black">Bookmarked Articles</DialogTitle>
              </DialogHeader>
    {bookmarkedArticles.length === 0 ? (
      <div className="text-center py-8 text-gray-600">
        <p>No bookmarked articles yet.</p>
      </div>
    ) : (
      bookmarkedArticles.map(article => (
        <div key={article.id} className="flex items-center space-x-4 mt-6">
          <div className="w-16 h-16 rounded-lg overflow-hidden">
            <img src={article.image || "/reading.jpg"} alt="Bookmarked article" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-black">{article.title}</h3>
            <div className="flex items-center gap-4 mt-2">
              <p className="text-sm text-black flex items-center gap-1">
                <Eye size={16} />
                {article.views} Views
              </p>
              <button 
                onClick={() => handleDeleteArticle(article.id)}
                className="text-red-600 hover:bg-red-600 hover:text-white transition-all duration-200 p-1 rounded"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      ))
    )}
  </DialogContent>
</Dialog>

          {/* SEARCH */}
          <Dialog>
            <DialogTrigger asChild>
              <button className="flex items-center justify-center p-1 sm:p-2 hover:bg-gray-100 rounded-md transition-colors border border-gray-300">
                <Search size={20} className="text-gray-700" />
              </button>
            </DialogTrigger> 
            <DialogContent className="max-w-xl text-black bg-linear-to-b from-primary/60 to-primary/45 border border-gray-800">
              <DialogHeader>
                <DialogTitle className="text-lg font-semibold text-black mb-4">Search Articles</DialogTitle>
                <input type="text" className="border-primary border-2 rounded-lg py-2 outline-0 focus:ring-amber-950 focus:ring-1 px-2 placeholder:text-sm text-primary font-bold " placeholder="  Search for.." name="" ></input>
              </DialogHeader>
              <div className="grid flex-1 gap-2">
                <h1 className="text-black font-semibold">{bookmarkedArticles.length} Articles Found</h1>
              </div>
              {bookmarkedArticles.length === 0 ? (
                <div className="text-center py-8 text-gray-600">
                  <p>No articles found.</p>
                </div>
              ) : (
                bookmarkedArticles.map(article => (
                  <div key={article.id} className="flex items-center space-x-4 mt-6">
                    <div className="w-16 h-16 rounded-lg overflow-hidden">
                      <img src={article.image || "/reading.jpg"} alt="Article" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-black">{article.title}</h3>
                      <p className="text-sm text-black flex items-center gap-1 mt-1">
                        <Eye size={16} />
                        {article.views} Views
                      </p>
                    </div>
                  </div>
                ))
              )}
            </DialogContent>
          </Dialog>


<Link href="/auth/login" className="hidden lg:flex bg-linear-to-b from-primary/10 to-primary/60 cursor-pointer text-[15px] font-bold px-6 py-3 rounded-full border-0 me-3">
Login
</Link>

<Sheet>
  <SheetTrigger asChild>
    <button className="flex items-center justify-center p-2 hover:bg-gray-100 rounded-md transition-colors border border-gray-300 lg:hidden">
      <Menu size={20} className="text-gray-700" />
    </button>
  </SheetTrigger>
  <SheetContent className="w-80">
    <SheetHeader>
      <SheetTitle className="text-xl font-bold text-primary">Menu</SheetTitle>
    </SheetHeader>
    <div className="flex flex-col space-y-4 mt-6">
      <Link href="../cemre-guner" className="text-base font-semibold py-2 border-b hover:text-primary transition-colors">
        Cemre Güner
      </Link>
      <Link href="../blog" className="text-base font-semibold py-2 border-b hover:text-primary transition-colors">
        Blog
      </Link>
      <Link href="../contact" className="text-base font-semibold py-2 border-b hover:text-primary transition-colors">
        Contact
      </Link>
      <Link href="/dashboard" className="text-base font-semibold py-2 border-b hover:text-primary transition-colors">
        Dashboard
      </Link>
      <Link href="/categories" className="text-base font-semibold py-2 border-b hover:text-primary transition-colors">
        Categories
      </Link>
      <Link href="/" className="text-base font-semibold py-2 border-b hover:text-primary transition-colors">
        Home Page
      </Link>
      <Link href="/auth/login" className="bg-primary text-white px-4 py-2 rounded-md text-center mt-4 hover:bg-primary/80 transition-colors">
        Login
      </Link>
    </div>
  </SheetContent>
</Sheet>
          
        </div>
      </header>
   </div> 
  );
};

export default Navbar;