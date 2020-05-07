import io from 'socket.io-client';
import Socket = SocketIOClient.Socket;
import { SocketEvent } from '../../types/enums';
import { Drawing } from '../../types/models';

export class Connection {
  socket: Socket;

  constructor(path: string) {
    this.socket = io(path);
  }

  static setupConnection(path: string) {
    const connection = new Connection(path);
    connection.socket.on('connect', () => {
      console.log(`Socket connected with id=${connection.socket.id}`);
    });
    connection.socket.on('connect_error', (err: any) => {
      console.log('Socket connection failed');
      console.log({ err });
    });
    connection.socket.on('connect_timeout', (err: any) => {
      console.log('Socket connection timed out');
      console.log({ err });
    });
    return connection;
  }

  on = (event: SocketEvent, callback: Function) =>
    this.socket.on(event, callback);

  sendMessage = (message: string) => {
    this.socket.emit(SocketEvent.ChatMessage, message);
  };

  joinGame = (nickname: string) => {
    this.socket.emit(SocketEvent.JoinGame, nickname);
  };

  sendDrawing = (drawing: Drawing) => {
    this.socket.emit(SocketEvent.Drawing, drawing);
  };
}
