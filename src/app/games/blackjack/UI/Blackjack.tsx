/*
- Component: Blackjack
- Purpose: Implements a fully functional blackjack game with animations and state management
- Features: Card dealing, betting, player actions, dealer logic, and win/loss tracking
*/

"use client";

import React, { useState, useEffect, useRef } from 'react';
import anime from 'animejs';
import RulesDropdown from '../../../UI/RulesDropdown';

/*
- Interface Definitions:
- Card: Defines the structure of a playing card with suit, value, and numeric value
- BlackjackProps: Defines the props required by the component including callbacks for game events
*/
interface Card {
  suit: '♠' | '♣' | '♥' | '♦';
  value: string;
  numericValue: number;
}

interface BlackjackProps {
  onGameEnd: (result: 'win' | 'lose' | 'push') => void;
  chips: number;
  onBet: (amount: number) => void;
  onWin: (amount: number) => void;
}

/*
- Game Rules Configuration:
- Defines the rules displayed in the RulesDropdown component
- Each rule has a title and description explaining game mechanics
*/
const blackjackRules = [
  {
    title: "Basic Rules",
    description: "Beat the dealer by getting a count as close to 21 as possible, without going over 21. Face cards are worth 10, Aces are worth 1 or 11."
  },
  {
    title: "Card Values",
    description: "2-10 = face value, Jack/Queen/King = 10, Ace = 1 or 11"
  },
  {
    title: "Betting",
    description: "Place your bet before the hand begins. Win 2x your bet on a regular win, get your bet back on a push (tie)."
  },
  {
    title: "Actions",
    description: "Hit to take another card, Stand to keep your current hand. If you go over 21, you bust and lose your bet."
  }
];

export default function Blackjack({ onGameEnd, chips, onBet, onWin }: BlackjackProps) {
  /*
  - State Management:
  - deck: Array of remaining cards in the deck
  - playerHand: Array of cards in player's hand
  - dealerHand: Array of cards in dealer's hand
  - gameStatus: Current phase of the game (betting/playing/dealerTurn/ended)
  - message: Display message for game events
  - winAmount: Amount won or lost in current hand
  - currentBet: Current bet amount
  - isDealing: Flag for card dealing animation
  - Refs for DOM manipulation of card containers
  */
  const [deck, setDeck] = useState<Card[]>([]);
  const [playerHand, setPlayerHand] = useState<Card[]>([]);
  const [dealerHand, setDealerHand] = useState<Card[]>([]);
  const [gameStatus, setGameStatus] = useState<'betting' | 'playing' | 'dealerTurn' | 'ended'>('betting');
  const [message, setMessage] = useState<string>('');
  const [winAmount, setWinAmount] = useState<number>(0);
  const [currentBet, setCurrentBet] = useState<number>(0);
  const [isDealing, setIsDealing] = useState(false);
  const playerHandRef = useRef<HTMLDivElement>(null);
  const dealerHandRef = useRef<HTMLDivElement>(null);

  /*
  - Deck Initialization:
  - Creates a new deck of 52 cards
  - Assigns numeric values to cards (Ace = 11, Face cards = 10)
  - Shuffles the deck using Fisher-Yates algorithm
  - Runs once when component mounts
  */
  useEffect(() => {
    const suits: Card['suit'][] = ['♠', '♣', '♥', '♦'];
    const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    
    const newDeck: Card[] = suits.flatMap(suit =>
      values.map(value => ({
        suit,
        value,
        numericValue: value === 'A' ? 11 : ['J', 'Q', 'K'].includes(value) ? 10 : parseInt(value)
      }))
    );

    // Shuffle deck
    for (let i = newDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
    }

    setDeck(newDeck);
  }, []);

  /*
  - Hand Value Calculation:
  - Calculates the total value of a hand
  - Handles Ace values (1 or 11) appropriately
  - Returns the best possible hand value
  */
  const calculateHandValue = (hand: Card[]): number => {
    let value = 0;
    let aces = 0;

    hand.forEach(card => {
      if (card.value === 'A') {
        aces++;
      }
      value += card.numericValue;
    });

    // Adjust for aces
    while (value > 21 && aces > 0) {
      value -= 10;
      aces--;
    }

    return value;
  };

  /*
  - Card Rendering:
  - Renders a single card with proper styling
  - Handles card positioning and spacing
  - Applies red color to hearts and diamonds
  */
  const renderCard = (card: Card, index: number, total: number) => {
    const isRed = card.suit === '♥' || card.suit === '♦';
    // Adjust spacing based on number of cards
    const cardSpacing = total > 3 ? 70 : 90; // Reduce spacing when more cards
    const cardWidth = 80; // w-20 = 5rem = 80px
    const totalWidth = (total * cardWidth) + ((total - 1) * (cardSpacing - cardWidth)); // Account for gaps between cards
    const startOffset = (360 - totalWidth) / 2;
    const offset = `${startOffset + (index * cardSpacing)}px`;
    
    return (
      <div 
        key={`${card.value}${card.suit}-${index}`}
        className={`absolute w-20 h-32 bg-gray-800 rounded-lg shadow-lg flex items-center justify-center text-2xl border-2 border-yellow-500 ${
          isRed ? 'text-red-500' : 'text-white'
        }`}
        style={{ 
          left: offset,
          opacity: 1,
          transform: 'scale(1)',
          transition: 'left 0.3s ease'
        }}
      >
        {card.value}{card.suit}
      </div>
    );
  };

  /*
  - Card Animation:
  - Animates the appearance of new cards
  - Uses anime.js for smooth animations
  - Handles opacity and scale transitions
  */
  const animateCardAppearance = (card: Card, targetElement: HTMLElement, delay: number, cardIndex: number = 0) => {
    const cardElements = targetElement.children;
    const cardElement = cardElements[cardIndex] as HTMLElement;
    if (!cardElement) return;

    anime.set(cardElement, {
      opacity: 0,
      scale: 0.5
    });

    return anime({
      targets: cardElement,
      opacity: [0, 1],
      scale: [0.5, 1],
      duration: 500,
      delay: delay,
      easing: 'easeOutExpo'
    });
  };

  /*
  - Deck Reshuffling:
  - Creates a new deck when current deck is running low
  - Maintains game continuity
  */
  const reshuffleDeck = () => {
    const suits: Card['suit'][] = ['♠', '♣', '♥', '♦'];
    const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    
    const newDeck: Card[] = suits.flatMap(suit =>
      values.map(value => ({
        suit,
        value,
        numericValue: value === 'A' ? 11 : ['J', 'Q', 'K'].includes(value) ? 10 : parseInt(value)
      }))
    );

    // Shuffle deck
    for (let i = newDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
    }

    return newDeck;
  };

  /*
  - Game Start:
  - Handles initial card dealing
  - Manages deck reshuffling if needed
  - Animates card appearances
  */
  const startGame = async () => {
    if (currentBet === 0) {
      setMessage('Please place a bet first!');
      return;
    }

    setIsDealing(true);
    onBet(currentBet);

    // Check if we need to reshuffle
    let currentDeck = [...deck];
    if (currentDeck.length < 10) {
      currentDeck = reshuffleDeck();
      setDeck(currentDeck);
    }

    // Deal initial cards
    const playerCards = [currentDeck.pop()!, currentDeck.pop()!];
    const dealerCards = [currentDeck.pop()!, currentDeck.pop()!];

    setDeck(currentDeck);
    setPlayerHand(playerCards);
    setDealerHand(dealerCards);

    // Animate cards appearing
    await Promise.all([
      animateCardAppearance(playerCards[0], playerHandRef.current!, 0, 0),
      animateCardAppearance(playerCards[1], playerHandRef.current!, 200, 1),
      animateCardAppearance(dealerCards[0], dealerHandRef.current!, 400, 0),
      animateCardAppearance(dealerCards[1], dealerHandRef.current!, 600, 1)
    ]);

    setIsDealing(false);
    setGameStatus('playing');
    setMessage('');
  };

  /*
  - Player Actions:
  - Hit: Draws a new card for the player
  - Handles bust condition
  - Manages deck reshuffling if needed
  */
  const hit = async () => {
    let currentDeck = [...deck];
    if (currentDeck.length < 5) {
      currentDeck = reshuffleDeck();
      setDeck(currentDeck);
      setMessage('Deck reshuffled!');
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage('');
    }

    const newCard = currentDeck.pop()!;
    const newHand = [...playerHand, newCard];
    
    setDeck(currentDeck);
    setPlayerHand(newHand);

    // Animate new card appearing
    await animateCardAppearance(newCard, playerHandRef.current!, 0, playerHand.length);

    if (calculateHandValue(newHand) > 21) {
      setGameStatus('ended');
      setMessage('Bust! You lose your bet.');
      setWinAmount(-currentBet);
      onGameEnd('lose');
    }
  };

  /*
  - Stand Action:
  - Ends player's turn
  - Initiates dealer's turn
  */
  const stand = () => {
    setGameStatus('dealerTurn');
    dealerTurn();
  };

  /*
  - Dealer's Turn:
  - Implements dealer logic (hit on 16 or below)
  - Handles deck reshuffling if needed
  - Determines game outcome
  - Updates game state and player balance
  */
  const dealerTurn = async () => {
    let currentDealerHand = [...dealerHand];
    let currentDeck = [...deck];

    while (calculateHandValue(currentDealerHand) <= 16) {
      if (currentDeck.length < 5) {
        currentDeck = reshuffleDeck();
        setDeck(currentDeck);
        setMessage('Deck reshuffled!');
        await new Promise(resolve => setTimeout(resolve, 1000));
        setMessage('');
      }

      const newCard = currentDeck.pop()!;
      currentDealerHand = [...currentDealerHand, newCard];
      
      setDeck(currentDeck);
      setDealerHand(currentDealerHand);
      
      // Animate new card appearing
      await animateCardAppearance(newCard, dealerHandRef.current!, 0, currentDealerHand.length - 1);
      
      // Small delay between dealer cards
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    // Determine winner
    const playerValue = calculateHandValue(playerHand);
    const dealerValue = calculateHandValue(currentDealerHand);

    if (dealerValue > 21) {
      setMessage('Dealer busts! You win! You get 2x your bet.');
      setWinAmount(currentBet * 2);
      onGameEnd('win');
      onWin(currentBet * 2);
    } else if (dealerValue > playerValue) {
      setMessage('Dealer wins! You lose your bet.');
      setWinAmount(-currentBet);
      onGameEnd('lose');
    } else if (dealerValue < playerValue) {
      setMessage('You win! You get 2x your bet.');
      setWinAmount(currentBet * 2);
      onGameEnd('win');
      onWin(currentBet * 2);
    } else {
      setMessage('Push! You get your bet back.');
      setWinAmount(currentBet);
      onGameEnd('push');
      onWin(currentBet);
    }

    setGameStatus('ended');
  };

  /*
  - Betting:
  - Handles bet placement
  - Validates bet amount against available chips
  */
  const placeBet = (amount: number) => {
    if (amount > chips) {
      setMessage('Not enough chips!');
      return;
    }
    setCurrentBet(amount);
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
      <div className="flex flex-col items-center gap-6 w-full">
        <RulesDropdown gameName="Blackjack" rules={blackjackRules} />
      </div>

      {/* Game Message */}
      {message && (
        <div className="text-center space-y-2">
          <div className="text-2xl font-bold">
            {message}
          </div>
          {gameStatus === 'ended' && (
            <div className={`text-xl font-bold ${winAmount >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {/* Display win or loss amount */}
              {winAmount >= 0 ? '+' : '-'}${Math.abs(winAmount)}
            </div>
          )}
        </div>
      )}

      {/* Game Container Card */}
      <div className="w-full max-w-4xl bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
        {/* Game Table */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 w-full mb-8">
          {/* Dealer's Hand */}
          <div className="flex flex-col items-center gap-4 lg:w-1/3">
            <h2 className="text-xl font-bold">Dealer's Hand ({calculateHandValue(dealerHand)})</h2>
            <div ref={dealerHandRef} className="relative h-32 w-[360px]">
              <div className="absolute inset-0 flex justify-center">
                {dealerHand.map((card, index) => renderCard(card, index, dealerHand.length))}
              </div>
            </div>
          </div>

          {/* Game Controls - Center */}
          <div className="flex flex-col items-center gap-4 lg:w-1/3">
            {gameStatus === 'betting' && (
              <div className="flex flex-wrap gap-4 justify-center">
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
                    {amount}
                  </button>
                ))}
                <button
                  onClick={startGame}
                  disabled={currentBet === 0 || isDealing}
                  className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:bg-gray-500"
                >
                  Deal
                </button>
              </div>
            )}

            {gameStatus === 'playing' && (
              <div className="flex gap-4">
                <button
                  onClick={hit}
                  disabled={isDealing}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-500"
                >
                  Hit
                </button>
                <button
                  onClick={stand}
                  disabled={isDealing}
                  className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:bg-gray-500"
                >
                  Stand
                </button>
              </div>
            )}

            {gameStatus === 'ended' && (
              <button
                onClick={() => {
                  setPlayerHand([]);
                  setDealerHand([]);
                  setCurrentBet(0);
                  setGameStatus('betting');
                  setMessage('');
                  setWinAmount(0);
                }}
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                New Hand
              </button>
            )}
          </div>

          {/* Player's Hand */}
          <div className="flex flex-col items-center gap-4 lg:w-1/3">
            <h2 className="text-xl font-bold">Your Hand ({calculateHandValue(playerHand)})</h2>
            <div ref={playerHandRef} className="relative h-32 w-[360px]">
              <div className="absolute inset-0 flex justify-center">
                {playerHand.map((card, index) => renderCard(card, index, playerHand.length))}
              </div>
            </div>
          </div>
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