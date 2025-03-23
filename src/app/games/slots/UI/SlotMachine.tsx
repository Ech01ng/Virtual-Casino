"use client";

import React, { useState, useEffect, useRef } from 'react';
import anime from 'animejs';
import RulesDropdown from '../../../UI/RulesDropdown';

/**
 * Slot Machine Component
 * Displays a 3-reel slot machine with spinning animation and game logic.
 */

interface SlotMachineProps {
  onSpin: (result: string[]) => void;
  chips: number;
}

// Add slot machine rules
const slotRules = [
  {
    title: "How to Play",
    description: "Click the spin button to start the game. The reels will spin and stop randomly. Match symbols to win!"
  },
  {
    title: "Winning Combinations",
    description: <>
      Match 3 identical symbols to win. Payouts for three of a kind:<br/><br/>
      • 7️⃣ Seven: 100x your bet<br/>
      • 🍒 Cherry: 50x your bet<br/>
      • 🍋 Lemon: 25x your bet<br/>
      • 🍊 Orange: 15x your bet<br/>
      • 💎 Diamond: 10x your bet
    </>
  },
  {
    title: "Game Info",
    description: <>
      RTP (Return to Player): 96.5%<br/>
      Volatility: Low<br/>
      Minimum Bet: 1 chip
    </>
  },
  {
    title: "Tips",
    description: "Manage your chips wisely! The lucky Seven (7️⃣) gives the highest payout at 100x your bet, while other symbols offer smaller but more frequent wins."
  }
];

export default function SlotMachine({ onSpin, chips }: SlotMachineProps) {
  // Define available symbols
  const symbols = ['7️⃣', '🍒', '🍋', '🍊', '💎'];
  
  // State for reels and spinning
  const [reels, setReels] = useState<string[]>(['💎', '💎', '💎']);
  const [isSpinning, setIsSpinning] = useState(false);
  const reelRefs = useRef<(HTMLDivElement | null)[]>([]);

  /**
   * Generates a random symbol
   */
  const getRandomSymbol = () => {
    return symbols[Math.floor(Math.random() * symbols.length)];
  };

  const getPreviousSymbol = (currentSymbol: string) => {
    const currentIndex = symbols.indexOf(currentSymbol);
    return symbols[(currentIndex - 1 + symbols.length) % symbols.length];
  };

  const getNextSymbol = (currentSymbol: string) => {
    const currentIndex = symbols.indexOf(currentSymbol);
    return symbols[(currentIndex + 1) % symbols.length];
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

    // Create a sequence of animations for each reel
    const animations = reelRefs.current.map((reel, index) => {
      if (!reel) return null;

      // Create a sequence of symbols for smooth spinning
      const symbolSequence = Array.from({ length: 20 }, () => getRandomSymbol());
      symbolSequence.push(finalResults[index]);

      // Create the spinning animation
      return anime({
        targets: reel,
        duration: 2000,
        delay: index * 500, // Stagger the start of each reel with 500ms delay
        easing: 'easeOutExpo',
        complete: () => {
          if (index === 2) { // Last reel
            setIsSpinning(false);
            onSpin(finalResults);
          }
        },
        update: (anim: anime.AnimeInstance) => {
          const progress = anim.progress;
          const symbolIndex = Math.floor((progress / 100) * symbolSequence.length);
          if (symbolIndex < symbolSequence.length) {
            const currentSymbol = symbolSequence[symbolIndex];
            const prevSymbol = getPreviousSymbol(currentSymbol);
            const nextSymbol = getNextSymbol(currentSymbol);
            
            // Update the reel content with previous, current, and next symbols
            reel.innerHTML = `
              <div class="flex flex-col h-full py-2 lg:py-4">
                <div class="h-1/3 flex items-center justify-center text-4xl lg:text-5xl mb-2 lg:mb-4">${prevSymbol}</div>
                <div class="h-1/3 flex items-center justify-center text-4xl lg:text-5xl mb-2 lg:mb-4">${currentSymbol}</div>
                <div class="h-1/3 flex items-center justify-center text-4xl lg:text-5xl">${nextSymbol}</div>
              </div>
            `;
          }
        }
      });
    });

    // Start all animations
    animations.forEach(anim => anim?.play());
  };

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      {/* Rules Dropdown */}
      <RulesDropdown gameName="Slot Machine" rules={slotRules} />

      {/* Game Info */}
      <div className="text-2xl font-bold">
        Chips: {chips}
      </div>

      {/* Game Container */}
      <div className="relative">
        {/* Reels Container */}
        <div className="bg-gray-900 rounded-lg p-4 mb-4">
          <div className="flex justify-center gap-2 lg:gap-4">
            {reels.map((symbol, index) => (
              <div 
                key={index}
                ref={(el) => { reelRefs.current[index] = el; }}
                className="w-24 h-32 lg:w-32 lg:h-40 bg-gray-800 rounded-lg overflow-hidden border-2 border-yellow-500"
              >
                <div className="flex flex-col h-full py-2 lg:py-4">
                  <div className="h-1/3 flex items-center justify-center text-4xl lg:text-5xl mb-2 lg:mb-4">
                    {getPreviousSymbol(symbol)}
                  </div>
                  <div className="h-1/3 flex items-center justify-center text-4xl lg:text-5xl mb-2 lg:mb-4">
                    {symbol}
                  </div>
                  <div className="h-1/3 flex items-center justify-center text-4xl lg:text-5xl">
                    {getNextSymbol(symbol)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Spin Button */}
        <button
          onClick={spin}
          disabled={isSpinning}
          className={`w-full py-2 lg:py-3 rounded-lg font-bold text-lg lg:text-xl transition-colors ${
            isSpinning 
              ? 'bg-gray-600 cursor-not-allowed' 
              : 'bg-yellow-500 hover:bg-yellow-400 text-black'
          }`}
        >
          {isSpinning ? 'Spinning...' : 'Spin'}
        </button>
      </div>
    </div>
  );
} 