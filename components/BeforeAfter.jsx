import React from "react";

function BeforeAfter() {
  return (
    <section className="section-class">
    <div className="section-container">
      <header className="section-header">
        <h2 className="body-heading">Before & After Example</h2>
      </header>

      <div className="grid gap-2   relative sm:grid-cols-2 ">
        {/* Before Box */}
        <div className="basic-card-class md:h-[600px]">
          <p className="text-lg">❌ “Hi sir, I can do your work, please hire me.”</p>
        </div>

        {/* After Box */}
        <div className="basic-card-class md:h-[600px]">
          <p className="text-lg">
            ✅ “Hi [Client’s Name], I’ve reviewed your project and I’d love to
            help. Here’s how I’ll deliver results quickly and effectively…”
          </p>
        </div>
      </div>

      <p className="text-lg bg-linear-to-l from-primaryColor-400 to-indigo-700 p-4 font-semibold">See the difference? That’s the power of AI-backed optimization.</p>
     

      </div>
    </section>
  );
}

export default BeforeAfter;
