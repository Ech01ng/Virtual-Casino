"use client";

import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';

/**
 * Promotions Page Component
 * Displays current casino promotions and special offers.
 */

export default function PromotionsPage() {
  // Define available promotions
  const promotions = [
    {
      id: 'welcome-bonus',
      title: 'Welcome Bonus',
      description: 'Get 100% match on your first deposit up to $500',
      terms: 'Minimum deposit $20. Wagering requirements apply.',
      validUntil: 'December 31, 2024'
    },
    {
      id: 'weekly-reload',
      title: 'Weekly Reload Bonus',
      description: '50% match on deposits every Monday',
      terms: 'Minimum deposit $50. Wagering requirements apply.',
      validUntil: 'Ongoing'
    },
    {
      id: 'vip-exclusive',
      title: 'VIP Exclusive Offer',
      description: '200% match on deposits for VIP members',
      terms: 'VIP members only. Minimum deposit $100.',
      validUntil: 'December 31, 2024'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <NavBar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Promotions</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Welcome Bonus */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-yellow-500 mb-4">Welcome Bonus</h2>
            <p className="text-gray-300 mb-4">
              Get 1000 free chips when you first join Virtual Casino!
            </p>
            <button className="bg-yellow-500 text-gray-900 px-6 py-2 rounded-lg font-bold hover:bg-yellow-400 transition-colors">
              Claim Bonus
            </button>
          </div>

          {/* Daily Rewards */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-yellow-500 mb-4">Daily Rewards</h2>
            <p className="text-gray-300 mb-4">
              Log in every day to receive free chips and special rewards.
            </p>
            <button className="bg-yellow-500 text-gray-900 px-6 py-2 rounded-lg font-bold hover:bg-yellow-400 transition-colors">
              View Rewards
            </button>
          </div>

          {/* VIP Program */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-yellow-500 mb-4">VIP Program</h2>
            <p className="text-gray-300 mb-4">
              Join our VIP program for exclusive rewards and special treatment.
            </p>
            <button className="bg-yellow-500 text-gray-900 px-6 py-2 rounded-lg font-bold hover:bg-yellow-400 transition-colors">
              Learn More
            </button>
          </div>

          {/* Special Events */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-yellow-500 mb-4">Special Events</h2>
            <p className="text-gray-300 mb-4">
              Participate in special events and tournaments for a chance to win big!
            </p>
            <button className="bg-yellow-500 text-gray-900 px-6 py-2 rounded-lg font-bold hover:bg-yellow-400 transition-colors">
              View Events
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 