import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const HeroSection = () => {
  return (
    // bg-[url('/images/heroPattrenBG.png')] bg-cover bg-center
    <section className="relative w-full h-screen flex items-center justify-center  overflow-hidden  ">
      {/* Background Image */}
       {/* <div className='w-[100%] h-[40%] bg-primary-color absolute bottom-0 left-0 blur-3xl '></div>
      <div className='w-[100%] h-[20%] bg-primary-color/45 absolute bottom-0 left-0 blur-2xl '></div>
      <div className='w-[100%] h-[10%] bg-amber-100 absolute -bottom-6 left-0 blur-2xl mix-blend-plus-lighter '></div>
       <div className='w-[100%] h-[100%] bg-linear-to-t from-white/10 to-white/0 absolute top-0 left-0 backdrop-blur-2xl  '></div> */}
       <div className="w-full h-full bg-linear-to-t from-dark-color to-dark-color/80 absolute top-0 left-0"></div>

      {/* Content */}
      <div className=" hero_content_container    ">
        {/* Badge */}
        <Badge
          variant="outline"
          className="bg-primary-color/10 text-primary-color border-primary-color md:text-sm  md:px-4 py-1 sm:block hidden"
        >
          No Spam. No Credit Card Required. Instant Access To The Beta.
        </Badge>
        <div className=" hero_headSub">
          {/* Main Heading */}

          <h1 className=" h1_heading_md">
            Win More Upwork Projects <br /> With{" "}
            <span className="text-primary-color">AI-Perfected</span> Proposals
          </h1>

          {/* Subheading */}
          <p className="text-lg text-center text-light-color/50">
            Stop losing jobs to average proposals. Our AI instantly scores,
            analyzes, and improves your upwork proposals so you stand out,
            impress clients, and win more work.
          </p>
        </div>

        {/* CTA Button */}
        <Button
          size="lg"
          className="bg-primary-color text-dark-color hover:border-light-color hover:border font-semibold rounded-full cursor-pointer"
        >
          Join The Beta
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
