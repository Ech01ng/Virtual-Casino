/*
- Component: Footer
- Purpose: Displays the footer section of the website
- Features: About section, contact information, and copyright notice
- Layout: Responsive grid layout with multiple sections
*/

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black/50 backdrop-blur-sm border-t border-gray-700 mt-auto">
      <div className="container mx-auto px-4 py-6">
        {/* Main Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-yellow-500 text-lg font-semibold mb-4">About The Echoing Retreat</h3>
            <p className="text-gray-300">
              Experience the thrill of casino games from the comfort of your home. 
              Play classic games like Blackjack and Slot Machine with virtual chips.
            </p>
          </div>

          {/* Quick Links Section (Currently Commented Out) */}
          {/* About Section */}
          <div>
            <h3 className="text-yellow-500 text-lg font-semibold mb-4">Gambling Safety</h3>
            <p className="text-gray-300">
              Play responsibly and enjoy the thrill of the game.
            </p>
          </div>

          {/* Contact Information Section */}
          <div>
            <h3 className="text-yellow-500 text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Email: support@echoingretreat.com</li>
              <li>Hours: 24/7</li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 pt-6 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Echoing Retreat. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 