import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '../components/navbar' 
import { Footer } from '../components/footer'
import Categories from  '../components/category'
import { Globe } from "lucide-react";

export default function Blog() {
  return (
    <div className="px-5 lg:px-33 py-5 my-20">
      {/* Ana Container - Üst Kısım */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        
        {/* Sol Üst - Büyük Ana Kart (2 sütun) */}
        <div className="lg:col-span-2">
          <div className="relative h-96 lg:h-[450px]">
            <div className="relative h-full w-full rounded-xl overflow-hidden">
              <Image width={600} height={450} src="/article.png" className="w-full h-full object-contain" alt="English Teaching Methods" />
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/60 to-transparent rounded-xl"></div>
              <div className="absolute w-full bottom-0 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-purple-500/80 p-2 rounded-full backdrop-blur-sm">
                    <Globe size={20} className="text-white" />
                  </div>
                  <p className="text-white text-lg font-medium drop-shadow-lg">Teaching Methods</p>
                </div>
                <h1 className="text-white font-bold text-2xl lg:text-3xl mb-4 drop-shadow-lg">Modern English Teaching Methodologies for 21st Century Learners</h1>
                <div className="flex items-center gap-3 text-white text-base">
                  <img className="w-10 h-10 rounded-full border-2 border-white/50" src="/avatar.jpg" alt="Avatar"/>
                  <p className="drop-shadow-lg">By Cemre Güner</p>
                  <p>•</p>
                  <p className="drop-shadow-lg">29th November, 2025</p>
                  <p>•</p>
                  <p className="drop-shadow-lg">8 mins read</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sağ Üst - İki Küçük Kart Alt Alta */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          {/* Üstteki Küçük Kart */}
          <Link href="/">
            <div className="relative h-48 w-full rounded-xl overflow-hidden">
              <Image width={300} height={192} src="/article.png" className="w-full h-full object-contain" alt="IELTS Preparation" />
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/60 to-transparent rounded-xl"></div>
              <div className="absolute w-full bottom-0 p-3">
                <div className="flex items-center gap-1 mb-1">
                  <div className="bg-red-500/80 p-1 rounded-full backdrop-blur-sm">
                    <Globe size={12} className="text-white" />
                  </div>
                  <p className="text-white text-xs font-medium drop-shadow-lg">Exams</p>
                </div>
                <h3 className="text-white font-semibold text-sm mb-1 drop-shadow-lg">IELTS Speaking Test: Advanced Tips & Strategies</h3>
                <div className="flex items-center gap-1 text-white text-xs">
                  <p className="drop-shadow-lg">28 Nov</p>
                  <p>•</p>
                  <p className="drop-shadow-lg">5 min</p>
                </div>
              </div>
            </div>
          </Link>

          {/* Alttaki Küçük Kart */}
          <Link href="/">
            <div className="relative h-48 w-full rounded-xl overflow-hidden">
              <Image width={300} height={192} src="/article.png" className="w-full h-full object-contain" alt="Business English" />
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/60 to-transparent rounded-xl"></div>
              <div className="absolute w-full bottom-0 p-3">
                <div className="flex items-center gap-1 mb-1">
                  <div className="bg-green-500/80 p-1 rounded-full backdrop-blur-sm">
                    <Globe size={12} className="text-white" />
                  </div>
                  <p className="text-white text-xs font-medium drop-shadow-lg">Language Skills</p>
                </div>
                <h3 className="text-white font-semibold text-sm mb-1 drop-shadow-lg">Teaching Business English: Corporate Communication Skills</h3>
                <div className="flex items-center gap-1 text-white text-xs">
                  <p className="drop-shadow-lg">27 Nov</p>
                  <p>•</p>
                  <p className="drop-shadow-lg">4 min</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Alt Kısım - Diğer Makaleler Eşit Aralıklarla */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Makale 1 */}
        <Link href="/">
          <div className="relative h-48 w-full rounded-xl overflow-hidden">
            <Image width={280} height={192} src="/article.png" className="w-full h-full object-contain" alt="Grammar Teaching" />
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/60 to-transparent rounded-xl"></div>
            <div className="absolute w-full bottom-0 p-3">
              <div className="flex items-center gap-1 mb-1">
                <div className="bg-green-500/80 p-1 rounded-full backdrop-blur-sm">
                  <Globe size={10} className="text-white" />
                </div>
                <p className="text-white text-xs font-medium drop-shadow-lg">Language Skills</p>
              </div>
              <h4 className="text-white font-medium text-sm mb-1 drop-shadow-lg">Interactive Grammar Teaching Techniques</h4>
              <div className="flex items-center gap-1 text-white text-xs">
                <p className="drop-shadow-lg">26 Nov</p>
                <p>•</p>
                <p className="drop-shadow-lg">3 min</p>
              </div>
            </div>
          </div>
        </Link>

        {/* Makale 2 */}
        <Link href="/">
          <div className="relative h-48 w-full rounded-xl overflow-hidden">
            <Image width={280} height={192} src="/article.png" className="w-full h-full object-contain" alt="Vocabulary Building" />
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/60 to-transparent rounded-xl"></div>
            <div className="absolute w-full bottom-0 p-3">
              <div className="flex items-center gap-1 mb-1">
                <div className="bg-green-500/80 p-1 rounded-full backdrop-blur-sm">
                  <Globe size={10} className="text-white" />
                </div>
                <p className="text-white text-xs font-medium drop-shadow-lg">Language Skills</p>
              </div>
              <h4 className="text-white font-medium text-sm mb-1 drop-shadow-lg">Effective Vocabulary Building Methods for ESL Students</h4>
              <div className="flex items-center gap-1 text-white text-xs">
                <p className="drop-shadow-lg">25 Nov</p>
                <p>•</p>
                <p className="drop-shadow-lg">4 min</p>
              </div>
            </div>
          </div>
        </Link>

        {/* Makale 3 */}
        <Link href="/">
          <div className="relative h-48 w-full rounded-xl overflow-hidden">
            <Image width={280} height={192} src="/article.png" className="w-full h-full object-contain" alt="TOEFL Preparation" />
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/60 to-transparent rounded-xl"></div>
            <div className="absolute w-full bottom-0 p-3">
              <div className="flex items-center gap-1 mb-1">
                <div className="bg-red-500/80 p-1 rounded-full backdrop-blur-sm">
                  <Globe size={10} className="text-white" />
                </div>
                <p className="text-white text-xs font-medium drop-shadow-lg">Exams</p>
              </div>
              <h4 className="text-white font-medium text-sm mb-1 drop-shadow-lg">TOEFL Writing Section: Structure & Tips</h4>
              <div className="flex items-center gap-1 text-white text-xs">
                <p className="drop-shadow-lg">24 Nov</p>
                <p>•</p>
                <p className="drop-shadow-lg">6 min</p>
              </div>
            </div>
          </div>
        </Link>

        {/* Makale 4 */}
        <Link href="/">
          <div className="relative h-48 w-full rounded-xl overflow-hidden">
            <Image width={280} height={192} src="/article.png" className="w-full h-full object-contain" alt="Pronunciation Teaching" />
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/60 to-transparent rounded-xl"></div>
            <div className="absolute w-full bottom-0 p-3">
              <div className="flex items-center gap-1 mb-1">
                <div className="bg-green-500/80 p-1 rounded-full backdrop-blur-sm">
                  <Globe size={10} className="text-white" />
                </div>
                <p className="text-white text-xs font-medium drop-shadow-lg">Language Skills</p>
              </div>
              <h4 className="text-white font-medium text-sm mb-1 drop-shadow-lg">Teaching English Pronunciation: Phonetics Made Easy</h4>
              <div className="flex items-center gap-1 text-white text-xs">
                <p className="drop-shadow-lg">23 Nov</p>
                <p>•</p>
                <p className="drop-shadow-lg">5 min</p>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* İkinci Sıra - Alt Kısım Devamı */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {/* Makale 5 */}
        <Link href="/">
          <div className="relative h-48 w-full rounded-xl overflow-hidden">
            <Image width={280} height={192} src="/article.png" className="w-full h-full object-contain" alt="Online Teaching" />
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/60 to-transparent rounded-xl"></div>
            <div className="absolute w-full bottom-0 p-3">
              <div className="flex items-center gap-1 mb-1">
                <div className="bg-blue-500/80 p-1 rounded-full backdrop-blur-sm">
                  <Globe size={10} className="text-white" />
                </div>
                <p className="text-white text-xs font-medium drop-shadow-lg">Technology</p>
              </div>
              <h4 className="text-white font-medium text-sm mb-1 drop-shadow-lg">Digital Tools for Online English Teaching</h4>
              <div className="flex items-center gap-1 text-white text-xs">
                <p className="drop-shadow-lg">22 Nov</p>
                <p>•</p>
                <p className="drop-shadow-lg">7 min</p>
              </div>
            </div>
          </div>
        </Link>

        {/* Makale 6 */}
        <Link href="/">
          <div className="relative h-48 w-full rounded-xl overflow-hidden">
            <Image width={280} height={192} src="/article.png" className="w-full h-full object-contain" alt="Academic English" />
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/60 to-transparent rounded-xl"></div>
            <div className="absolute w-full bottom-0 p-3">
              <div className="flex items-center gap-1 mb-1">
                <div className="bg-purple-500/80 p-1 rounded-full backdrop-blur-sm">
                  <Globe size={10} className="text-white" />
                </div>
                <p className="text-white text-xs font-medium drop-shadow-lg">Teaching Methods</p>
              </div>
              <h4 className="text-white font-medium text-sm mb-1 drop-shadow-lg">Academic English Writing: Research Papers</h4>
              <div className="flex items-center gap-1 text-white text-xs">
                <p className="drop-shadow-lg">21 Nov</p>
                <p>•</p>
                <p className="drop-shadow-lg">9 min</p>
              </div>
            </div>
          </div>
        </Link>

        {/* Makale 7 */}
        <Link href="/">
          <div className="relative h-48 w-full rounded-xl overflow-hidden">
            <Image width={280} height={192} src="/article.png" className="w-full h-full object-contain" alt="Conversation Classes" />
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/60 to-transparent rounded-xl"></div>
            <div className="absolute w-full bottom-0 p-3">
              <div className="flex items-center gap-1 mb-1">
                <div className="bg-green-500/80 p-1 rounded-full backdrop-blur-sm">
                  <Globe size={10} className="text-white" />
                </div>
                <p className="text-white text-xs font-medium drop-shadow-lg">Language Skills</p>
              </div>
              <h4 className="text-white font-medium text-sm mb-1 drop-shadow-lg">Engaging Conversation Classes: Discussion Topics</h4>
              <div className="flex items-center gap-1 text-white text-xs">
                <p className="drop-shadow-lg">20 Nov</p>
                <p>•</p>
                <p className="drop-shadow-lg">4 min</p>
              </div>
            </div>
          </div>
        </Link>

        {/* Makale 8 */}
        <Link href="/">
          <div className="relative h-48 w-full rounded-xl overflow-hidden">
            <Image width={280} height={192} src="/article.png" className="w-full h-full object-contain" alt="ESL Assessment" />
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/60 to-transparent rounded-xl"></div>
            <div className="absolute w-full bottom-0 p-3">
              <div className="flex items-center gap-1 mb-1">
                <div className="bg-purple-500/80 p-1 rounded-full backdrop-blur-sm">
                  <Globe size={10} className="text-white" />
                </div>
                <p className="text-white text-xs font-medium drop-shadow-lg">Teaching Methods</p>
              </div>
              <h4 className="text-white font-medium text-sm mb-1 drop-shadow-lg">ESL Student Assessment: Testing & Evaluation</h4>
              <div className="flex items-center gap-1 text-white text-xs">
                <p className="drop-shadow-lg">19 Nov</p>
                <p>•</p>
                <p className="drop-shadow-lg">6 min</p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}
