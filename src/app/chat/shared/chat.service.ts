import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Socket} from 'ngx-socket-io';



@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private socket: Socket) {}
  listenForMessages(): Observable<string> {
    return this.socket
      .fromEvent<string>('newMessage');
  }

  listenForClients(): Observable<string[]> {
    return this.socket
      .fromEvent<string[]>('clients');
  }
  getAllMessages(): Observable<string[]> {
    return this.socket
      .fromEvent<string[]>('allMessages');
  }
  sendMessage(msg: string): void {
    this.socket.emit('message', msg);
  }
  sendName(name: string): void {
    this.socket.emit('name', name);
  }
  disconnect(): void {
    this.socket.disconnect();
  }
  connect(): void {
    this.socket.connect();
  }
}
