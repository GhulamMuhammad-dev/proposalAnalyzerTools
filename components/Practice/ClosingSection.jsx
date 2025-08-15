"use client";

import { motion } from "framer-motion";

export default function ClosingSection() {
  return (
    <section className="bg-[#001219] py-20 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-[#FFFCF2] mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Your Next Client Is Waiting
        </motion.h2>

        <motion.p
          className="text-[#FFFCF2]/80 text-lg mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Don’t let another great project slip away. Sign up for our free beta and start sending proposals that get noticed, get replies, and get you hired.
        </motion.p>

        <motion.a
          href="#"
          className="inline-block bg-[#A7C957] text-[#001219] font-semibold py-3 px-6 rounded-xl shadow-lg hover:bg-[#95b84f] transition-colors duration-300"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          Get Beta Access Now – Free
        </motion.a>
      </div>
    </section>
  );
}
