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
 - @property {string} image - Optional URL for the game's preview image
 - @property {() => void} onPlay - Callback function triggered when the play button is clicked
*/
interface GameCardProps {
  name: string;
  image?: string;
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
    const { name, image, onPlay } = this.props;
    
    return (
      <div className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition-colors">
        {/* Game Preview Area */}
        <div className="relative h-48 bg-gray-900">
          {image ? (
            <img 
              src={image} 
              alt={`${name} preview`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-4xl">🎰</span>
            </div>
          )}
        </div>
        {/* Card content area */}
        <div className="p-6">
          <h3 className="text-xl font-bold mb-4">{name}</h3>
          {/* Play button with hover effect */}
          <button 
            className="w-full bg-yellow-500 text-black py-2 rounded-lg font-bold hover:bg-yellow-400 transition-colors"
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