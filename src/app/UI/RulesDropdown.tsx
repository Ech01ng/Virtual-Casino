/*
- Component: RulesDropdown
- Purpose: Displays game rules in a modal dropdown
- Features: Toggleable rules panel, responsive grid layout, and animated transitions
- Usage: Used across all casino games to show game-specific rules
*/

import React, { useState } from 'react';

/*
- Interface Definitions:
- RulesDropdownProps: Defines the props required by the component
- gameName: Name of the game to display in the title
- rules: Array of rule objects, each containing a title and description
*/
interface RulesDropdownProps {
  gameName: string;
  rules: {
    title: string;
    description: React.ReactNode;
  }[];
}

export default function RulesDropdown({ gameName, rules }: RulesDropdownProps) {
  /*
  - State Management:
  - isOpen: Controls the visibility of the rules panel
  */
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-6 py-3 bg-gray-800 rounded-lg shadow-lg text-xl font-bold text-white hover:bg-gray-700 transition-colors border-2 border-yellow-500"
      >
        How to Play
        {/* Dropdown Arrow Icon */}
        <svg
          className={`w-5 h-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Rules Modal Overlay */}
      <div 
        className={`fixed inset-0 bg-gray-900/95 z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="container mx-auto px-4 py-8 h-full overflow-y-auto">
          {/* Modal Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl font-bold text-yellow-500">How to Play {gameName}</h2>
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-yellow-500 transition-colors"
              aria-label="Close rules"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Rules Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {rules.map((rule, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-lg p-6 shadow-xl border-2 border-yellow-500"
              >
                <h3 className="text-2xl font-semibold text-yellow-500 mb-4">{rule.title}</h3>
                <p className="text-lg text-white leading-relaxed">{rule.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
} 