export interface Drawing {
  id: string;
  word: string;
  artist: string;
  guesser?: string;
  canvas: string;
}

export interface Player {
  id: string;
  name: string;
  word?: string;
}

export interface Game {
  players: Player[];
  drawings: Drawing[];
}

export interface Space {
  id: string;
  host: Player;
}
