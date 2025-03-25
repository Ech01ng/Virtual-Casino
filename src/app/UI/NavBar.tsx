/*
- Component: NavBar
- Purpose: Provides main navigation for the casino website
- Features: Responsive design with mobile menu, animated transitions
- Layout: Desktop and mobile-friendly navigation with hamburger menu
*/

"use client";

import { useState } from 'react';
import Link from 'next/link';

/**
 * Navigation Bar Component
 * Displays the main navigation menu with responsive design.
 * Shows a hamburger menu on mobile devices.
 */

export default function NavBar() {
  /*
  - State Management:
  - isMenuOpen: Controls the visibility of the mobile menu
  */
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-black/50 backdrop-blur-sm border-b border-gray-700">
      <div className="container mx-auto px-4 py-4">
        {/* Main Navigation Container */}
        <div className="flex justify-between items-center">
          {/* Casino Logo/Title Section */}
          <div className="flex items-center gap-2">
            <Link href="/" className="text-2xl font-bold text-yellow-500">
              The Echoing Retreat
            </Link>
          </div>

          {/* Desktop Navigation Menu */}
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="hover:text-yellow-500 transition-colors">
              Home
            </Link>
            <Link href="/promotions" className="hover:text-yellow-500 transition-colors">
              Promotions
            </Link>
            <Link href="/login" className="hover:text-yellow-500 transition-colors">
              Login / Register
            </Link>
          </nav>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-700 transition-colors"
            aria-label="Toggle menu"
          >
            {/* Animated Hamburger Icon */}
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`block w-full h-0.5 bg-white transition-transform duration-300 ${
                isMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`} />
              <span className={`block w-full h-0.5 bg-white transition-opacity duration-300 ${
                isMenuOpen ? 'opacity-0' : ''
              }`} />
              <span className={`block w-full h-0.5 bg-white transition-transform duration-300 ${
                isMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`} />
            </div>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${
          isMenuOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <nav className="py-4 flex flex-col gap-4">
            <Link 
              href="/" 
              className="hover:text-yellow-500 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/promotions" 
              className="hover:text-yellow-500 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Promotions
            </Link>
            <Link 
              href="/login" 
              className="hover:text-yellow-500 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Login / Register
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
} 