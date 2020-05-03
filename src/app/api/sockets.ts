import io from 'socket.io-client';
import Socket = SocketIOClient.Socket;
import { SocketEvent } from '../../types/enums';

export class Connection {
  socket: Socket;

  constructor(path: string) {
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
  }

  static setupConnection(path: string) {
    return new Connection(path);
  }

  on = (event: SocketEvent, callback: Function) =>
    this.socket.on(event, callback);

  sendMessage = (message: string) => {
    console.log('Sending message');
    console.log(this);
    this.socket.emit(SocketEvent.ChatMessage, message);
  };
}
