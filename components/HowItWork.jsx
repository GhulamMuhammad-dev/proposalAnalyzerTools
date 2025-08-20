"use client";

export default function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: "Paste Your Proposal",
      text: "Drop in any draft proposal you’re about to send.",
    },
    {
      id: 2,
      title: "Get Instant Analysis",
      text: "Our AI scans your proposal and gives it a clear score based on persuasiveness, clarity, and client appeal.",
    },
    {
      id: 3,
      title: "See What’s Weak",
      text: "Receive specific suggestions on what to fix—tone, structure, or missing client-focused details.",
    },
    {
      id: 4,
      title: "Get the Optimized Version",
      text: "With one click, generate a polished, high-converting proposal you can confidently submit.",
    },
  ];

  return (
    <section className="section-class">
      <div className=" bg-amber-800 relative flex flex-col gap-20 sm:items-start md:w-[100%]  sm:gap-16 lg:gap-24">
        {/* Section Heading */}
        <div className="flex flex-col gap-2 bg-pink-800 sm:w-[64%] lg:w-[40%]">
          <h2 className="body-heading">How It Works</h2>
          <p className="body-subheading">
            Follow these simple steps to transform your proposals instantly.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid gap-2  bg-orange-400 relative sm:grid-cols-2 ">
          {steps.map((step) => (
            <div key={step.id} className="bg-black p-4 h-[250px] lg:h-[400px] ">
              <h3 className="text-2xl font-semibold sm:text-3xl">
                {step.id}. {step.title}
              </h3>
              <p className="text-lg">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
