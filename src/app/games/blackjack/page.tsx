"use client";

import React, { useState } from 'react';
import Blackjack from './UI/Blackjack';
import NavBar from '../../UI/NavBar';
import Footer from '../../UI/Footer';

export default function BlackjackPage() {
  const [chips, setChips] = useState(1000);

  const handleBet = (amount: number) => {
    setChips(prev => prev - amount);
  };

  const handleWin = (amount: number) => {
    setChips(prev => prev + amount);
  };

  const handleGameEnd = (result: 'win' | 'lose' | 'push') => {
    console.log(`Game ended with result: ${result}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <NavBar />
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Blackjack</h1>
          <div className="text-gray-400 text-center mb-8 text-sm lg:text-base">
            The classic casino game of blackjack with a modern twist
          </div>
          <Blackjack
            chips={chips}
            onBet={handleBet}
            onWin={handleWin}
            onGameEnd={handleGameEnd}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
} 