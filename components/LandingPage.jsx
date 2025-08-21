import React from 'react'
import Freelancer from "@/components/Freelancer";
import BeforeAfter from "@/components/BeforeAfter";
import Testimonials from "@/components/Testimonials";
import WithoutVsWith from "../components/WithoutVsWith";
import PricingCTA from "@/components/PricingCTA";
import FAQs from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWork";

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
