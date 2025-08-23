'use client'
import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

function FAQs() {
  const faqs = [
    {
      question: "Does it rewrite my proposal completely?",
      answer:
        "No. You keep full control. The AI gives suggestions and an optimized version you decide what to use.",
    },
    {
      question: "Will it sound robotic?",
      answer:
        "No. Our AI is trained to keep proposals natural, client-friendly, and human.",
    },
    {
      question: "Do I need to give my Upwork login?",
      answer:
        "Never. Just paste your text—we don’t need any account access.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="section-class">
      <div className="section-container">
        <header className="section-header">
          <h2 className="body-heading">Everything You’re Wondering, Answered</h2>
           <p className="body-subheading">
            Straightforward answers so you know exactly what you’re getting.
          </p>
        </header>

        <ul className={`grid gap-2 relative grid-rows-[${faqs.length}] w-full`}>
          {faqs.map((faq, index) => (
            <li key={index} className="basic-card-class h-fit">
              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full"
              >
                <span className="">{faq.question}</span>
                {openIndex === index ? (
                  <FiChevronUp className="icon-class" />
                ) : (
                  <FiChevronDown className="icon-class" />
                )}
              </button>
              {openIndex === index && <p className="text-lg bg-amber-400 p-4 text-black mt-5">{faq.answer}</p>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default FAQs;
