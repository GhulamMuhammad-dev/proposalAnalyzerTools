"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full   fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Left Side - Logo + Links */}
        <div className="flex items-center space-x-8">
          {/* Logo */}
          <div className="text-2xl font-bold text-dark-color/70 cursor-pointer">
            MyLogo
          </div>

          {/* Links (hidden on mobile) */}
          <div className="hidden md:flex space-x-6">
            <a href="#" className="text-dark-color hover:text-light-color">
              Home
            </a>
            <a href="#" className="text-dark-color hover:text-light-color">
              Services
            </a>
            <a href="#" className="text-dark-color hover:text-light-color">
              About
            </a>
            <a href="#" className="text-dark-color hover:text-light-color">
              Contact
            </a>
          </div>
        </div>

        {/* Right Side - Buttons */}
        <div className="hidden md:flex space-x-4">
         
          <button className="px-4 py-2 bg-dark-color text-light-color rounded-lg hover:bg-dark-color/80">
            Sign Up
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg px-6 py-4 space-y-4">
          <a href="#" className="block text-gray-700 hover:text-blue-600">
            Home
          </a>
          <a href="#" className="block text-gray-700 hover:text-blue-600">
            Services
          </a>
          <a href="#" className="block text-gray-700 hover:text-blue-600">
            About
          </a>
          <a href="#" className="block text-gray-700 hover:text-blue-600">
            Contact
          </a>
          <div className="flex flex-col space-y-3 pt-4 border-t">
            <button className="px-4 py-2 text-gray-700 border rounded-lg hover:bg-gray-100">
              Login
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Sign Up
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
