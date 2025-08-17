import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Practice/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'ProposalPro | AI-Powered Proposal Analyzer',
  description: 'Analyze and improve freelancing proposals using AI',
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body
  
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        
      >
    
        {children}
      </body>
    </html>
  );
}
