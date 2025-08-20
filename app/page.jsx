

import CustomGrid from "@/components/Practice/CustomGrid";
import Grid from "@/components/Practice/Grid";
import GridEditor from "@/components/Practice/GridEditor";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWork";
import LandingPage from "@/components/LandingPage";
import Freelancer from "@/components/Freelancer";
import BeforeAfter from "@/components/BeforeAfter";
import Testimonials from "@/components/Testimonials";


export default function Home() {
  return (
    <>
     <HeroSection />
     <HowItWorks />
     <Freelancer />
     <BeforeAfter />
     <Testimonials />
     
     {/* <Grid /> */}
     {/* <CustomGrid /> */}
     {/* <GridEditor /> */}
     {/* <LandingPage /> */}
    </>
  );
}
