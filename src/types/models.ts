export enum GameState {
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

export type Page = Drawing | Guess;

export interface Book {
  owner: Player;
  startWord: string;
  pages: Array<Page>;
}

export interface Game {
  drawings: Array<Drawing>;
  books: Array<Book>;
  state: GameState;
}

export interface Space {
  id: string;
  host: Player;
}
