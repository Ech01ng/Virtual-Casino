"use client";

import { useState } from 'react';
import SlotMachine from './UI/SlotMachine';
import NavBar from '../../UI/NavBar';

/**
 * Slots Game Page
 * Displays the slot machine interface with game information and controls.
 */

export default function SlotsPage() {
  // Define the slot game details
  const gameData = {
    name: 'Classic Slots',
    description: 'Traditional 3-reel slot machine with classic symbols and exciting payouts',
    rtp: 96.5,
    volatility: 'Low' as const,
    payouts: [
      { symbol: '7️⃣', amount: '100x', description: 'Three 7s' },
      { symbol: '🍒', amount: '50x', description: 'Three cherries' },
      { symbol: '🍋', amount: '25x', description: 'Three lemons' },
      { symbol: '🍊', amount: '15x', description: 'Three oranges' },
      { symbol: '💎', amount: '10x', description: 'Three diamonds' }
    ]
  };

  // Game state
  const [balance, setBalance] = useState(1000);
  const [bet, setBet] = useState(1);
  const [lastWin, setLastWin] = useState(0);
  
  // Mobile menu state
  const [mobileView, setMobileView] = useState<'game' | 'info' | 'payouts'>('game');

  /**
   * Calculates the win amount based on the spin result
   */
  const calculateWin = (result: string[]) => {
    // Check for three of a kind
    if (result[0] === result[1] && result[1] === result[2]) {
      const payout = gameData.payouts.find(p => p.symbol === result[0]);
      if (payout) {
        const multiplier = parseInt(payout.amount);
        return bet * multiplier;
      }
    }
    return 0;
  };

  /**
   * Handles the spin result
   */
  const handleSpin = (result: string[]) => {
    // Deduct bet from balance
    setBalance(prev => prev - bet);
    
    // Calculate and add winnings
    const winAmount = calculateWin(result);
    if (winAmount > 0) {
      setBalance(prev => prev + winAmount);
      setLastWin(winAmount);
    } else {
      setLastWin(0);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Navigation Bar */}
      <NavBar />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Game Title */}
        <h1 className="text-4xl font-bold mb-8 text-center">{gameData.name}</h1>

        {/* Mobile Menu Button */}
        <div className="md:hidden mb-6">
          <button
            onClick={() => setMobileView(mobileView === 'game' ? 'info' : 'game')}
            className="w-full bg-gray-800 py-3 rounded-lg font-bold hover:bg-gray-700 transition-colors"
          >
            {mobileView === 'game' ? 'Show Info' : 'Back to Game'}
          </button>
        </div>

        {/* Game Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left Panel - Game Information */}
          <div className={`md:col-span-3 bg-gray-800 rounded-lg p-6 ${
            mobileView === 'info' ? 'block' : 'hidden md:block'
          }`}>
            <h2 className="text-2xl font-bold mb-6">Game Information</h2>
            
            {/* RTP and Volatility */}
            <div className="mb-8">
              <div className="mb-4">
                <h3 className="text-lg font-bold mb-2">RTP</h3>
                <p className="text-gray-300">{gameData.rtp}%</p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">Volatility</h3>
                <p className="text-gray-300">{gameData.volatility}</p>
              </div>
            </div>

            {/* How to Play */}
            <div>
              <h3 className="text-lg font-bold mb-4">How to Play</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-300">
                <li>Set your bet amount</li>
                <li>Click the Spin button</li>
                <li>Match 3 or more symbols</li>
                <li>Win based on paytable</li>
              </ol>
            </div>
          </div>

          {/* Center Panel - Game Interface */}
          <div className={`col-span-1 md:col-span-6 ${
            mobileView === 'game' ? 'block' : 'hidden md:block'
          }`}>
            {/* Slot Machine Display */}
            <div className="bg-gray-800 rounded-lg p-8 mb-6">
              <SlotMachine onSpin={handleSpin} />
              
              {/* Game Controls */}
              <div className="flex flex-col gap-4 mt-6">
                <div className="flex justify-between items-center">
                  <div className="text-lg">Balance: ${balance}</div>
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setBet(prev => Math.max(1, prev - 1))}
                      className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600"
                    >
                      -
                    </button>
                    <div className="text-lg">Bet: ${bet}</div>
                    <button 
                      onClick={() => setBet(prev => Math.min(balance, prev + 1))}
                      className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600"
                    >
                      +
                    </button>
                  </div>
                </div>
                {lastWin > 0 && (
                  <div className="text-center text-yellow-500 text-xl font-bold">
                    You won ${lastWin}!
                  </div>
                )}
              </div>
            </div>

            {/* Game Description */}
            <div className="bg-gray-800 rounded-lg p-6">
              <p className="text-gray-300">{gameData.description}</p>
            </div>
          </div>

          {/* Right Panel - Payouts */}
          <div className={`md:col-span-3 bg-gray-800 rounded-lg p-6 ${
            mobileView === 'info' ? 'block' : 'hidden md:block'
          }`}>
            <h2 className="text-2xl font-bold mb-6">Payouts</h2>
            <div className="space-y-4">
              {gameData.payouts.map((payout, index) => (
                <div key={index} className="flex items-center justify-between border-b border-gray-700 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{payout.symbol}</span>
                    <span className="text-gray-300">{payout.description}</span>
                  </div>
                  <span className="text-yellow-500 font-bold">{payout.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
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