"use client";

/*
 - GameCardList Component
 - A container component that displays a grid of casino game cards.
 - This component manages the layout and rendering of multiple GameCard components.
*/

import React from 'react';
import GameCard from './GameCard';

/*
 - Interface representing a casino game
 - @interface Game
 - @property {string} id - Unique identifier for the game
 - @property {string} name - Display name of the game
 - @property {string} image - Optional URL for the game's preview image
*/
interface Game {
  id: string;
  name: string;
  image?: string;
}

/*
 - Props interface for the GameCardList component
 - @interface GameCardListProps
 - @property {Game[]} games - Array of game objects to display
 - @property {(gameId: string) => void} onGameSelect - Callback function triggered when a game is selected
*/
interface GameCardListProps {
  games: Game[];
  onGameSelect: (gameId: string) => void;
}

/*
 - GameCardList Component
 - A class component that renders a responsive grid of game cards.
*/
class GameCardList extends React.Component<GameCardListProps> {
  /*
   - Renders the grid of game cards
   - @returns {JSX.Element} The rendered game card list component
  */
  render() {
    const { games, onGameSelect } = this.props;

    return (
      // Responsive grid container
      // Grid adjusts columns based on screen size:
      // - 1 column on mobile
      // - 2 columns on medium screens
      // - 3 columns on large screens
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <GameCard
            key={game.id}
            name={game.name}
            image={game.image}
            onPlay={() => onGameSelect(game.id)}
          />
        ))}
      </div>
    );
  }
}

export default GameCardList; 