"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    title: "A Proposal Score",
    desc: "See exactly how competitive your proposal is.",
    img: "/images/productshowcase.png",
  },
  {
    title: "Actionable Feedback",
    desc: "Fix weak points before the client ever sees them.",
    img: "/images/problem2.jpg",
  },
  {
    title: "An AI-Enhanced Version",
    desc: "A polished, persuasive proposal that still sounds like you.",
    img: "/images/problem3.jpg",
  },
];

export default function SolutionSection() {
  const containerRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top end",
        end: `+=${steps.length * 100}%`,
        scrub: true,
        pin: true,
        onUpdate: (self) => {
          const progressIndex = Math.floor(self.progress * steps.length);
          setCurrentStep(Math.min(progressIndex, steps.length - 1));
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="bg-[#0D1414] text-white py-16 px-6 md:px-12"
    >
      {/* Heading */}
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold">
          Meet Your AI Proposal Coach
        </h2>
        <p className="text-gray-300 max-w-lg mx-auto mt-2">
          Our AI Upwork Proposal Analyzer reviews your proposal like a top-tier
          client would.
        </p>
      </div>

      {/* Chrome Mockup */}
      <div className="relative mx-auto max-w-5xl rounded-xl shadow-lg overflow-hidden">
        {/* Browser Top Bar */}
        <div className="bg-[#2D2D2D] flex items-center gap-2 px-4 py-2">
          <span className="w-3 h-3 rounded-full bg-red-500"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
          <span className="w-3 h-3 rounded-full bg-green-500"></span>
        </div>

        {/* Tilted Background */}
        <div className="relative h-[80vh] overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${steps[currentStep].img})`,
              backgroundSize:"",
              backgroundPosition: "center",
            }}
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Content (not tilted) */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
            <h3 className="text-2xl md:text-3xl font-bold">
              {steps[currentStep].title}
            </h3>
            <p className="text-gray-200 text-lg mt-2">
              {steps[currentStep].desc}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
