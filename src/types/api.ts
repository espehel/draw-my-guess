import { Book, Drawing, Player } from './models';

export interface CreateSpaceRequest {
  hostId: string;
  hostName: string;
}

export enum SocketEvent {
  Welcome = 'Welcome',
  JoinGame = 'JoinGame',
  NewPlayer = 'NewPlayer',
  BroadcastPayload = 'BroadcastPayload',
}

export enum BroadcastType {
  ChatMessage,
  Drawing,
  StartGame,
  Book,
  StartRound,
}

export interface BroadcastChatMessage {
  type: BroadcastType.ChatMessage;
  sender: Player;
  message: string;
}

export interface BroadcastDrawing {
  type: BroadcastType.Drawing;
  drawing: Drawing;
}

export interface BroadcastStartGame {
  type: BroadcastType.StartGame;
}

export interface BroadcastBook {
  type: BroadcastType.Book;
  book: Book;
}

export interface BroadcastStartRound {
  type: BroadcastType.StartRound;
  books: Array<Book>;
  round: number;
}

export type Broadcast =
  | BroadcastChatMessage
  | BroadcastDrawing
  | BroadcastStartGame
  | BroadcastBook
  | BroadcastStartRound;
