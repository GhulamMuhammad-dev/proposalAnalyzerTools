"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Head from "next/head";
import SocialProofSection from "./Practice/SocialProofSection";
import HowItWorks from "./Practice/HowItWork";

// Reusable utility classes with dark theme and lime color
const classes = {
  sectionPadding: "py-16 md:py-24 lg:py-32",
  container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
  heading2: "text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight",
  heading3: "text-2xl md:text-3xl font-semibold",
  paragraph: "text-lg text-gray-400 max-w-3xl", // Changed for dark theme
  buttonPrimary:
    "bg-primary-color hover:bg-lime-600 text-gray-900 px-8 py-3 rounded-lg font-medium transition-colors", // Lime primary
  buttonSecondary:
    "border border-primary-color text-primary-color hover:bg-gray-800 px-8 py-3 rounded-lg font-medium transition-colors", // Lime secondary
  card: "bg-dark-color rounded-xl shadow-lg overflow-hidden p-6 border border-light-color/40", // Dark cards
  bentoCard:
    "rounded-xl overflow-hidden bg-gradient-to-b from-dark-color to-primary-color/40  border border-light-color/40 shadow-lg", // Dark bento cards
};

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const UpworkProposalAnalyzer = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Submitted email:", email);
  };

  return (
    <div className="bg-dark-color text-light-color">
      <Head>
        <title>Upwork Proposal Analyzer | Win More Projects with AI</title>
        <meta
          name="description"
          content="AI-powered tool to analyze and improve your Upwork proposals to win more clients"
        />
      </Head>

      {/* Hero Section */}
      <section
        className={`${classes.sectionPadding} bg-gradient-to-br from-dark-color to-dark-color`}
      >
        <div className={classes.container}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col items-center text-center"
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="inline-block bg-primary-color/30 text-primary-color px-3 py-1 rounded-full text-sm font-medium">
                Beta Now Open
              </span>
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              className={`${classes.heading2} mb-6`}
            >
              Win More Upwork Projects with{" "}
              <span className="text-primary-color">AI-Perfected</span> Proposals
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className={`${classes.paragraph} mb-8`}
            >
              Stop losing jobs to average proposals. Our AI instantly scores,
              analyzes, and improves your Upwork proposals — so you stand out,
              impress clients, and win more work.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 mb-6"
            >
              <a href="#beta" className={classes.buttonPrimary}>
                Join the Beta – It's Free
              </a>
              <a href="#how-it-works" className={classes.buttonSecondary}>
                How It Works
              </a>
            </motion.div>
            <motion.p variants={fadeInUp} className="text-sm text-light-color">
              No spam. No credit card required. Instant access to the beta.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section
        id="problem"
        className={`${classes.sectionPadding} bg-dark-color relative overflow-hidden`}
      >
        {/* Decorative elements */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary-color rounded-full mix-blend-overlay opacity-10"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-color rounded-full mix-blend-overlay opacity-10"></div>

        <div className={classes.container}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <h2 className={`${classes.heading2} mb-6`}>
                <span className="relative inline-block">
                  <span className="relative z-10">Why You're Not Winning</span>
                  <span className="absolute bottom-0 left-0 w-full h-3 bg-primary-color/40 -z-0"></span>
                </span>
                <br />
                Enough Upwork Jobs
              </h2>
              <p className={`${classes.paragraph} mx-auto`}>
                Freelancers lose projects every day because:
              </p>
            </motion.div>

            {/* Enhanced Bento Grid Layout */}
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10"
            >
              {[
                {
                  text: "Their proposals sound like everyone else's.",
                  icon: "📝",
                },
                {
                  text: "Typos, weak openings, and unclear value kill credibility.",
                  icon: "🔍",
                },
                {
                  text: "They don't match the client's tone and priorities.",
                  icon: "🎯",
                },
                {
                  text: "Clients skip them before reading halfway.",
                  icon: "⏱️",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{
                    y: -8,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)",
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`${classes.bentoCard} p-8 flex flex-col relative overflow-hidden group`}
                >
                  {/* Hover effect background */}
                  <div className="absolute inset-0 bg-gradient-to-b from-dark-color to-primary-color/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Number badge with glow effect */}
                  <div className="w-14 h-14  bg-primary-color rounded-xl flex items-center justify-center mb-6 relative">
                    <span className="text-2xl ">{item.icon}</span>
                    <span className="absolute -bottom-2 -right-2 w-6 h-6 bg-primary-color rounded-full flex items-center justify-center text-xs font-bold text-gray-900">
                      {index + 1}
                    </span>
                  </div>

                  <p className="text-gray-300 text-lg relative z-10 leading-relaxed">
                    {item.text}
                  </p>

                  {/* Hover arrow indicator */}
                  <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 relative z-10">
                    <svg
                      className="w-6 h-6 text-primary-color animate-pulse"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 5l7 7-7 7M5 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="text-center mt-16 relative z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="inline-flex items-center  border border-light-color/40 rounded-full px-6 py-3">
                <svg
                  className="w-5 h-5 text-primary-color mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p
                  className={`${classes.paragraph} font-medium text-primary-color`}
                >
                  You work hard. You deserve better than being ignored.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Solution Section */}
      <section className={`${classes.sectionPadding} relative overflow-hidden bg-dark-800`}>
 


  <div className={classes.container}>
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 relative z-10"
    >
      {/* Left Content */}
      <motion.div 
        variants={fadeInUp} 
        className="lg:w-1/2"
        whileHover={{ 
          x: 5,
          transition: { type: "spring", stiffness: 300 }
        }}
      >
        <div className="relative">
       
          <h2 className={`${classes.heading2} mb-6 relative text-light-color`}>
            Meet Your <span className="text-primary-color relative">
              AI Proposal Coach
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-primary-color"></span>
            </span>
          </h2>
        </div>
        
        <p className={`${classes.paragraph} mb-6 text-light-color`}>
          Our AI Upwork Proposal Analyzer reviews your proposal like a top-tier client would.
        </p>
        
        <p className="text-lg mb-8 font-medium text-primary-color">
          In seconds, it gives you:
        </p>
        
        <ul className="space-y-4 mb-8">
          {[
            "A Proposal Score — see exactly how competitive your proposal is.",
            "Actionable Feedback — fix weak points before the client ever sees them.",
            "An AI-Enhanced Version — a polished, persuasive proposal that still sounds like you."
          ].map((item, index) => (
            <motion.li 
              key={index}
              variants={fadeInUp}
              className="flex items-start group"
              whileHover={{ x: 5 }}
            >
              <span className="flex-shrink-0 bg-dark-color text-primary-color rounded-full p-2 mr-4 group-hover:bg-primary-color group-hover:text-dark-color transition-colors duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span className="text-light-color group-hover:text-light-color/50 transition-colors duration-300">{item}</span>
            </motion.li>
          ))}
        </ul>
        
        <motion.p 
          variants={fadeInUp} 
          className="text-xl font-medium text-light-100 mb-8 flex items-center"
        >
          <span className="mr-2">Stop guessing.</span>
          <span className="text-primary-color flex items-center">
            Start winning
            <svg className="w-5 h-5 ml-1 animate-bounce-horizontal" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </span>
        </motion.p>
        
        <motion.div 
          variants={fadeInUp}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <a href="#beta" className={`${classes.buttonPrimary} flex items-center justify-center gap-2  transition-all`}>
            Try It Free
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </motion.div>
      </motion.div>

      {/* Right Content - Demo Card */}
      <motion.div 
        variants={fadeInUp} 
        className="lg:w-1/2 w-full"
        whileHover={{
          scale: 1.02,
          transition: { type: "spring", stiffness: 300 }
        }}
      >
        <div className="relative">
       
          
          {/* Card shadow effect */}
          <div className="absolute -bottom-4 -right-4 w-full h-full bg-primary-color/10 rounded-2xl -z-10"></div>
          
          {/* Main card */}
          <div className="bg-dark-color rounded-2xl shadow-2xl overflow-hidden border border-light-color/20 relative z-10">
            {/* Card header */}
            <div className="bg-dark-800 p-4 flex items-center border-b border-dark-600">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-light-color text-sm font-mono mx-auto">proposal-analyzer.js</div>
              <div className="w-8"></div> {/* Spacer for balance */}
            </div>
            
            {/* Card content */}
            <div className="p-6">
              {/* Score section */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium text-light-color flex items-center">
                    <svg className="w-5 h-5 text-primary-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Proposal Score
                  </h3>
                  <span className="bg-dark-600 text-primary-color px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    86/100
                    <span className="ml-1 text-xs">⭐</span>
                  </span>
                </div>
                <div className="w-full bg-dark-color rounded-full h-2.5 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-primary-color/50 to-primary-color h-2.5 rounded-full relative"
                    style={{ width: '86%' }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse-slow"></div>
                  </div>
                </div>
              </div>
              
              {/* Feedback sections */}
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-light-color mb-3 flex items-center">
                    <svg className="w-5 h-5 text-primary-color mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Strengths
                  </h4>
                  <ul className="space-y-3">
                    {[
                      "Clear value proposition in opening",
                      "Good project understanding"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start pl-2">
                        <span className="flex-shrink-0 mt-1 mr-3 w-2 h-2 bg-primary-color rounded-full"></span>
                        <span className="text-light-color">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-light-color mb-3 flex items-center">
                    <svg className="w-5 h-5 text-primary-color mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Areas to Improve
                  </h4>
                  <ul className="space-y-3">
                    {[
                      "Add more specific metrics to showcase past success",
                      "Shorten paragraphs for better readability"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start pl-2">
                        <span className="flex-shrink-0 mt-1 mr-3 w-2 h-2 bg-primary-color rounded-full animate-pulse"></span>
                        <span className="text-light-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* CTA Button */}
              <button className="mt-8 w-full bg-gradient-to-b from-primary-color to-primary-color hover:from-primary-color hover:to-primary-color/60 text-dark-900 px-6 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 group hover:shadow-lg hover:shadow-primary-500/20">
                <span>Generate Improved Version</span>
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  </div>
</section>

      {/* Feature Highlights */}
      <section className="bg-gray-900 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div
              variants={fadeInUp}
              className="text-center mb-16 max-w-3xl mx-auto"
            >
              <div className="inline-flex items-center mb-4 px-4 py-2 rounded-full bg-gray-800 border border-gray-700">
                <span className="text-lime-400 text-sm font-medium">
                  Freelancer's Choice
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Why <span className="text-lime-400">Freelancers</span> Love It
              </h2>
              <p className="text-xl text-gray-300">
                Our AI-powered tools help you craft proposals that clients can't
                ignore
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {[
                {
                  title: "AI Proposal Scoring",
                  description:
                    "Get a clear score with detailed reasoning so you know exactly where your proposal stands and how to improve it.",
                  icon: (
                    <div className="p-3 rounded-xl bg-gray-800 inline-flex">
                      <svg
                        className="w-8 h-8 text-lime-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                    </div>
                  ),
                },
                {
                  title: "Smart Suggestions",
                  description:
                    "Receive specific, actionable improvements for tone, clarity, and client appeal tailored to each proposal.",
                  icon: (
                    <div className="p-3 rounded-xl bg-gray-800 inline-flex">
                      <svg
                        className="w-8 h-8 text-lime-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </div>
                  ),
                },
                {
                  title: "One-Click Upgrade",
                  description:
                    "Instantly generate a refined, professional version of your proposal with just one click.",
                  icon: (
                    <div className="p-3 rounded-xl bg-gray-800 inline-flex">
                      <svg
                        className="w-8 h-8 text-lime-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                      </svg>
                    </div>
                  ),
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -8 }}
                  className="bg-gray-800/50 hover:bg-gray-800/70 border border-gray-700 rounded-2xl p-8 flex flex-col transition-all duration-300 hover:shadow-lg hover:shadow-lime-400/10"
                >
                  <div className="mb-6">{feature.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-lg">{feature.description}</p>
                  <div className="mt-6 pt-6 border-t border-gray-700">
                    <button className="text-lime-400 font-medium flex items-center group">
                      Learn more
                      <svg
                        className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Social Proof */}
      <SocialProofSection />

      {/* How It Works */}
      <HowItWorks />

      {/* Beta Invitation */}
      <section
        id="beta"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-800 via-gray-850 to-gray-900"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center"
          >
            <motion.div variants={fadeInUp} className="mb-4">
              <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-lime-500/10 text-lime-400">
                Exclusive Beta Access
              </span>
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
            >
              Join the <span className="text-lime-400">Limited</span> Beta
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed"
            >
              We're hand-selecting a small group of freelancers to help shape
              the future of AI-powered proposals. Get early access and a
              competitive edge.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="max-w-2xl mx-auto bg-gray-800/50 backdrop-blur-sm p-1 rounded-xl border border-gray-700 shadow-lg"
            >
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-1 bg-gray-900/30 rounded-lg overflow-hidden"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your professional email"
                  required
                  className="flex-grow px-6 py-4 bg-transparent text-white focus:outline-none placeholder-gray-500"
                />
                <button
                  type="submit"
                  className="relative overflow-hidden bg-gradient-to-r from-lime-500 to-lime-600 text-gray-900 px-8 py-4 font-semibold transition-all hover:shadow-lg hover:shadow-lime-500/20"
                >
                  <span className="relative z-10">Join Beta Waitlist</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-lime-600 to-lime-700 opacity-0 hover:opacity-100 transition-opacity"></span>
                </button>
              </form>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex items-center justify-center mt-8 gap-4"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((item) => (
                  <img
                    key={item}
                    src={`https://randomuser.me/api/portraits/${
                      item % 2 === 0 ? "women" : "men"
                    }/${item + 20}.jpg`}
                    alt="Beta user"
                    className="w-10 h-10 rounded-full border-2 border-gray-800 hover:scale-110 transition-transform"
                  />
                ))}
              </div>
              <p className="text-sm text-gray-400">
                <span className="text-lime-400 font-medium">
                  127+ freelancers
                </span>{" "}
                already joined
              </p>
            </motion.div>

            <motion.p
              variants={fadeInUp}
              className="text-sm text-gray-500 mt-8 flex items-center justify-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              Your email is safe with us. No spam, ever.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Closing CTA */}
      {/* Closing CTA */}
      <section className="py-20 bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-lime-400 rounded-full mix-blend-overlay filter blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-lime-500 rounded-full mix-blend-overlay filter blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center"
          >
            <motion.div variants={fadeInUp} className="mb-4">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-lime-500/10 text-lime-400 text-sm font-medium">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
                Limited Time Offer
              </span>
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
            >
              Your Next <span className="text-lime-400">High-Paying</span>{" "}
              Client Awaits
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed"
            >
              Stop losing projects to generic proposals. Join our beta today and
              start sending proposals that stand out, get replies, and win you
              more work at better rates.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <a
                href="#beta"
                className="relative overflow-hidden bg-gradient-to-r from-lime-500 to-lime-600 text-gray-900 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-lime-500/30 transition-all"
              >
                <span className="relative z-10">Get Free Beta Access →</span>
                <span className="absolute inset-0 bg-gradient-to-r from-lime-600 to-lime-700 opacity-0 hover:opacity-100 transition-opacity"></span>
              </a>
              <a
                href="#how-it-works"
                className="border-2 border-gray-600 text-gray-200 hover:border-lime-400 hover:text-white px-8 py-4 rounded-xl font-medium text-lg transition-all"
              >
                See How It Works
              </a>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="mt-8 flex items-center justify-center gap-3"
            >
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-400 text-sm">
                Rated <span className="text-white font-medium">4.9/5</span> by
                early beta users
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div>
              <h3 className="text-lg font-bold text-white mb-4">
                Upwork Proposal Analyzer
              </h3>
              <p className="mb-4">
                AI-powered tools to help freelancers win more projects with less
                effort.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-lime-400 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-lime-400 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-lime-400 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-medium mb-4">Product</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#features"
                    className="hover:text-lime-400 transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#how-it-works"
                    className="hover:text-lime-400 transition-colors"
                  >
                    How It Works
                  </a>
                </li>
                <li>
                  <a
                    href="#beta"
                    className="hover:text-lime-400 transition-colors"
                  >
                    Beta Access
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-lime-400 transition-colors">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-medium mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-lime-400 transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-lime-400 transition-colors">
                    Guides
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-lime-400 transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-lime-400 transition-colors">
                    Webinars
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-medium mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-lime-400 transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-lime-400 transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-lime-400 transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-lime-400 transition-colors">
                    Press
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm">
                © 2025 Upwork Proposal Analyzer. All rights reserved.
              </p>
              <p className="text-xs mt-1">Not affiliated with Upwork Inc.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <a
                href="#"
                className="text-sm hover:text-lime-400 transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-sm hover:text-lime-400 transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-sm hover:text-lime-400 transition-colors"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UpworkProposalAnalyzer;
