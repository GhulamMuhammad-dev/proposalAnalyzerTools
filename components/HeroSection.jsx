import React from "react";


const HeroSection = () => {
  return (
    <>
   <section className=" section-class">
    <div className=" bg-amber-800 flex flex-col gap-2 sm:items-start md:w-[80%] lg:w-[56%] lg:gap-4">
       <h1 className=" hero-heading ">Win More Upwork Clients With Smarter Proposals</h1>
       <h4 className="hero-subheading">Stop guessing what clients want. Our AI Proposal Analyzer reviews your proposal like a top-tier client would then gives you a score, actionable feedback, and an optimized version ready to send.</h4>
       <button className="bg-orange-600 p-4 rounded-lg">Analyze Now</button>
    </div>
   </section>
   </>
  );
};

export default HeroSection;
