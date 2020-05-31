export enum GameState {
  WaitingRoom,
  PickingWord,
  Live,
  Results,
  Done,
}

export interface Drawing {
  startWord: string;
  drawer: Player;
  drawnImage?: string;
}

export interface Guess {
  guesser: Player;
  startImage: string;
  guessedWord?: string;
}

export interface Player {
  id: string;
  name: string;
  word?: string;
}

export interface Book {
  owner: Player;
  startWord: string;
  pages: (Drawing | Guess)[];
}

export interface Game {
  drawings: Drawing[];
  books: Book[];
  gameState: GameState;
}

export interface Space {
  id: string;
  host: Player;
}
