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
    <div className="bg-amber-800 relative flex flex-col gap-20 sm:items-start md:w-[100%]  sm:gap-16 lg:gap-24">
      <header className="flex flex-col gap-2 bg-pink-800 sm:w-[64%] lg:w-[40%]">
        <h2 className="body-heading">Why Freelancers Love It</h2>
      </header>

      <ul className="grid gap-2  bg-orange-400 relative sm:grid-cols-2 md:grid-cols-4 ">
        {benefits.map((benefit, index) => (
          <li key={index} className="bg-black p-4 h-[250px] md:h-[400px]">
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
