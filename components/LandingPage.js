'use client'
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { FiArrowRight } from "react-icons/fi";

export default function LandingPage() {
  const heroRef = useRef();

  useEffect(() => {
    if (!heroRef.current) return;
    gsap.from(heroRef.current.querySelectorAll('.p-animate'), { y: 12, opacity: 0, stagger: 0.08, duration: 0.6 });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <header className="max-w-6xl mx-auto p-6 flex items-center justify-between">
        <div className="text-xl font-bold">FoundLabs — ProposalPro</div>
        <nav className="space-x-4">
          <Link href="/analyze" className="text-sm px-3 py-1 rounded-md bg-indigo-600 text-white">Try Analyzer</Link>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto p-6 grid lg:grid-cols-2 gap-8 items-center">
        <section ref={heroRef} className="p-animate">
          <motion.h1 initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.05 }} className="text-4xl font-extrabold leading-tight">
            Turn drafts into winning Upwork proposals — fast.
          </motion.h1>

          <p className="mt-4 text-lg text-slate-600 p-animate">
            Our Proposal Analyzer gives clear scores, prioritized suggestions, and a ready-to-send proposal that follows proven persuasion techniques used by top freelancers.
          </p>

          <div className="mt-6 flex gap-4">
            <Link href="/analyze" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-lg shadow hover:scale-[1.01]">
              Try the Analyzer
              <FiArrowRight />
            </Link>

            <a href="#features" className="inline-flex items-center gap-2 px-5 py-3 border rounded-lg">
              Features
            </a>
          </div>
        </section>

        <section className="bg-white rounded-xl p-6 shadow">
          <h3 className="text-lg font-semibold">What you get</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li>Detailed 13-point scoring with prioritized fixes</li>
            <li>Client-focused rewritten proposal (ready to paste)</li>
            <li>Highlight of high-impact changes — get clients faster</li>
          </ul>

          <div className="mt-6">
            <h4 className="font-medium">Live demo</h4>
            <div className="mt-3 p-3 border rounded">
              <p className="text-sm text-slate-600">Paste a short draft on the Analyzer page to try it — no signup required.</p>
            </div>
          </div>
        </section>
      </main>

      <section id="features" className="max-w-6xl mx-auto p-6">
        <h3 className="text-2xl font-bold">Features</h3>
        <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 border rounded">13-point evidence-based scoring</div>
          <div className="p-4 border rounded">Actionable suggestions & highlights</div>
          <div className="p-4 border rounded">Rewritten proposal — 120-180 words</div>
        </div>
      </section>

      <footer className="max-w-6xl mx-auto p-6 text-sm text-slate-500">© {new Date().getFullYear()} FoundLabs — ProposalPro</footer>
    </div>
  );
}