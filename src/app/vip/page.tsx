"use client";

import React from 'react';
import NavBar from '../UI/NavBar';
import Footer from '../UI/Footer';

/**
 * VIP Page Component
 * Displays VIP program information and benefits.
 */

export default function VIPPage() {
  // Define VIP levels and their benefits
  const vipLevels = [
    {
      level: 'Bronze',
      requirements: 'Deposit $1,000',
      benefits: [
        '5% weekly cashback',
        'Exclusive promotions',
        'Priority support',
        'Birthday bonus'
      ]
    },
    {
      level: 'Silver',
      requirements: 'Deposit $5,000',
      benefits: [
        '10% weekly cashback',
        'Exclusive promotions',
        'Priority support',
        'Birthday bonus',
        'Personal account manager',
        'Higher withdrawal limits'
      ]
    },
    {
      level: 'Gold',
      requirements: 'Deposit $20,000',
      benefits: [
        '15% weekly cashback',
        'Exclusive promotions',
        'Priority support',
        'Birthday bonus',
        'Personal account manager',
        'Higher withdrawal limits',
        'VIP events access',
        'Luxury gifts'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <NavBar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">VIP Program</h1>
        
        {/* VIP Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Bronze Tier */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-yellow-500 mb-4">Bronze</h2>
            <ul className="space-y-2 text-gray-300 mb-6">
              <li>• 5% Daily Bonus</li>
              <li>• Exclusive Chat Access</li>
              <li>• Basic Support Priority</li>
            </ul>
            <button className="w-full bg-yellow-500 text-gray-900 px-6 py-2 rounded-lg font-bold hover:bg-yellow-400 transition-colors">
              Join Bronze
            </button>
          </div>

          {/* Silver Tier */}
          <div className="bg-gray-800 rounded-lg p-6 border-2 border-yellow-500">
            <h2 className="text-2xl font-bold text-yellow-500 mb-4">Silver</h2>
            <ul className="space-y-2 text-gray-300 mb-6">
              <li>• 10% Daily Bonus</li>
              <li>• VIP Chat Access</li>
              <li>• Priority Support</li>
              <li>• Exclusive Events</li>
            </ul>
            <button className="w-full bg-yellow-500 text-gray-900 px-6 py-2 rounded-lg font-bold hover:bg-yellow-400 transition-colors">
              Join Silver
            </button>
          </div>

          {/* Gold Tier */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-yellow-500 mb-4">Gold</h2>
            <ul className="space-y-2 text-gray-300 mb-6">
              <li>• 15% Daily Bonus</li>
              <li>• VIP Chat Access</li>
              <li>• 24/7 Priority Support</li>
              <li>• Exclusive Events</li>
              <li>• Personal VIP Host</li>
            </ul>
            <button className="w-full bg-yellow-500 text-gray-900 px-6 py-2 rounded-lg font-bold hover:bg-yellow-400 transition-colors">
              Join Gold
            </button>
          </div>
        </div>

        {/* Benefits Section */}
        <section className="bg-gray-800 rounded-lg p-6 mb-12">
          <h2 className="text-2xl font-bold text-yellow-500 mb-4">VIP Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold mb-2">Exclusive Rewards</h3>
              <p className="text-gray-300">
                Get access to special promotions, higher bonuses, and exclusive events.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Priority Support</h3>
              <p className="text-gray-300">
                Receive faster response times and dedicated support channels.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Special Events</h3>
              <p className="text-gray-300">
                Participate in VIP-only tournaments and special gaming events.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Personal Host</h3>
              <p className="text-gray-300">
                Get a dedicated VIP host to assist with all your gaming needs.
              </p>
            </div>
          </div>
        </section>

        {/* How to Join */}
        <section className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-yellow-500 mb-4">How to Join</h2>
          <div className="space-y-4 text-gray-300">
            <p>1. Start playing your favorite games</p>
            <p>2. Earn points through regular gameplay</p>
            <p>3. Reach the required points threshold</p>
            <p>4. Get automatically upgraded to the next tier</p>
            <p className="mt-4">
              <span className="font-bold">Note:</span> Points are earned based on your wagering activity.
              The more you play, the faster you'll climb the VIP ladder!
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
} 