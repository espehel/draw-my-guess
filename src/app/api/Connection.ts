import io from 'socket.io-client';
import Socket = SocketIOClient.Socket;
import { SocketEvent } from '../../types/enums';

export class Connection {
  socket: Socket;

  constructor(path: string) {
    this.socket = io(path);
  }

  static setupConnection(path: string) {
    return new Promise<Connection>((resolve, reject) => {
      const connection = new Connection(path);
      connection.socket.on('connect', () => {
        console.log(`Socket connected with id=${connection.socket.id}`);
        resolve(connection);
      });
      connection.socket.on('connect_error', (err: any) => {
        console.log('Socket connection failed');
        console.log({ err });
        reject(err);
      });
      connection.socket.on('connect_timeout', (err: any) => {
        console.log('Socket connection timed out');
        console.log({ err });
        reject(err);
      });
    });
  }

  on = (event: SocketEvent, callback: Function) =>
    this.socket.on(event, callback);

  sendMessage = (message: string) => {
    console.log('Sending message');
    console.log(this);
    this.socket.emit(SocketEvent.ChatMessage, message);
  };
}
