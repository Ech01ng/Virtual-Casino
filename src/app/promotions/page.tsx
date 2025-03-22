"use client";

import NavBar from '../UI/NavBar';

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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Navigation Bar */}
      <NavBar />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <h1 className="text-4xl font-bold mb-8 text-center">Current Promotions</h1>

        {/* Promotions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {promotions.map((promo) => (
            <div key={promo.id} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
              <h2 className="text-2xl font-bold mb-4 text-yellow-500">{promo.title}</h2>
              <p className="text-gray-300 mb-4">{promo.description}</p>
              <div className="border-t border-gray-700 pt-4">
                <p className="text-sm text-gray-400 mb-2">{promo.terms}</p>
                <p className="text-sm text-gray-400">Valid until: {promo.validUntil}</p>
              </div>
              <button className="mt-4 w-full bg-yellow-500 text-black py-2 rounded-lg font-bold hover:bg-yellow-400 transition-colors">
                Claim Offer
              </button>
            </div>
          ))}
        </div>

        {/* Terms and Conditions */}
        <section className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Terms and Conditions</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>All promotions are subject to our general terms and conditions</li>
            <li>Wagering requirements must be met before withdrawals</li>
            <li>Only one promotion can be active at a time</li>
            <li>We reserve the right to modify or cancel promotions at any time</li>
          </ul>
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