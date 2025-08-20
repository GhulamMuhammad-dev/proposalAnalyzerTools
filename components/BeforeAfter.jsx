import React from "react";

function BeforeAfter() {
  return (
    <section className="section-class">
    <div className="bg-amber-800 relative flex flex-col gap-20 sm:items-start md:w-[100%]  sm:gap-16 lg:gap-24">
      <header className="flex flex-col gap-2 bg-pink-800 sm:w-[64%] lg:w-[40%]">
        <h2 className="body-heading">Before & After Example</h2>
      </header>

      <div className="grid gap-2  bg-orange-400 relative sm:grid-cols-2 ">
        {/* Before Box */}
        <div className="bg-black p-4 h-[250px] md:h-[600px]">
          <p className="text-lg">❌ “Hi sir, I can do your work, please hire me.”</p>
        </div>

        {/* After Box */}
        <div className="bg-black p-4 h-[250px] md:h-[600px]">
          <p className="text-lg">
            ✅ “Hi [Client’s Name], I’ve reviewed your project and I’d love to
            help. Here’s how I’ll deliver results quickly and effectively…”
          </p>
        </div>
      </div>

      <p className="text-lg bg-amber-950 p-4 font-semibold">See the difference? That’s the power of AI-backed optimization.</p>

      </div>
    </section>
  );
}

export default BeforeAfter;
