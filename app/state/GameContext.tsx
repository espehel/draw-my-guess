import React from 'react';
import createUseContext from 'constate';
import { IGame } from '../models/game';
import { IPlayer } from '../models/player';
import CanvasDraw from 'react-canvas-draw';
import { getStorageKey } from '../utils/draw';
import { IDrawing } from '../models/drawing';

const initialState: IGame = {
    players: [
        { id: '1', name: 'Myau', word: 'cat' },
        { id: '2', name: 'Espen', word: 'dog' }],
    drawings: []
}

const [GameProvider, useGame] = createUseContext(() => {
    const [game, setGame] = React.useState<IGame>(initialState);

    const setDrawing = (player: IPlayer, word: string, canvas: CanvasDraw) => {
        let drawings: IDrawing[] = game.drawings;
        const storageKey = getStorageKey(player.id, player.name, word);
        localStorage.setItem(
            storageKey,
            canvas.getSaveData()
        );
        drawings.push({
            id: `${player.id}-${word}`,
            word: word,
            artist: player.name,
            canvas: canvas.getSaveData()
        })
        setGame({ ...game, drawings: drawings })
    }

    return { game, setGame }
})

export { GameProvider, useGame }
