"use client";

import React, { useState, useEffect } from 'react';

/**
 * Slot Machine Component
 * Displays a 3-reel slot machine with spinning animation and game logic.
 */

interface SlotMachineProps {
  onSpin: (result: string[]) => void;
}

export default function SlotMachine({ onSpin }: SlotMachineProps) {
  // Define available symbols
  const symbols = ['7️⃣', '🍒', '🍋', '🍊', '💎'];
  
  // State for reels and spinning
  const [reels, setReels] = useState<string[]>(['💎', '💎', '💎']);
  const [isSpinning, setIsSpinning] = useState(false);

  /**
   * Generates a random symbol
   */
  const getRandomSymbol = () => {
    return symbols[Math.floor(Math.random() * symbols.length)];
  };

  /**
   * Handles the spin animation
   */
  const spin = () => {
    setIsSpinning(true);
    
    // Generate final results
    const finalResults = [
      getRandomSymbol(),
      getRandomSymbol(),
      getRandomSymbol()
    ];

    let spins = 0;
    const maxSpins = 20;

    // Animate the reels
    const spinInterval = setInterval(() => {
      setReels([
        getRandomSymbol(),
        getRandomSymbol(),
        getRandomSymbol()
      ]);
      
      spins++;
      
      // Stop after maxSpins
      if (spins >= maxSpins) {
        clearInterval(spinInterval);
        setReels(finalResults);
        setIsSpinning(false);
        onSpin(finalResults);
      }
    }, 100);
  };

  return (
    <div className="relative">
      {/* Reels Container */}
      <div className="bg-gray-900 rounded-lg p-4 mb-4">
        <div className="flex justify-center gap-2">
          {reels.map((symbol, index) => (
            <div 
              key={index}
              className="w-24 h-24 bg-gray-800 rounded-lg flex items-center justify-center text-4xl"
            >
              {symbol}
            </div>
          ))}
        </div>
      </div>

      {/* Spin Button */}
      <button
        onClick={spin}
        disabled={isSpinning}
        className={`w-full py-3 rounded-lg font-bold text-xl transition-colors ${
          isSpinning 
            ? 'bg-gray-600 cursor-not-allowed' 
            : 'bg-yellow-500 hover:bg-yellow-400 text-black'
        }`}
      >
        {isSpinning ? 'Spinning...' : 'Spin'}
      </button>
    </div>
  );
} 