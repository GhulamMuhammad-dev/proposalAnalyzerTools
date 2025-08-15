"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BetaInvitationSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (el) {
      gsap.fromTo(
        el.querySelectorAll(".animate-fade"),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
          },
        }
      );
    }
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#001219] py-20 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="animate-fade text-3xl md:text-4xl font-bold text-[#FFFCF2] mb-6">
          Join the Beta – Spots Are Limited
        </h2>

        <p className="animate-fade text-[#FFFCF2]/80 text-lg mb-10">
          We’re opening our beta to a small group of freelancers who want to win
          more jobs, faster. Get in early and shape the future of
          proposal-writing AI.
        </p>

        <a
          href="#"
          className="animate-fade inline-block bg-[#A7C957] text-[#001219] font-semibold py-3 px-6 rounded-xl shadow-lg hover:bg-[#95b84f] transition-colors duration-300"
        >
          Sign Up for Free Beta Access
        </a>

        <p className="animate-fade text-[#FFFCF2]/60 text-sm mt-4">
          Be among the first to gain the competitive edge.
        </p>
      </div>
    </section>
  );
}
