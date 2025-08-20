"use client";
import SolutionSection from "./SolutionSection";
import FeatureHighlight from "./FeaturesHighlight";
import HowItWorks from "../HowItWork";
import ClosingSection from "./ClosingSection";
import BetaInvitationSection from "./BetaInvitationSection";
import SocialProofSection from "./SocialProofSection";
import ProblemSection from "./ProblemSection";
import HeroSection from "../HeroSection";

const LandingPage = () => {
  return (
    <>
      <HeroSection />
      <ProblemSection />
      {/* <SolutionSection /> */}
      <FeatureHighlight />
      <BetaInvitationSection />
      <HowItWorks />
      <SocialProofSection />
      <ClosingSection />
      
    </>
  );
};

export default LandingPage;
