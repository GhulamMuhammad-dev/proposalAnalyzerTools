"use client";

import { Lightbulb, Wand2, TrendingUp } from "lucide-react";

export default function FeatureHighlightsSection() {
  const features = [
    {
      id: 1,
      icon: <TrendingUp className="w-8 h-8 text-[#A7C957]" />,
      title: "AI Proposal Scoring",
      description:
        "Get a clear score with reasoning so you know where you stand.",
      gridClass: "md:col-start-1 md:row-start-1",
    },
    {
      id: 2,
      icon: <Lightbulb className="w-8 h-8 text-[#A7C957]" />,
      title: "Smart Suggestions",
      description:
        "Specific improvements for tone, clarity, and client appeal.",
      gridClass: "md:col-start-2 md:row-start-1 md:row-span-2",
    },
    {
      id: 3,
      icon: <Wand2 className="w-8 h-8 text-[#A7C957]" />,
      title: "One-Click Upgrade",
      description:
        "Generate a refined, professional version instantly.",
      gridClass: "md:col-start-1 md:row-start-2",
    },
  ];

  return (
    <section className="bg-dark-color py-20 px-6">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-[#FFFCF2]">
          Why Freelancers Love It
        </h2>
      </div>

      {/* Responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 md:grid-rows-2 gap-6 max-w-7xl mx-auto p-6 md:p-10">
        {features.map((f) => (
          <div
            key={f.id}
            className={`bg-dark-color border border-primary-color rounded-2xl p-6 shadow-lg text-left flex flex-col justify-end ${f.gridClass}`}
          >
            <div className="mb-4">{f.icon}</div>
            <h3 className="text-xl font-semibold text-[#FFFCF2] mb-2">
              {f.title}
            </h3>
            <p className="text-[#FFFCF2]/80 text-sm">{f.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
