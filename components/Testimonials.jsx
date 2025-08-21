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
      <div className="section-container">
      <header className="section-header">
        <h2  className="body-heading">Trusted by Freelancers Who Actually Get Results</h2>
         <p className="body-subheading">
            Real users. Real success. Real proof that better proposals bring better clients.
          </p>
      </header>

      <ul className="grid gap-2 relative sm:grid-cols-2 ">
        {testimonials.map((testimonial, index) => (
          <li key={index}  className="basic-card-class md:h-[200px]">
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
