"use client";

import React, { useState, useEffect, useRef } from 'react';
import anime from 'animejs';
import RulesDropdown from '../../../UI/RulesDropdown';

/*
- Component: SlotMachine
- Purpose: Implements a 3-reel slot machine with spinning animations and game logic
- Features: Betting system, spinning animation, symbol matching, and win calculations
*/

interface SlotMachineProps {
  onSpin: (result: string[], bet: number) => void;
  chips: number;
}

/*
- Game Rules Configuration:
- Defines the rules displayed in the RulesDropdown component
- Each rule has a title and description explaining game mechanics
- Includes information about winning combinations and payouts
- Provides game statistics and tips
*/
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
  /*
  - State Management:
  - reels: Array of current symbols on each reel
  - isSpinning: Flag for spinning animation state
  - currentBet: Current bet amount
  - reelRefs: Array of refs for each reel element
  */
  const [reels, setReels] = useState(['7️⃣', '7️⃣', '7️⃣']);
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentBet, setCurrentBet] = useState(10);
  const reelRefs = useRef<(HTMLElement | null)[]>([]);

  /*
  - Symbol Configuration:
  - Defines available symbols with their emoji representations
  - Symbols are ordered by payout value (highest to lowest)
  */
  const symbols = ['7️⃣', '🍒', '🍋', '🍊', '💎'];

  /*
  - Betting Functions:
  - adjustBet: Handles bet amount adjustments
  - Validates bet against available chips
  */
  const adjustBet = (amount: number) => {
    const newBet = currentBet + amount;
    if (newBet >= 5 && newBet <= chips) {
      setCurrentBet(newBet);
    }
  };

  /*
  - Symbol Management Functions:
  - getRandomSymbol: Generates a random symbol from the available set
  - getPreviousSymbol: Gets the previous symbol in the sequence
  - getNextSymbol: Gets the next symbol in the sequence
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

  /*
  - Game Logic:
  - spin: Handles the spinning animation and result determination
  - Creates smooth spinning animation using anime.js
  - Manages bet deduction and win calculation
  */
  const spin = () => {
    if (currentBet > chips) {
      return;
    }
    
    setIsSpinning(true);
    
    // Generate final results
    const finalResults = [
      getRandomSymbol(),
      getRandomSymbol(),
      getRandomSymbol()
    ];

    // Deduct bet immediately when spinning starts
    onSpin([], currentBet);

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
            // Now only pass the results for win calculation
            onSpin(finalResults, 0);
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

  /*
  - Component Render:
  - Renders the game interface
  - Handles responsive layout
  - Displays game state and controls
  */
  return (
    <div className="flex flex-col items-center gap-6 p-4">
      {/* Rules Dropdown */}
      <RulesDropdown gameName="Slot Machine" rules={slotRules} />

      {/* Game Container Card */}
      <div className="w-full max-w-sm lg:max-w-md bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 lg:p-6 shadow-xl">
        {/* Balance and Bet Display */}
        <div className="mb-4 lg:mb-6 flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-base lg:text-xl font-bold">Balance:</span>
            <span className="text-xl lg:text-2xl font-bold">${chips}</span>
          </div>
          <div className="flex items-center gap-2 lg:gap-4">
            <div className="flex flex-col items-end">
              <span className="text-base lg:text-xl font-bold">Bet:</span>
              <span className="text-xl lg:text-2xl font-bold">${currentBet}</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => adjustBet(-5)}
                className="w-8 h-8 lg:w-10 lg:h-10 bg-gray-700 rounded-lg hover:bg-gray-600 flex items-center justify-center text-lg lg:text-xl"
              >
                -
              </button>
              <button
                onClick={() => adjustBet(5)}
                className="w-8 h-8 lg:w-10 lg:h-10 bg-gray-700 rounded-lg hover:bg-gray-600 flex items-center justify-center text-lg lg:text-xl"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Reels Container */}
        <div className="bg-gray-900 rounded-lg p-3 lg:p-4 mb-4">
          <div className="flex justify-center gap-1 lg:gap-4">
            {reels.map((symbol, index) => (
              <div 
                key={index}
                ref={(el) => { reelRefs.current[index] = el; }}
                className="w-20 h-28 lg:w-28 lg:h-36 bg-gray-800 rounded-lg overflow-hidden border-2 border-yellow-500"
              >
                <div className="flex flex-col h-full py-2">
                  <div className="h-1/3 flex items-center justify-center text-3xl lg:text-5xl mb-1 lg:mb-2">
                    {getPreviousSymbol(symbol)}
                  </div>
                  <div className="h-1/3 flex items-center justify-center text-3xl lg:text-5xl mb-1 lg:mb-2">
                    {symbol}
                  </div>
                  <div className="h-1/3 flex items-center justify-center text-3xl lg:text-5xl">
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