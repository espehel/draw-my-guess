import React, { useState } from 'react';
import createUseContext from 'constate';
import CanvasDraw from 'react-canvas-draw';
import { getStorageKey } from '../utils/draw';
import { Drawing, Game, Player } from '../../types/models';

const initialState: Game = {
  players: [
    { id: '1', name: 'Myau', word: 'cat' },
    { id: '2', name: 'Espen', word: 'dog' },
  ],
  drawings: [],
};

const [GameProvider, useGame] = createUseContext(() => {
  const [game, setGame] = useState<Game>(initialState);

  const setDrawing = (player: Player, word: string, canvas: CanvasDraw) => {
    let drawings: Drawing[] = game.drawings;

    const storageKey = getStorageKey(player.id, player.name, word);
    localStorage.setItem(storageKey, canvas.getSaveData());
    drawings.push({
      id: `${player.id}-${word}`,
      word: word,
      artist: player.name,
      canvas: canvas.getSaveData(),
    });
    setGame({ ...game, drawings: drawings });
  };

  return { game, setGame };
});

export { GameProvider, useGame };
