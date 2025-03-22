"use client";

import GameCardList from "../UI/GameCardList";

/**
 * Games Overview Page
 * Displays all available casino games categorized by type.
 * This serves as the main games directory for the casino.
 */

export default function GamesPage() {
  // Define all available casino games
  const games = [
    { id: 'slots', name: 'Slots' },
    { id: 'blackjack', name: 'Blackjack' },
    { id: 'roulette', name: 'Roulette' },
    { id: 'poker', name: 'Poker' },
    { id: 'baccarat', name: 'Baccarat' },
    { id: 'craps', name: 'Craps' }
  ];

  /**
   * Handles the selection of a game category
   * @param {string} gameId - The ID of the selected game category
   */
  const handleGameSelect = (gameId: string) => {
    // Navigate to the specific game category page
    window.location.href = `/games/${gameId}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Header Section */}
      <header className="bg-black/50 backdrop-blur-sm border-b border-gray-700">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Casino Logo/Title */}
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-yellow-500">Virtual Casino</h1>
          </div>
          {/* Navigation Menu */}
          <nav className="flex gap-6">
            <a href="/" className="hover:text-yellow-500 transition-colors">Home</a>
            <a href="/games" className="text-yellow-500">Games</a>
            <a href="/promotions" className="hover:text-yellow-500 transition-colors">Promotions</a>
            <a href="/vip" className="hover:text-yellow-500 transition-colors">VIP</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Page Title */}
        <h1 className="text-4xl font-bold mb-8">All Games</h1>
        
        {/* Games Grid */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Featured Games</h2>
          <GameCardList games={games} onGameSelect={handleGameSelect} />
        </section>

        {/* Game Categories */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Game Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game) => (
              <div 
                key={game.id}
                className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors cursor-pointer"
                onClick={() => handleGameSelect(game.id)}
              >
                <h3 className="text-xl font-bold mb-2">{game.name}</h3>
                <p className="text-gray-400">
                  Explore our collection of {game.name.toLowerCase()} games
                </p>
              </div>
            ))}
          </div>
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