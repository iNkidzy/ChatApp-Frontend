import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Socket} from 'ngx-socket-io';
import {ChatMessage} from './chat-message.model';
import {ChatClient} from './chat-client.module';



@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private socket: Socket) {}
  listenForMessages(): Observable<ChatMessage> {
    return this.socket
      .fromEvent<ChatMessage>('newMessage');
  }

  listenForClients(): Observable<ChatClient[]> {
    return this.socket
      .fromEvent<ChatClient[]>('clients');
  }
  getAllMessages(): Observable<ChatMessage[]> {
    return this.socket
      .fromEvent<ChatMessage[]>('allMessages');
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
