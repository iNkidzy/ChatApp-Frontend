import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Socket} from 'ngx-socket-io';
import {ChatMessage} from './chat-message.model';
import {ChatClient} from './chat-client.module';
import {WelcomeDto} from './welcome.dto';
import {map, tap} from 'rxjs/operators';
import {SocketChat} from '../../app.module';



@Injectable({
  providedIn: 'root'
})
export class ChatService {
  chatClient: ChatClient | undefined;

  constructor(private socket: SocketChat) {}
  listenForMessages(): Observable<ChatMessage> {
    return this.socket
      .fromEvent<ChatMessage>('newMessage');
  }

  listenForClients(): Observable<ChatClient[]> {
    return this.socket
      .fromEvent<ChatClient[]>('clients');
  }
  listenForWelcome(): Observable<WelcomeDto> {
    return this.socket
      .fromEvent<WelcomeDto>('welcome');
  }
  listenForClientTyping(): Observable<ChatClient> {
    return this.socket
      .fromEvent<ChatClient>('clientTyping');
  }
  listenForErrors(): Observable<string> {
    return this.socket
      .fromEvent<string>('error');
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
  listenForDisconnect(): Observable<string> {
    return this.socket
      .fromEvent<string>('disconnect').pipe(
        map( () => {
          return this.socket.ioSocket.id;
        })
      );
  }
  connect(): void {
    this.socket.connect();
  }
  listenForConnect(): Observable<string> {
    return this.socket
      .fromEvent<string>('connect')
      .pipe(
        tap( (value) => {
          return this.socket.ioSocket.id;
        })
      );
  }

  sendTyping(typing: boolean): void {
    this.socket.emit('typing', typing);
  }
}
