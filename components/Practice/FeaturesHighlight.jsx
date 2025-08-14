"use client";

import React from "react";

const features = [
  {
    title: "AI Proposal Scoring",
    description:
      "Get A Clear Score With Reasoning So You Know Where You Stand.",
    border: "border-lime-400",
  },
  {
    title: "One-Click Upgrade",
    description: "Generate A Refined, Professional Version Instantly.",
    border: "border-lime-400",
  },
  {
    title: "Smart Suggestions",
    description:
      "Specific Improvements For Tone, Clarity, And Client Appeal.",
    border: "border-blue-400",
  },
];

export default function FeatureHighlight() {
  return (
    <section className="bg-[#03151b] py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h2 className="text-white text-2xl md:text-3xl font-bold mb-10">
          Why Freelancers Love It
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            {features.slice(0, 2).map((feature, i) => (
              <div
                key={i}
                className={`flex flex-col justify-end bg-black text-white p-6 rounded-md border ${feature.border} h-48`}
              >
                <h3 className="font-bold text-lg">{feature.title}</h3>
                <p className="text-sm opacity-80 mt-2">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div
            className={`flex flex-col justify-end bg-black text-white p-6 rounded-md border ${features[2].border} h-full min-h-[24rem]`}
          >
            <h3 className="font-bold text-lg">{features[2].title}</h3>
            <p className="text-sm opacity-80 mt-2">
              {features[2].description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
