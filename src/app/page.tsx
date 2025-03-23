/*
 - Home Page Component
 - The main landing page of the Virtual Casino application.
 - This component serves as the entry point for users and displays
 - the casino's main features and available games.
*/

"use client";

import { useState } from 'react';
import GameCardList from "./UI/GameCardList";
import NavBar from './UI/NavBar';

/*
 - Home Component
 - A client-side component that renders the main casino interface.
*/
export default function Home() {
  // Define available casino games
  // Each game has a unique ID and display name
  // The image is the path to the image file for the game
  const games = [
    {
      id: 'slots',
      name: 'Slots',
      image: '/slot.jpg'
    },
    {
      id: 'blackjack',
      name: 'Blackjack',
      image: '/images/blackjack-preview.jpg'
    },
    {
      id: 'roulette',
      name: 'Roulette',
      image: '/images/roulette-preview.jpg'
    },
    {
      id: 'poker',
      name: 'Poker',
      image: '/images/poker-preview.jpg'
    },
    {
      id: 'baccarat',
      name: 'Baccarat',
      image: '/images/baccarat-preview.jpg'
    },
    {
      id: 'craps',
      name: 'Craps',
      image: '/images/craps-preview.jpg'
    }
  ];

  /*
   - Handles the selection of a game
   - @param {string} gameId - The ID of the selected game
  */
  const handleGameSelect = (gameId: string) => {
    // Navigate to the selected game
    window.location.href = `/games/${gameId}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Navigation Bar */}
      <NavBar />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">Welcome to Virtual Casino</h1>
          <p className="text-xl text-gray-300 mb-8">
            Experience the thrill of casino gaming from the comfort of your home
          </p>
          <a
            href="/vip"
            className="bg-yellow-500 text-black px-8 py-3 rounded-lg font-bold hover:bg-yellow-400 transition-colors"
          >
            Join VIP Club
          </a>
        </section>

        {/* Featured Games Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Games</h2>
          <GameCardList games={games} onGameSelect={handleGameSelect} />
        </section>

        {/* Features Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">24/7 Support</h3>
            <p className="text-gray-300">Our dedicated support team is always here to help you.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Secure Gaming</h3>
            <p className="text-gray-300">Play with confidence using our secure payment system.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">VIP Rewards</h3>
            <p className="text-gray-300">Exclusive benefits and rewards for our VIP members.</p>
          </div>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="bg-black/50 border-t border-gray-700">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-bold mb-4">About Us</h4>
              <p className="text-gray-400">Virtual Casino provides a safe and entertaining gaming experience for players worldwide.</p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-yellow-500">Terms & Conditions</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-500">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-500">Responsible Gaming</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Contact Us</h4>
              <p className="text-gray-400">Email: support@virtualcasino.com</p>
              <p className="text-gray-400">24/7 Support Available</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; 2024 Virtual Casino. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
