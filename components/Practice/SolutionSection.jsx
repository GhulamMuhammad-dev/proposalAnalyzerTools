"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const mockupData = [
  {
    title: "A Proposal Score",
    description: "See exactly how competitive your proposal is.",
    image: "/images/productShowCase.png",
  },
  {
    title: "Actionable Feedback",
    description: "Fix weak points before the client ever sees them.",
    image: "/images/productShowCase.png",
  },
  {
    title: "AI-Enhanced Version",
    description:
      "Get a polished, persuasive proposal that still sounds like you.",
    image: "/images/productShowCase.png",
  },
];

export default function SolutionMockupSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-loop every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % mockupData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full bg-[#001219] py-16 px-4">
      <div className="w-full h-screen overflow-hidden relative mx-auto">
        <div>
        <h2 className="subHeading">
          Meet Your AI Proposal Coach
        </h2>
        </div>

        {/* Animate the whole mockup frame */}
        <motion.div
  key={activeIndex}
  initial={{ x: 200, opacity: 0, scale: 0.95 }}
  animate={{ x: 0, opacity: 1, scale: 1 }}
  exit={{ x: -200, opacity: 0, scale: 0.95 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
  className="w-full h-[80%] rounded-2xl overflow-hidden shadow-2xl border border-gray-800 bg-[#111]"
>
  {/* Chrome bar */}
  <div className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] border-b border-gray-700 z-10 relative">
    <span className="w-3 h-3 rounded-full bg-red-500"></span>
    <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
    <span className="w-3 h-3 rounded-full bg-green-500"></span>
  </div>

  {/* Background + Content */}
  <div className="relative w-full h-[calc(100%-40px)]"> 
    {/* 👆 subtracts chrome bar height (adjust if needed) */}

    <AnimatePresence mode="wait">
      <motion.div
        key={activeIndex}
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full"
      >
        {/* ✅ background image covering full container */}
        <Image
          src={mockupData[activeIndex].image}
          alt={mockupData[activeIndex].title}
          fill
          className="object-cover"
          priority
        />

        {/* Overlay content */}
      
 <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6">
                  <h3 className="text-3xl font-semibold text-dark-color mb-4 bg-primary-color/80 px-4 py-2 rounded-lg shadow-lg">
                    {mockupData[activeIndex].title}
                  </h3>
                  <p className="text-lg text-gray-200 max-w-2xl bg-dark-color/80 px-4 py-2 rounded-lg shadow-lg">
                    {mockupData[activeIndex].description}
                  </p>
                </div>
      </motion.div>
    </AnimatePresence>
  </div>
</motion.div>

      </div>
    </section>
  );
}

