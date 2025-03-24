/*
- Component: SlotCard
- Purpose: Displays information about a slot game in a card format
- Features: Game preview, RTP display, volatility indicator, and play button
*/

"use client";

/**
 * SlotCard Component
 * A specialized card component for displaying slot games.
 * This component includes slot-specific information and styling.
 */

import React from 'react';

/*
- Interface Definitions:
- SlotCardProps: Defines the props required by the component
- name: Name of the slot game
- description: Brief description of the game
- rtp: Return to Player percentage
- volatility: Game volatility level (Low/Medium/High)
- onPlay: Callback function for play button click
*/
interface SlotCardProps {
  name: string;
  description: string;
  rtp: number;
  volatility: 'Low' | 'Medium' | 'High';
  onPlay: () => void;
}

/*
- Component Class:
- Extends React.Component for class-based component implementation
- Renders a card with game information and play button
*/
class SlotCard extends React.Component<SlotCardProps> {
  render() {
    const { name, description, rtp, volatility, onPlay } = this.props;
    
    return (
      <div className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform">
        {/* Game Preview Area */}
        <div className="aspect-video bg-gray-700 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold">{name}</span>
          </div>
        </div>
        {/* Game Info */}
        <div className="p-4">
          <h3 className="text-xl font-bold mb-2">{name}</h3>
          <p className="text-gray-400 mb-4">{description}</p>
          {/* Slot-specific details */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <span className="text-sm text-gray-500">RTP</span>
              <p className="font-semibold">{rtp}%</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Volatility</span>
              <p className="font-semibold">{volatility}</p>
            </div>
          </div>
          {/* Play Button */}
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

export default SlotCard; 