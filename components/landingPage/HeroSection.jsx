import React from "react";
import Link from "next/link";


const HeroSection = () => {
  return (
    <>
   <section className=" section-class">
    <div className=" section-container">
      <div className="hero-content">
       <h1 className=" hero-heading ">Win More Upwork Clients With Smarter Proposals</h1>
       <p className="hero-subheading">Stop guessing what clients want. Our AI Proposal Analyzer reviews your proposal like a top-tier client would then gives you a score, actionable feedback, and an optimized version ready to send.</p>
        <Link href={"/analyze"}><button className="primary-button primary-gradient">Analyze Now</button></Link>
       </div>
    </div>
   </section>
   </>
  );
};

export default HeroSection;
