"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const problems = [
  {
    text: "Their Proposals Sound Like Everyone Else’s.",
    bg: "/images/problem1.jpg", // Replace with your image paths
  },
  {
    text: "Typos, Weak Openings, And Unclear Value Kill Credibility.",
    bg: "/images/problem2.jpg",
  },
  {
    text: "They Don’t Match The Client’s Tone And Priorities.",
    bg: "/images/problem3.jpg",
  },
  {
    text: "Clients Skip Them Before Reading Halfway.",
    bg: "/images/bg4.jpg",
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
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-dark-color px-4">
      <div className="relative w-full max-w-5xl overflow-hidden rounded-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
            className="relative w-full h-[300px] md:h-[400px] flex items-center justify-center rounded-2xl"
            style={{
              backgroundImage: `url(${problems[index].bg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-dark-color/50 rounded-2xl border border-primary-color"></div>

            {/* Text */}
            <h2 className="relative z-10 text-2xl md:text-3xl font-semibold text-light-color text-center px-4">
              {problems[index].text}
            </h2>

            {/* Bottom tag */}
            <p className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-primary-color text-white text-sm px-4 py-1 rounded z-10">
              You Work Hard. You Deserve Better Than Being Ignored.
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
