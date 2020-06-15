export enum GameState {
  PickingWord,
  Live,
  Results,
  Done,
}

export type Page = Drawing | Guess;

export interface Drawing {
  actor: Player;
  startWord: string;
  drawnImage?: string;
}

export interface Guess {
  actor: Player;
  startImage: string;
  guessedWord?: string;
}

export interface Player {
  id: string;
  name: string;
}

export interface Book {
  owner: Player;
  startWord: string;
  pages: Array<Page>;
}

export interface Book {
  owner: Player;
  startWord: string;
  pages: Array<Page>;
}

export interface Game {
  drawings: Array<Drawing>;
  books: Array<Book>;
  state: GameState;
  round: number;
}

export interface Space {
  id: string;
  host: Player;
}
