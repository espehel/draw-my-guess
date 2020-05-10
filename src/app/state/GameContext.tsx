import React, { useState } from 'react';
import createUseContext from 'constate';
import { Drawing, Game, Player } from '../../types/models';
import { Connection } from '../api/Connection';
import { SocketEvent } from '../../types/enums';

const initialState: Game = {
  players: [
    { id: '1', name: 'Myau', word: '' },
    { id: '2', name: 'Espen', word: '' },
  ],
  drawings: [],
};

interface Props {
  connection: Connection;
  player: Player;
}
const [GameProvider, useGame] = createUseContext(() => {
  const [game, setGame] = useState<Game>(initialState);
  const [word, setWord] = useState<string>();

  const setDrawing = (player: Player, word: string, canvas: CanvasDraw) => {
    let drawings: Drawing[] = game.drawings;

    const storageKey = getStorageKey(player.id, player.name, word);
    localStorage.setItem(storageKey, canvas.getSaveData());
    drawings.push({
      id: `${player.id}-${word}`,
      word: word,
      artist: player.name,
      canvas: canvas.getSaveData(),

const [GameProvider, useGame] = createUseContext(
  ({ connection, player }: Props) => {
    const [game, setGame] = useState<Game>(initialState);

    const sendDrawing = (drawing: Drawing) => {
      console.log('sending drawing');
      connection.sendDrawing(drawing);
    };

    connection.on(SocketEvent.Drawing, (drawing: Drawing) => {
      console.log(`${SocketEvent.Drawing}: Drawing from ${drawing.artist}`);
      setGame({ ...game, drawings: [...game.drawings, drawing] });
    });

    return { game, setGame, sendDrawing, player, setWord, word };
  }
);

export { GameProvider, useGame };
