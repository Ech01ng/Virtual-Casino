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