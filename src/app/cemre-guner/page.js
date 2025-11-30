"use client";
import { motion, useInView, useScroll } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";


export default function CemreGuner() {
 
  const skillRef = useRef(null);
  const isSkillRefInView = useInView(skillRef, { margin: "-100px" });
  const experienceRef = useRef(null);
  const isExperienceRefInView = useInView(experienceRef, { margin: "-100px" });

  return (
    <motion.div className="min-h-screen p-6">
     
      <div className="text-center mb-16">
        <div className="relative w-32 h-32 mx-auto mb-6">
          <Image
            src="/education.jpg"
            alt="Cemre Güner"
            fill
            sizes="128px"
            className="object-cover rounded-full"
          />
        </div>
        <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          Cemre Güner
        </h1>
      </div>

      <div className="space-y-16">
       
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="space-y-6 p-6 bg-transparent rounded-lg"
        >
          <h1 className="font-bold text-2xl">About Me</h1>
          <div>
            <p className="text-lg">
             With a Bachelor's degree in English Language and Literature from Beykent University, I have built a comprehensive academic foundation in linguistics, literary studies, and cross-cultural communication. Throughout my university years, I developed a deep appreciation for the structure, evolution, and expressive power of the English language, which continues to shape both my teaching philosophy and my professional identity.

Driven by a passion for education and literary analysis, I have spent three years working as an English teacher, where I had the opportunity to guide students of various ages and proficiency levels. This experience not only strengthened my communication and classroom-management skills but also allowed me to refine my ability to create engaging, student-centered learning environments. Through these years, I gained practical expertise in curriculum development, differentiated instruction, and interactive teaching methodologies—competencies I now apply across all my professional projects.

In addition to my major field of study, I completed a minor degree in Translation and Interpreting, which provided me with advanced analytical thinking, precise writing techniques, and a nuanced understanding of linguistic accuracy. This dual academic background enables me to approach language from both an educational and a professional communication perspective, offering a strong advantage in content creation, academic writing, translation, and cross-cultural interaction.

Today, I continue to combine my teaching experience, literary insight, and translation expertise to contribute to projects focused on language education, content development, and effective communication. My goal is to support learners and readers through clear, well-structured, and impactful use of English, while continuously expanding my professional capabilities in the field of language studies.

            </p>
          </div>
        </motion.div>

        
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="space-y-6 p-6 bg-transparent rounded-lg"
        >
          <div className="flex flex-col gap-12 justify-center" ref={skillRef}>
            {/* SKILL TITLE */}
            <motion.h1
              initial={{ x: "-300px" }}
              animate={isSkillRefInView ? { x: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="font-bold text-2xl"
            >
              My Skills
            </motion.h1>
            {/* SKILL LIST */}
            <motion.div
              initial={{ x: "-300px" }}
              animate={isSkillRefInView ? { x: 0 } : {}}
              className="flex gap-4 flex-wrap"
            >
              <div className="rounded p-2 text-xs text-center cursor-pointer bg-primary text-white hover:bg-white hover:text-black transition-colors">English Teaching</div>
              <div className="rounded p-2 text-xs text-center cursor-pointer bg-primary text-white hover:bg-white hover:text-black transition-colors">Curriculum Development</div>
              <div className="rounded p-2 text-xs text-center cursor-pointer bg-primary text-white hover:bg-white hover:text-black transition-colors">Student Engagement</div>
              <div className="rounded p-2 text-xs text-center cursor-pointer bg-primary text-white hover:bg-white hover:text-black transition-colors">Language Assessment</div>
              <div className="rounded p-2 text-xs text-center cursor-pointer bg-primary text-white hover:bg-white hover:text-black transition-colors">Educational Technology</div>
              <div className="rounded p-2 text-xs text-center cursor-pointer bg-primary text-white hover:bg-white hover:text-black transition-colors">Classroom Management</div>
              <div className="rounded p-2 text-xs text-center cursor-pointer bg-primary text-white hover:bg-white hover:text-black transition-colors">Digital Literacy</div>
              <div className="rounded p-2 text-xs text-center cursor-pointer bg-primary text-white hover:bg-white hover:text-black transition-colors">Adaptability</div>
              <div className="rounded p-2 text-xs text-center cursor-pointer bg-primary text-white hover:bg-white hover:text-black transition-colors">Technological Integration</div>
              <div className="rounded p-2 text-xs text-center cursor-pointer bg-primary text-white hover:bg-white hover:text-black transition-colors">Communication</div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="space-y-6 p-6 bg-transparent rounded-lg"
        >
          <div className="flex flex-col gap-12 justify-center relative w-full max-w-4xl mx-auto" ref={experienceRef}>
            <motion.h1
              initial={{ x: "-300px" }}
              animate={isExperienceRefInView ? { x: "0" } : {}}
              transition={{ delay: 0.2, duration: 1 }}
              className="font-bold text-2xl text-center mb-8"
            >
              Experience
            </motion.h1>
            <motion.div
              initial={{ x: "-300px" }}
              animate={isExperienceRefInView ? { x: "0" } : {}}
              transition={{ delay: 0.4, duration: 1 }}
              className="w-full flex flex-col gap-12 justify-center mt-8"
            >
              <div className="flex justify-between h-48">
                <div className="w-1/3">
                  <div className="bg-primary p-3 font-semibold text-white rounded text-sm">English Teacher and Class Advisor</div>
                  <div className="text-sm italic leading-relaxed">Develop and deliver tailored lesson plans addressing students needs and learning styles. Support students' academic process and personal development as a class advisor. Organiza extracurricular activities, including performances, bulletin board displays and educational trips to enhance students engagement. </div>
                  <div className="text-black text-sm font-semibold">Era College</div>
                  <div className="inline-block px-3 py-1 rounded bg-primary/30 text-sm font-semibold">2025 - Present</div>
                </div>
                <div className="w-1/6 flex justify-center">
                  <div className="w-1 h-full bg-gray-600 rounded relative">
                    <div className="absolute w-5 h-5 rounded-full ring-4 ring-primary bg-white -left-2 top-0"></div>
                  </div>
                </div>
                <div className="w-1/3"></div>
              </div>

              <div className="flex justify-between h-48">
                <div className="w-1/3"></div>
                <div className="w-1/6 flex justify-center">
                  <div className="w-1 h-full bg-gray-600 rounded relative">
                    <div className="absolute w-5 h-5 rounded-full ring-4 ring-primary bg-white -left-2 top-0"></div>
                  </div>
                </div>
                <div className="w-1/3">
                  <div className="bg-primary p-3 font-semibold text-white rounded text-sm">English Teacher</div>
                  <div className="text-sm italic leading-relaxed">Designed and implemented creative teaching methods to foster a passion for literature and language. Coordinated extracurricular activities to promote collaboration and a positive classroom community.</div>
                  <div className="text-black text-sm font-semibold">Sadabad Anatolian High School</div>
                  <div className="inline-block px-3 py-1 rounded bg-primary/30 text-sm font-semibold">2022-2023</div>
                </div>
              </div>

              <div className="flex justify-between h-48">
                <div className="w-1/3">
                  <div className="bg-primary p-3 font-semibold text-white rounded text-sm">Junior Teacher</div>
                  <div className="text-sm italic leading-relaxed">Created engaging lesson plans to clarify complex concepts and accomodate various learning styles. Delivered lesson that enhanced students' comprehension and language skills.</div>
                  <div className="text-black text-sm font-semibold">Fatih Atatürk Contemporary Life Multi-Program Anatolian High School </div>
                  <div className="inline-block px-3 py-1 rounded bg-primary/30 text-sm font-semibold">2021 - 2022</div>
                </div>
                <div className="w-1/6 flex justify-center">
                  <div className="w-1 h-full bg-gray-600 rounded relative">
                    <div className="absolute w-5 h-5 rounded-full ring-4 ring-primary bg-white -left-2 top-0"></div>
                  </div>
                </div>
                <div className="w-1/3"></div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}