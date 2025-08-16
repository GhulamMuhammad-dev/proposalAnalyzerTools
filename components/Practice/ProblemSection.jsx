"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const problems = [
  {
    text: "Their Proposals Sound Like Everyone Else’s.",

  },
  {
    text: "Typos, Weak Openings, And Unclear Value Kill Credibility.",

  },
  {
    text: "They Don’t Match The Client’s Tone And Priorities.",

  },
  {
    text: "Clients Skip Them Before Reading Halfway.",

  },
];

export default function ProblemSection() {
  const [index, setIndex] = useState(0);

  // Auto-loop every 3s
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % problems.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center  px-4 ">
      <div className="relative w-full max-w-5xl overflow-hidden rounded-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
            className="relative w-full h-[300px] md:h-[400px] flex items-center justify-center rounded-2xl"
          >
 
          

            {/* Text */}
            <h2
              data-text={problems[index].text}
              className="relative z-10 text-4xl md:text-8xl font-semibold text-light-color text-center px-4
             before:content-[attr(data-text)] before:absolute before:inset-0 before:top-full
             before:text-primary-color before:opacity-40 before:scale-y-[-1]
             before:transform before:skew-x-12 before:blur-sm"
            >
              {problems[index].text}
            </h2>

            {/* Bottom tag */}
            <p
              className=" hidden md:block md:absolute  md:bottom-10  md:right-0 -translate-x-1/2 
             rotate-6 md:-rotate-5 hover:rotate-0 
             cursor-pointer bg-primary-color text-white border border-light-color 
             text-[12px] 
             px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 
             rounded z-10 
            "
            >
              You Work Hard. You Deserve Better Than Being Ignored.
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
