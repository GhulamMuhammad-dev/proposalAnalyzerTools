'use client';
import { useState } from 'react';
import LandingPage from '../components/LandingPage';
import ProposalAnalyzer from '../components/ProposalAnalyzer';

export default function Home() {
  const [showApp, setShowApp] = useState(false);

  return showApp ? <ProposalAnalyzer goBack={() => setShowApp(false)} /> : <LandingPage onStart={() => setShowApp(true)} />;
}

