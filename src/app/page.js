"use client";

import Image from "next/image";
import Navbar from "./components/navbar";
import { Footer } from "./components/footer";


export default function HomePage() {
  
  return (
   <>
    <div className="container mx-auto px-4 py-8 flex flex-col items-center">
      
      <h1 className="font-bold text-black text-2xl md:text-3xl mb-4 text-center whitespace-nowrap">Shape Future Through Education</h1>
      <p className="text-lg md:text-xl leading-relaxed text-center max-w-2xl mb-8 px-4">
        Welcome to Cemre Güner's portfolio. Passionate English teacher dedicated to creating engaging learning experiences and fostering student growth through innovative teaching methods.
      </p>
     
      <div
        className="
          relative 
          w-[700px]         
          h-[600px]        
          overflow-hidden 
          transition-all 
          duration-300 
          hover:h-[450px]   
        "
      >
        <Image
          src="/education.jpg"
          alt="Profile"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="eager"
          priority
          className="object-cover"
        />
      </div>
    </div>
    </>
  );
}