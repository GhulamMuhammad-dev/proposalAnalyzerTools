"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import WhyNotWinningSection from "./WhyNotWinningSection";
import SolutionSection from "./SolutionSection";
import FeatureHighlight from "./FeaturesHighlight";

const LandingPage = () => {
  return (
    <>
      {/* Hero Section */}

      <section className="relative w-full h-screen flex items-center  justify-center  overflow-hidden bg-[url('/images/heroPattrenBG.png')] bg-cover bg-center">
        {/* Background Image */}
      

        {/* Content */}
        <div className="  md:p-16 p-4 sm:w-[90%] relative flex flex-col  justify-center items-center md:items-start  gap-4  ">
          {/* Badge */}
          <Badge
            variant="outline"
            className="bg-primary-color/10 text-primary-color border-primary-color md:text-sm  md:px-4 py-1 sm:block hidden"
          >
            No Spam. No Credit Card Required. Instant Access To The Beta.
          </Badge>
          <div>
            {/* Main Heading */}

            <h1 className="text-4xl md:text-6xl font-bold md:leading-16 text-center md:text-left ">
              Win More Upwork Projects <br /> With{" "}
              <span className="text-primary-color">AI-Perfected</span> Proposals
            </h1>

            {/* Subheading */}
            <p className="text-sm md:text-lg text-light-color/70 max-w-2xl text-center md:text-left">
              Stop Losing Jobs To Average Proposals. Our AI Instantly Scores,
              Analyzes, And Improves Your Upwork Proposals So You Stand Out,
              Impress Clients, And Win More Work.
            </p>
          </div>

          {/* CTA Button */}
          <Button
            size="lg"
            className="bg-primary-color text-dark-color hover:bg-primary-color/60 font-semibold rounded-md cursor-pointer"
          >
            Join The Beta
          </Button>
        </div>
      </section>
      <WhyNotWinningSection />
      <SolutionSection />
      <FeatureHighlight />
      
    </>
  );
};

export default LandingPage;
