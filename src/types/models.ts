import { Page } from "./type-guards";

export interface Drawing {
  startWord: string;
  drawer: Player;
  drawnImage: string;
}

export interface Guess {
  guesser: Player;
  startImage: string;
  guessedWord: string;
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

export interface Game {
  players: Player[];
  drawings: Drawing[];
  books: Book[];
}

export interface Space {
  id: string;
  host: Player;
}
