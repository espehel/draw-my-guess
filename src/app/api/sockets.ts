import io from 'socket.io-client';
import Socket = SocketIOClient.Socket;
import { SocketEvent } from '../../types/enums';

interface Callbacks {
  setMessages: React.Dispatch<React.SetStateAction<string[]>>;
}

export class Connection {
  socket: Socket;

  constructor(callbacks: Callbacks) {
    this.socket = io();
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
    this.socket.on(SocketEvent.Welcome, (message: string) => {
      console.log(`${SocketEvent.Welcome}: ${message}`);
      callbacks.setMessages((messages) => [...messages, message]);
    });
    this.socket.on(SocketEvent.NewPlayer, (message: string) => {
      console.log(`${SocketEvent.NewPlayer}: ${message}`);
      callbacks.setMessages((messages) => [...messages, message]);
    });
    this.socket.on(SocketEvent.ChatMessage, (message: string) => {
      console.log(`${SocketEvent.ChatMessage}: ${message}`);
      callbacks.setMessages((messages) => [...messages, message]);
    });
  }

  static setupConnection(callbacks: Callbacks) {
    return new Connection(callbacks);
  }

  sendMessage = (message: string) => {
    console.log('Sending message');
    console.log(this);
    this.socket.emit(SocketEvent.ChatMessage, message);
  };
}
