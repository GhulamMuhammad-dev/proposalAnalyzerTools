"use client";

export default function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: "Paste Your Proposal",
      text: "Drop in any draft proposal you’re about to send.",
      class: "md:col-span-2 md:rounded-br-4xl ",
      
    },
    {
      id: 2,
      title: "Get Instant Analysis",
      text: "Our AI scans your proposal and gives it a clear score based on persuasiveness, clarity, and client appeal.",
      class: "md:rounded-tl-4xl ",
    },
    {
      id: 3,
      title: "See What’s Weak",
      text: "Receive specific suggestions on what to fix—tone, structure, or missing client-focused details.",
      class: "md:rounded-tr-4xl",
    },
    {
      id: 4,
      title: "Get the Optimized Version",
      text: "With one click, generate a polished, high-converting proposal you can confidently submit.",
      class: "md:col-span-2 md:rounded-bl-4xl  ",
    },
  ];

  return (
    <section className="section-class">
      <div className=" section-container">
        {/* Section Heading */}
        <div className="section-header">
          <h2 className="body-heading">How It Works</h2>
          <p className="body-subheading">
            Follow these simple steps to transform your proposals instantly.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid gap-2 relative sm:grid-cols-3 ">
          {steps.map((step) => (
            <div key={step.id} className={`basic-card-class lg:h-[400px] ${step.class} `}>
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
