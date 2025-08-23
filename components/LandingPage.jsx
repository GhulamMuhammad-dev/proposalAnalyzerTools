import React from 'react'
import Freelancer from "@/components/landingPage/Freelancer";
import BeforeAfter from "@/components/landingPage/BeforeAfter";
import Testimonials from "@/components/landingPage/Testimonials";
import WithoutVsWith from "./landingPage/WithoutVsWith";
import PricingCTA from "@/components/landingPage/PricingCTA";
import FAQs from "@/components/landingPage/FAQ";
import FinalCTA from "@/components/landingPage/FinalCTA";
import HeroSection from "@/components/landingPage/HeroSection";
import HowItWorks from "@/components/landingPage/HowItWork";

const LandingPage = () => {
  return (
    <>
     <HeroSection />
     <HowItWorks />
     <Freelancer />
     <BeforeAfter />
     <Testimonials />
     <WithoutVsWith />
     <PricingCTA />
     <FAQs />
     <FinalCTA />
    </>
  )
}

export default LandingPage
