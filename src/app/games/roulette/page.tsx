"use client";

import React, { useState } from 'react';
import NavBar from '../../UI/NavBar';
import Footer from '../../UI/Footer';
import Roulette from './UI/Roulette';

export default function RoulettePage() {
  const [chips, setChips] = useState(1000);

  const handleBet = (amount: number) => {
    setChips(prev => prev - amount);
  };

  const handleWin = (amount: number) => {
    setChips(prev => prev + amount);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <NavBar />
      <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Roulette</h1>
      <div className="text-gray-400 text-center mb-8 text-sm lg:text-base">
          The classic casino game of roulette with a modern twist
        </div>
        <Roulette 
          chips={chips}
          onBet={handleBet}
          onWin={handleWin}
        />
      </main>
      <Footer />
    </div>
  );
} 