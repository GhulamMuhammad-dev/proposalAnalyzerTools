"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const mockupData = [
  {
    title: "A Proposal Score",
    description: "See exactly how competitive your proposal is.",
    image: "/images/problem1.jpg",
  },
  {
    title: "Actionable Feedback",
    description: "Fix weak points before the client ever sees them.",
    image: "/images/problem2.jpg",
  },
  {
    title: "AI-Enhanced Version",
    description: "Get a polished, persuasive proposal that still sounds like you.",
    image: "/images/problem3.jpg",
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
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-[#A7C957] mb-8">
          Meet Your AI Proposal Coach
        </h2>

        {/* Chrome Mockup Frame */}
        <div className="w-full rounded-2xl overflow-hidden shadow-2xl border border-gray-800 bg-[#0a0a0a]">
          {/* Chrome bar */}
          <div className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] border-b border-gray-700">
            <span className="w-3 h-3 rounded-full bg-red-500"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
          </div>

          {/* Background + Content */}
          <div className="relative w-full h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0"
              >
                <Image
                  src={mockupData[activeIndex].image}
                  alt={mockupData[activeIndex].title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center text-center p-6">
                  <h3 className="text-3xl font-semibold text-white mb-4">
                    {mockupData[activeIndex].title}
                  </h3>
                  <p className="text-lg text-gray-200 max-w-2xl">
                    {mockupData[activeIndex].description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center mt-6 gap-3">
          {mockupData.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`w-3 h-3 rounded-full transition ${
                activeIndex === i ? "bg-[#A7C957]" : "bg-gray-600"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
