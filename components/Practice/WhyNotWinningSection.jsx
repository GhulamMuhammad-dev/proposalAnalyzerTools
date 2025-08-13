"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const sectionsData = [
  {
    title: "Generic",
    color: "text-lime-400",
    description: "Their Proposals Sound Like Everyone Else’s.",
    image: "/images/problem1.jpg",
  },
  {
    title: "Sloppy",
    color: "text-lime-400",
    description: "Typos, Weak Openings, And Unclear Value Kill Credibility.",
    image: "/images/problem2.jpg",
  },
  {
    title: "Misaligned",
    color: "text-lime-400",
    description: "They Don’t Match The Client’s Tone And Priorities.",
    image: "/images/problem3.jpg",
  },
  {
    title: "Ignored",
    color: "text-lime-400",
    description: "Clients Skip Them Before Reading Halfway.",
    image: "/images/problem4.jpg",
  },
];

export default function WhyNotWinningSection() {
  const containerRef = useRef(null);
  const stRef = useRef(null);        // holds the ScrollTrigger instance
  const idxRef = useRef(0);          // holds the current index to avoid stale closures
  const [activeIndex, setActiveIndex] = useState(0);

  useLayoutEffect(() => {
    const panels = sectionsData.length;

    // Create ONCE
    stRef.current = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: `+=${panels * 100}%`,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      scrub: 0.7, // smooth scrub
      invalidateOnRefresh: true,
      snap: {
        // smooth snapping to each panel
        snapTo: (value) => {
          const n = panels - 1;
          return Math.round(value * n) / n;
        },
        duration: 0.6,
        ease: "power1.inOut",
      },
      onUpdate: (self) => {
        const idx = Math.round(self.progress * (panels - 1));
        if (idx !== idxRef.current) {
          idxRef.current = idx;
          setActiveIndex(idx);
        }
      },
    });

    return () => {
      stRef.current?.kill();
      stRef.current = null;
      ScrollTrigger.refresh();
    };
  }, []); // IMPORTANT: empty deps so it doesn't recreate on state change

  return (
    <section ref={containerRef} className="w-full bg-[#03131a] text-white py-20">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold mb-2">
          Why You’re Not Winning Enough Upwork Jobs
        </h2>
        <p className="text-gray-400 mb-12">
          Freelancers Lose Projects Every Day Because
        </p>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left - Buttons */}
          <div className="flex flex-col gap-6">
            {sectionsData.map((section, index) => (
              <button
                key={index}
                className={`text-2xl font-bold text-left transition-colors duration-300 ${
                  activeIndex === index
                    ? section.color
                    : "text-gray-500 hover:text-gray-300"
                }`}
                onClick={() => {
                  // Update UI immediately
                  setActiveIndex(index);
                  idxRef.current = index;

                  // Optionally move the scroll position to the matching snap point
                  const st = stRef.current;
                  if (st) {
                    const n = sectionsData.length - 1;
                    const progress = index / n;
                    const start = st.start;
                    const end = st.end;
                    const target = start + (end - start) * progress;
                    // set global scroll (supports window scroller)
                    const scroll = ScrollTrigger.scroll();
                    ScrollTrigger.scroll(target);
                  }
                }}
              >
                {section.title}
              </button>
            ))}
          </div>

          {/* Right - Card with Background Image (no Next/Image) */}
          <div
            className="relative rounded-xl overflow-hidden border border-lime-400/50 h-[360px] md:h-[420px] p-6"
            style={{
              backgroundImage: `url(${sectionsData[activeIndex].image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* dark overlay + content */}
            <div className="absolute inset-0 bg-black/45" />
            <div className="relative z-10 w-full h-full flex items-center justify-center">
              <p className="text-xl md:text-2xl font-semibold text-center max-w-md transition-opacity duration-300">
                {sectionsData[activeIndex].description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
