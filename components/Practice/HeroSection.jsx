import React from "react";


const HeroSection = () => {
  return (
    <>
   <section className=" section_area  ">
    <div className=" flex flex-col items-center justify-center text-white gap-4 relative md:gap-6 md:items-start ">
       <h1 className="hero_Header ">Win More Upwork Clients With Smarter Proposals</h1>
       <h4 className=" text-lg max-w-4/5 text-center md:text-start">Stop guessing what clients want. Our AI Proposal Analyzer reviews your proposal like a top-tier client would then gives you a score, actionable feedback, and an optimized version ready to send.</h4>
       <button className="p-4 bg-[#7EF187]  rounded-lg text-black font-medium cursor-pointer hover:bg-black hover:border hover:border-[#7EF187] hover:text-white">Analyze Now</button>
    </div>
   </section>
   </>
  );
};

export default HeroSection;
