"use client";

/*
 - GameCard Component
 - Represents a single casino game card in the UI.
 - This component displays the game name and provides a button to start playing.
*/

import React from 'react';

/**
 - Props interface for the GameCard component
 - @interface GameCardProps
 - @property {string} name - The name of the casino game
 - @property {() => void} onPlay - Callback function triggered when the play button is clicked
*/
interface GameCardProps {
  name: string;
  onPlay: () => void;
}

/**
 - GameCard Component
 - A class component that renders a single game card with hover effects and a play button.
*/
class GameCard extends React.Component<GameCardProps> {
  /*
   - Renders the game card UI
   - @returns {JSX.Element} The rendered game card component
  */
  render() {
    const { name, onPlay } = this.props;
    
    return (
      // Main card container with hover effect
      <div className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform">
        {/* Game preview area */}
        <div className="aspect-video bg-gray-700 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold">{name}</span>
          </div>
        </div>
        {/* Card content area */}
        <div className="p-4">
          <h4 className="text-xl font-bold mb-2">{name}</h4>
          {/* Play button with hover effect */}
          <button 
            className="w-full bg-yellow-500 text-black py-2 rounded font-semibold hover:bg-yellow-400 transition-colors"
            onClick={onPlay}
          >
            Play Now
          </button>
        </div>
      </div>
    );
  }
}

export default GameCard; 