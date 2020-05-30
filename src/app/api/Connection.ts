import io from 'socket.io-client';
import { Book, Drawing, Player } from '../../types/models';
import { Broadcast, BroadcastType, SocketEvent } from '../../types/api';
import Socket = SocketIOClient.Socket;

interface BroadcastFn {
  (payload: Broadcast): void;
}

export class Connection {
  socket: Socket;
  #broadcastCallbacks: Array<BroadcastFn>;

  constructor(path: string) {
    this.#broadcastCallbacks = [];
    this.socket = io(path);
    this.socket.on('connect', () => {
      console.log(`Socket connected with id=${this.socket.id}`);
    });
    this.socket.on('connect_error', (err: any) => {
      console.log('Socket connection failed');
      console.log({ err });
    });
    this.socket.on('connect_timeout', (err: any) => {
      console.log('Socket connection timed out');
      console.log({ err });
    });
    this.socket.on(SocketEvent.BroadcastPayload, (payload: Broadcast) => {
      this.#broadcastCallbacks.forEach((callback) => callback(payload));
    });
  }

  on = (event: SocketEvent, callback: Function) =>
    this.socket.on(event, callback);

  joinGame = (nickname: string) => {
    this.socket.emit(SocketEvent.JoinGame, nickname);
  };

  sendMessage = (message: string, sender: Player) => {
    this.#broadcastPayload({
      type: BroadcastType.ChatMessage,
      sender,
      message,
    });
  };

  sendDrawing = (drawing: Drawing) => {
    this.#broadcastPayload({ type: BroadcastType.Drawing, drawing });
  };
  startGame = () => {
    this.#broadcastPayload({ type: BroadcastType.StartGame });
  };
  sendBook = (book: Book) => {
    this.#broadcastPayload({ type: BroadcastType.Book, book });
  };
  #broadcastPayload = (payload: Broadcast) => {
    this.socket.emit(SocketEvent.BroadcastPayload, payload);
  };
  onBroadcast = (callback: BroadcastFn) => {
    this.#broadcastCallbacks.push(callback);
  };
}
