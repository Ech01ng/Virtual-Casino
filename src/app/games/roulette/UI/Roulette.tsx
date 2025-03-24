/*
- Component: Roulette
- Purpose: Implements a fully functional roulette game with betting options and animations
- Features: Number selection, color betting, even/odd betting, and win/loss tracking
*/

"use client";

import React, { useState, useEffect, useRef } from 'react';
import RulesDropdown from '../../../UI/RulesDropdown';

/*
- Interface Definitions:
- RouletteProps: Defines the props required by the component including callbacks for betting and winning
- NumberData: Defines the structure of a roulette number with its color
*/

interface RouletteProps {
  chips: number;
  onBet: (amount: number) => void;
  onWin: (amount: number) => void;
}

/*
- Game Rules Configuration:
- Defines the rules displayed in the RulesDropdown component
- Each rule has a title and description explaining game mechanics
- Includes information about betting options and payouts
*/
const rouletteRules = [
  {
    title: "Basic Rules",
    description: "Place bets on numbers, colors, or groups. The wheel spins and if the ball lands on your bet, you win!"
  },
  {
    title: "Betting Options",
    description: "Straight (single number): 35:1, Red/Black: 1:1, Odd/Even: 1:1, Dozens: 2:1, Columns: 2:1"
  },
  {
    title: "Payouts",
    description: "Different bets have different payouts. Single numbers pay 35:1, while even-money bets like red/black pay 1:1"
  },
  {
    title: "House Edge",
    description: "The green 0 gives the house an edge of approximately 2.7% on all bets"
  }
];

/*
- Number Data Structure:
- Defines the structure for each number on the roulette wheel
- Includes the number value and its color (red, black, or green)
*/
interface NumberData {
  number: number;
  color: 'red' | 'black' | 'green';
}

/*
- Roulette Numbers Configuration:
- Defines all numbers on the roulette wheel with their colors
- Uses -1 to represent '00' for simplicity
- Numbers are arranged in the standard roulette layout
*/
const rouletteNumbers: NumberData[] = [
  { number: 0, color: 'green' },
  { number: -1, color: 'green' }, // Using -1 to represent '00'
  { number: 3, color: 'red' },
  { number: 2, color: 'black' },
  { number: 1, color: 'red' },
  { number: 6, color: 'black' },
  { number: 5, color: 'red' },
  { number: 4, color: 'black' },
  { number: 9, color: 'red' },
  { number: 8, color: 'black' },
  { number: 7, color: 'red' },
  { number: 12, color: 'red' },
  { number: 11, color: 'black' },
  { number: 10, color: 'black' },
  { number: 15, color: 'black' },
  { number: 14, color: 'black' },
  { number: 13, color: 'red' },
  { number: 18, color: 'red' },
  { number: 17, color: 'black' },
  { number: 16, color: 'red' },
  { number: 21, color: 'red' },
  { number: 20, color: 'black' },
  { number: 19, color: 'red' },
  { number: 24, color: 'black' },
  { number: 23, color: 'black' },
  { number: 22, color: 'red' },
  { number: 27, color: 'red' },
  { number: 26, color: 'black' },
  { number: 25, color: 'red' },
  { number: 30, color: 'red' },
  { number: 29, color: 'black' },
  { number: 28, color: 'black' },
  { number: 33, color: 'red' },
  { number: 32, color: 'black' },
  { number: 31, color: 'red' },
  { number: 36, color: 'red' },
  { number: 35, color: 'black' },
  { number: 34, color: 'red' }
];

export default function Roulette({ chips, onBet, onWin }: RouletteProps) {
  /*
  - State Management:
  - currentBet: Current bet amount
  - selectedNumber: Selected number for straight bet
  - selectedBetType: Type of bet (straight/color/even-odd)
  - selectedColor: Selected color for color bet
  - selectedEvenOdd: Selected even/odd for even-odd bet
  - spinning: Flag for wheel spinning animation
  - result: Winning number and color
  - message: Display message for game events
  */
  const [currentBet, setCurrentBet] = useState<number>(0);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [selectedBetType, setSelectedBetType] = useState<'straight' | 'color' | 'even-odd' | null>(null);
  const [selectedColor, setSelectedColor] = useState<'red' | 'black' | null>(null);
  const [selectedEvenOdd, setSelectedEvenOdd] = useState<'even' | 'odd' | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<NumberData | null>(null);
  const [message, setMessage] = useState<string>('');
  
  // Add ref for the result display section
  const resultRef = useRef<HTMLDivElement>(null);

  // Add ref for the rules section
  const rulesRef = useRef<HTMLDivElement>(null);

  /*
  - Betting Functions:
  - placeBet: Handles bet placement and validation
  - selectNumber: Handles straight number selection
  - selectColor: Handles color bet selection
  - selectEvenOdd: Handles even/odd bet selection
  */
  const placeBet = (amount: number) => {
    if (amount > chips) {
      setMessage('Not enough chips!');
      return;
    }
    setCurrentBet(amount);
    setMessage('');
  };

  const selectNumber = (number: number) => {
    setSelectedNumber(number);
    setSelectedBetType('straight');
    setSelectedColor(null);
    setSelectedEvenOdd(null);
  };

  const selectColor = (color: 'red' | 'black') => {
    setSelectedColor(color);
    setSelectedBetType('color');
    setSelectedNumber(null);
    setSelectedEvenOdd(null);
  };

  const selectEvenOdd = (type: 'even' | 'odd') => {
    setSelectedEvenOdd(type);
    setSelectedBetType('even-odd');
    setSelectedNumber(null);
    setSelectedColor(null);
  };

  /*
  - Game Logic:
  - spin: Handles the wheel spinning and result determination
  - Calculates winnings based on bet type and multiplier
  - Updates game state and player balance
  */
  const spin = async () => {
    if (currentBet === 0) {
      setMessage('Please place a bet first!');
      return;
    }

    if (!selectedBetType) {
      setMessage('Please select a bet type!');
      return;
    }

    setSpinning(true);
    onBet(currentBet);

    // Scroll to the rules section
    setTimeout(() => {
      rulesRef.current?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest'
      });
    }, 100);

    // Simulate wheel spinning
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Get random result
    const winningNumber = rouletteNumbers[Math.floor(Math.random() * rouletteNumbers.length)];
    setResult(winningNumber);

    // Check if won
    let won = false;
    let multiplier = 0;

    if (selectedBetType === 'straight' && selectedNumber === winningNumber.number) {
      won = true;
      multiplier = 35;
    } else if (selectedBetType === 'color' && selectedColor === winningNumber.color) {
      won = true;
      multiplier = 1;
    } else if (selectedBetType === 'even-odd') {
      const isEven = winningNumber.number !== 0 && winningNumber.number % 2 === 0;
      if ((selectedEvenOdd === 'even' && isEven) || (selectedEvenOdd === 'odd' && !isEven)) {
        won = true;
        multiplier = 1;
      }
    }

    if (won) {
      const winnings = currentBet * (multiplier + 1); // Include original bet
      onWin(winnings);
      setMessage('You won $' + winnings + '!');
    } else {
      setMessage('Better luck next time! You lost $' + currentBet);
    }

    setSpinning(false);
  };

  /*
  - Reset Function:
  - Resets all game state to initial values
  - Clears all selections and messages
  */
  const resetBets = () => {
    setCurrentBet(0);
    setSelectedNumber(null);
    setSelectedBetType(null);
    setSelectedColor(null);
    setSelectedEvenOdd(null);
    setResult(null);
    setMessage('');
  };

  /*
  - Component Render:
  - Renders the game interface
  - Handles responsive layout
  - Displays game state and controls
  */
  return (
    <div className="flex flex-col items-center gap-6 p-4">
      {/* Rules Dropdown and Game Info Section */}
      <div ref={rulesRef} className="flex flex-col items-center gap-6 w-full">
        <RulesDropdown gameName="Roulette" rules={rouletteRules} />
      </div>

      {/* Game Message */}
      {message && (
        <div className="text-2xl font-bold text-center mb-4 text-white">
          {message}
        </div>
      )}

      {/* Game Container Card */}
      <div className="w-full max-w-4xl bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
        {/* Roulette Wheel Result */}
        <div className="flex flex-col items-center mb-8">
          {result && (
            <div className={`text-4xl font-bold mb-4 ${
              result.color === 'red' ? 'text-red-500' : 
              result.color === 'black' ? 'text-white' : 
              'text-green-500'
            }`}>
              {result.number}
            </div>
          )}
          {spinning && (
            <div className="text-2xl font-bold animate-pulse">
              Spinning...
            </div>
          )}
        </div>

        {/* Betting Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-1 sm:gap-2 mb-8 mx-auto max-w-[360px] sm:max-w-none">
          {/* Green 0 spanning full width */}
          <button
            onClick={() => selectNumber(0)}
            className={`col-span-2 sm:col-span-6 p-2 sm:p-4 rounded-lg mb-1 sm:mb-2 ${
              selectedNumber === 0
                ? 'bg-yellow-500 text-black'
                : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            0
          </button>

          {/* Red numbers column */}
          <div className="grid gap-1 sm:hidden">
            {rouletteNumbers
              .filter(num => num.color === 'red')
              .sort((a, b) => a.number - b.number)
              .map((num) => (
                <button
                  key={num.number}
                  onClick={() => selectNumber(num.number)}
                  className={`p-2 rounded-lg ${
                    selectedNumber === num.number
                      ? 'bg-yellow-500 text-black'
                      : 'bg-red-500 hover:bg-red-600'
                  }`}
                >
                  {num.number}
                </button>
              ))}
          </div>

          {/* Black numbers column */}
          <div className="grid gap-1 sm:hidden">
            {rouletteNumbers
              .filter(num => num.color === 'black')
              .sort((a, b) => a.number - b.number)
              .map((num) => (
                <button
                  key={num.number}
                  onClick={() => selectNumber(num.number)}
                  className={`p-2 rounded-lg ${
                    selectedNumber === num.number
                      ? 'bg-yellow-500 text-black'
                      : 'bg-gray-900 hover:bg-gray-800'
                  }`}
                >
                  {num.number}
                </button>
              ))}
          </div>

          {/* Green 00 for mobile */}
          <button
            onClick={() => selectNumber(-1)}
            className={`col-span-2 sm:hidden p-2 rounded-lg ${
              selectedNumber === -1
                ? 'bg-yellow-500 text-black'
                : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            00
          </button>

          {/* Desktop grid layout */}
          <div className="hidden sm:contents">
            {/* First row (3, 6, 9, 12, 15, 18) */}
            {[3, 6, 9, 12, 15, 18].map((number) => (
              <button
                key={number}
                onClick={() => selectNumber(number)}
                className={`p-4 rounded-lg ${
                  selectedNumber === number
                    ? 'bg-yellow-500 text-black'
                    : rouletteNumbers.find(n => n.number === number)?.color === 'red'
                      ? 'bg-red-500 hover:bg-red-600'
                      : 'bg-gray-900 hover:bg-gray-800'
                }`}
              >
                {number}
              </button>
            ))}
            {/* Second row (2, 5, 8, 11, 14, 17) */}
            {[2, 5, 8, 11, 14, 17].map((number) => (
              <button
                key={number}
                onClick={() => selectNumber(number)}
                className={`p-4 rounded-lg ${
                  selectedNumber === number
                    ? 'bg-yellow-500 text-black'
                    : rouletteNumbers.find(n => n.number === number)?.color === 'red'
                      ? 'bg-red-500 hover:bg-red-600'
                      : 'bg-gray-900 hover:bg-gray-800'
                }`}
              >
                {number}
              </button>
            ))}
            {/* Third row (21, 24, 27, 30, 33, 36) */}
            {[21, 24, 27, 30, 33, 36].map((number) => (
              <button
                key={number}
                onClick={() => selectNumber(number)}
                className={`p-4 rounded-lg ${
                  selectedNumber === number
                    ? 'bg-yellow-500 text-black'
                    : rouletteNumbers.find(n => n.number === number)?.color === 'red'
                      ? 'bg-red-500 hover:bg-red-600'
                      : 'bg-gray-900 hover:bg-gray-800'
                }`}
              >
                {number}
              </button>
            ))}
            {/* Fourth row (20, 23, 26, 29, 32, 35) */}
            {[20, 23, 26, 29, 32, 35].map((number) => (
              <button
                key={number}
                onClick={() => selectNumber(number)}
                className={`p-4 rounded-lg ${
                  selectedNumber === number
                    ? 'bg-yellow-500 text-black'
                    : rouletteNumbers.find(n => n.number === number)?.color === 'red'
                      ? 'bg-red-500 hover:bg-red-600'
                      : 'bg-gray-900 hover:bg-gray-800'
                }`}
              >
                {number}
              </button>
            ))}
            {/* Fifth row (19, 22, 25, 28, 31, 34) */}
            {[19, 22, 25, 28, 31, 34].map((number) => (
              <button
                key={number}
                onClick={() => selectNumber(number)}
                className={`p-4 rounded-lg ${
                  selectedNumber === number
                    ? 'bg-yellow-500 text-black'
                    : rouletteNumbers.find(n => n.number === number)?.color === 'red'
                      ? 'bg-red-500 hover:bg-red-600'
                      : 'bg-gray-900 hover:bg-gray-800'
                }`}
              >
                {number}
              </button>
            ))}
            {/* Sixth row (1, 4, 7, 10, 13, 16) */}
            {[1, 4, 7, 10, 13, 16].map((number) => (
              <button
                key={number}
                onClick={() => selectNumber(number)}
                className={`p-4 rounded-lg ${
                  selectedNumber === number
                    ? 'bg-yellow-500 text-black'
                    : rouletteNumbers.find(n => n.number === number)?.color === 'red'
                      ? 'bg-red-500 hover:bg-red-600'
                      : 'bg-gray-900 hover:bg-gray-800'
                }`}
              >
                {number}
              </button>
            ))}
          </div>

          {/* Green 00 for desktop */}
          <button
            onClick={() => selectNumber(-1)}
            className={`hidden sm:block col-span-6 p-4 rounded-lg ${
              selectedNumber === -1
                ? 'bg-yellow-500 text-black'
                : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            00
          </button>
        </div>

        {/* Betting Options */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <button
            onClick={() => selectColor('red')}
            className={`px-6 py-2 rounded-lg ${
              selectedColor === 'red'
                ? 'bg-yellow-500 text-black'
                : 'bg-red-500 hover:bg-red-600'
            }`}
          >
            Red
          </button>
          <button
            onClick={() => selectColor('black')}
            className={`px-6 py-2 rounded-lg ${
              selectedColor === 'black'
                ? 'bg-yellow-500 text-black'
                : 'bg-gray-900 hover:bg-gray-800'
            }`}
          >
            Black
          </button>
          <button
            onClick={() => selectEvenOdd('even')}
            className={`px-6 py-2 rounded-lg ${
              selectedEvenOdd === 'even'
                ? 'bg-yellow-500 text-black'
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            Even
          </button>
          <button
            onClick={() => selectEvenOdd('odd')}
            className={`px-6 py-2 rounded-lg ${
              selectedEvenOdd === 'odd'
                ? 'bg-yellow-500 text-black'
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            Odd
          </button>
        </div>

        {/* Bet Controls */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {[10, 25, 50, 100].map((amount) => (
            <button
              key={amount}
              onClick={() => placeBet(amount)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                currentBet === amount
                  ? 'bg-yellow-500 text-black'
                  : 'bg-gray-700 text-white hover:bg-gray-600'
              }`}
            >
              ${amount}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center mb-4">
          <button
            onClick={spin}
            disabled={spinning || currentBet === 0 || !selectedBetType}
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:bg-gray-500"
          >
            Spin
          </button>
          
        </div>

        {/* Balance and Bet Display */}
        <div className="mt-6 flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-lg lg:text-2xl font-bold">Balance:</span>
            <span className="text-xl lg:text-3xl font-bold">${chips}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="text-lg lg:text-2xl font-bold">Bet:</span>
              <span className="text-xl lg:text-3xl font-bold">${currentBet}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 