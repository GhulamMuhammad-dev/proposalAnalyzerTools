"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function SocialProofSection() {
  const sliderRef = useRef(null);

  const testimonials = [
    {
      quote:
        "I used the Analyzer on three proposals. Two got interviews the next day. This tool is a game-changer.",
      name: "Sarah K.",
      role: "Web Developer",
    },
    {
      quote:
        "The AI feedback pointed out weak spots I didn’t notice. My proposals are sharper now.",
      name: "James R.",
      role: "UI/UX Designer",
    },
    {
      quote:
        "I landed a $3k project within 48 hours of using this. The ROI is insane.",
      name: "Priya M.",
      role: "Freelance Marketer",
    },
    {
      quote:
        "It’s like having a proposal coach 24/7. My client responses doubled.",
      name: "Alex T.",
      role: "Copywriter",
    },
  ];

  useEffect(() => {
    if (sliderRef.current) {
      const totalWidth = sliderRef.current.scrollWidth / 2; // half because we duplicate
      gsap.to(sliderRef.current, {
        x: -totalWidth,
        duration: 20,
        repeat: -1,
        ease: "linear",
      });
    }
  }, []);

  return (
    <section className="bg-[#001219] py-20 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-[#FFFCF2] mb-4">
          Already Helping Freelancers Win More Work
        </h2>
        <p className="text-[#FFFCF2]/80 text-lg">
          Our beta testers have seen{" "}
          <span className="text-[#A7C957] font-semibold">
            2x more client replies
          </span>{" "}
          within the first week.
        </p>
      </div>

      <div className="relative w-full overflow-hidden">
        <div
          ref={sliderRef}
          className="flex gap-8 w-max"
          style={{ whiteSpace: "nowrap" }}
        >
          {[...testimonials, ...testimonials].map((t, i) => (
            <div
              key={i}
              className="bg-dark-color border border-primary-color rounded-2xl p-6 shadow-lg flex-shrink-0"
              style={{
                height: "200px", // fixed height
                minWidth: "250px", // prevents text from squishing
                maxWidth: "400px", // prevents overly wide cards
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                whiteSpace: "normal", // allows text wrapping
                wordWrap: "break-word", // breaks long words
              }}
            >
              <p className="text-[#FFFCF2]/90 italic">{`“${t.quote}”`}</p>
              <div>
                <p className="text-[#A7C957] font-semibold">{t.name}</p>
                <p className="text-[#FFFCF2]/60 text-sm">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
