import React from "react";

function Testimonials() {
  const testimonials = [
    {
     
      quote:
        "I went from getting ignored to landing 3 interviews in a week. This tool showed me exactly what my proposals were missing.",
      author: "Sarah M., Upwork Freelancer",
    },
    {
     
      quote:
        "The feedback is gold. I never realized my proposals were too generic until this tool highlighted it.",
      author: "Daniel K., Web Developer",
    },
  ];

  return (
    <section className="section-class">
      <div className="bg-amber-800 relative flex flex-col gap-20 sm:items-start md:w-[100%]  sm:gap-16 lg:gap-24">
      <header className="flex flex-col gap-2 bg-pink-800 sm:w-[64%] lg:w-[40%]">
        <h2  className="body-heading">What Freelancers Are Saying</h2>
      </header>

      <ul className="grid gap-2  bg-orange-400 relative sm:grid-cols-2 ">
        {testimonials.map((testimonial, index) => (
          <li key={index}  className="bg-black p-4 h-[250px] md:h-[200px]">
            <blockquote>
              <p className="text-lg ">"{testimonial.quote}"</p>
              <footer className="text-sm">— {testimonial.author}</footer>
            </blockquote>
          </li>
        ))}
      </ul>
      </div>
    </section>
  );
}

export default Testimonials;
