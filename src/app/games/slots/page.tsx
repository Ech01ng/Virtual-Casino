"use client";

import React, { useState } from 'react';
import SlotMachine from './UI/SlotMachine';
import NavBar from '../../UI/NavBar';
import Footer from '../../UI/Footer';

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
  const [chips, setChips] = useState(1000);
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
  const handleSpin = (result: string[], bet: number) => {
    // If bet is provided, this is the start of the spin
    if (bet > 0) {
      // Deduct bet from balance immediately
      setChips(prev => prev - bet);
      return;
    }

    // If no bet is provided, this is the end of the spin with results
    // Calculate and add winnings
    const winAmount = calculateWin(result);
    if (winAmount > 0) {
      setChips(prev => prev + winAmount);
      setLastWin(winAmount);
    } else {
      setLastWin(0);
    }
  };

  const handleWin = (amount: number) => {
    setChips(prev => prev + amount);
  };

  const handleLose = (amount: number) => {
    setChips(prev => prev - amount);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <NavBar />
      <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
        <SlotMachine onSpin={handleSpin} chips={chips} />
      </main>
      <Footer />
    </div>
  );
} 