"use client";

import { motion } from "framer-motion";
import { CheckCircle, Clipboard, ArrowUpRight } from "lucide-react";

const steps = [
  {
    id: 1,
    icon: <Clipboard className="w-8 h-8 text-[#A7C957]" />,
    title: "Paste Your Proposal",
    description: "Drop in your existing Upwork proposal.",
  },
  {
    id: 2,
    icon: <CheckCircle className="w-8 h-8 text-[#A7C957]" />,
    title: "Get Your AI Score & Feedback",
    description: "See exactly what’s working and what’s not.",
  },
  {
    id: 3,
    icon: <ArrowUpRight className="w-8 h-8 text-[#A7C957]" />,
    title: "Upgrade & Send",
    description: "Use the AI-improved version to wow clients.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-dark-color h-screen flex items-center">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-[#FFFCF2] mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Your Path to Winning More Projects
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              className="bg-[#001219] rounded-2xl p-6 shadow-lg border border-[#A7C957]/20 hover:border-[#A7C957]/50 transition-colors duration-300"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <div className="flex justify-center mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold text-[#FFFCF2] mb-2">{step.title}</h3>
              <p className="text-[#FFFCF2]/80 text-sm">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
