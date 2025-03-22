"use client";

/**
 * SlotCard Component
 * A specialized card component for displaying slot games.
 * This component includes slot-specific information and styling.
 */

import React from 'react';

interface SlotCardProps {
  name: string;
  description: string;
  rtp: number;
  volatility: 'Low' | 'Medium' | 'High';
  onPlay: () => void;
}

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