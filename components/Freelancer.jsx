import React from "react";

function Freelancer() {
  const benefits = [
    {
      icon: "⏱",
      title: "Save Hours",
      description: "No more rewriting proposals over and over.",
    },
    {
      icon: "🎯",
      title: "Land More Clients",
      description: "Increase your chances of getting interviews and job offers.",
    },
    {
      icon: "💡",
      title: "Clarity That Converts",
      description: "Know exactly where your proposal falls short.",
    },
    {
      icon: "🤝",
      title: "Sound Like a Pro",
      description:
        "Even if writing isn’t your strength, your proposals will feel persuasive and client-focused.",
    },
  ];

  return (
    <section className="section-class ">
    <div className="section-container">
      <header className="section-header">
        <h2 className="body-heading">Why Freelancers Love It</h2>
      </header>

      <ul className="grid gap-2   relative sm:grid-cols-2 lg:grid-cols-4 ">
        {benefits.map((benefit, index) => (
          <li key={index} className="basic-card-class md:h-[400px]">
              <div>{benefit.icon}</div>
             <h3 className="text-2xl font-semibold sm:text-3xl">
                {benefit.title}
              </h3>
              <p className="text-lg">{benefit.description}</p>
          </li>
        ))}
      </ul>

      </div>
    </section>
  );
}

export default Freelancer;
