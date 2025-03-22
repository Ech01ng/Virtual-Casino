"use client";

import NavBar from '../UI/NavBar';

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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Navigation Bar */}
      <NavBar />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">VIP Program</h1>
          <p className="text-xl text-gray-300 mb-8">
            Join our exclusive VIP program and unlock premium benefits
          </p>
          <button className="bg-yellow-500 text-black px-8 py-3 rounded-lg font-bold hover:bg-yellow-400 transition-colors">
            Join VIP Club
          </button>
        </section>

        {/* VIP Levels */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">VIP Levels</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {vipLevels.map((level) => (
              <div key={level.level} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
                <h3 className="text-2xl font-bold mb-4 text-yellow-500">{level.level}</h3>
                <p className="text-gray-300 mb-6">{level.requirements}</p>
                <ul className="space-y-3">
                  {level.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-300">
                      <span className="text-yellow-500">✓</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Additional Benefits */}
        <section className="bg-gray-800 rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold mb-6">Additional VIP Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Exclusive Events</h3>
              <p className="text-gray-300">
                Access to VIP-only tournaments, special promotions, and exclusive events.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Personal Support</h3>
              <p className="text-gray-300">
                Dedicated account manager and priority support for all your needs.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Higher Limits</h3>
              <p className="text-gray-300">
                Increased deposit and withdrawal limits for VIP members.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Special Rewards</h3>
              <p className="text-gray-300">
                Exclusive bonuses, cashback offers, and luxury gifts.
              </p>
            </div>
          </div>
        </section>

        {/* How to Join */}
        <section className="bg-gray-800 rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-6">How to Join</h2>
          <ol className="list-decimal list-inside space-y-4 text-gray-300">
            <li>Create an account at Virtual Casino</li>
            <li>Make qualifying deposits to reach your desired VIP level</li>
            <li>Contact our VIP team to activate your membership</li>
            <li>Start enjoying your exclusive benefits</li>
          </ol>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="bg-black/50 border-t border-gray-700 mt-12">
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