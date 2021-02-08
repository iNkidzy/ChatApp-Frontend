import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChatService} from './shared/chat.service';
import {Observable, of, Subject, Subscription} from 'rxjs';
import {FormControl} from '@angular/forms';
import {take, takeUntil} from 'rxjs/operators';
import {ChatClient} from './shared/chat-client.module';
import {ChatMessage} from './shared/chat-message.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  message = new FormControl('');
  nameFC = new FormControl('');
  messages: ChatMessage[] = [];
  clients: ChatClient[] = [];
  unsubscribe$ = new Subject();
  name: ChatMessage | undefined;
  clients$: Observable<ChatClient[]> | undefined;

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.clients$ = this.chatService.listenForClients();
    this.chatService.listenForMessages()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(message => {
        console.log('message:', message);
        this.messages.push(message);
      });
    this.chatService.getAllMessages()
      .pipe(
        take(1)
      )
      .subscribe(messages => {
        console.log('allMessages:', messages);
        this.messages = messages;
      });
   // this.chatService.connect();
  }
  ngOnDestroy(): void {
    console.log('Destroyed');
    this.unsubscribe$.next();
    this.unsubscribe$.complete();

    // this.chatService.disconnect();
  }

  sendMessage(): void {
    console.log(this.message.value);
    this.chatService.sendMessage(this.message.value);
    this.message.reset();
  }

  sendName(): void {
     if (this.nameFC.value) {
    this.name = this.nameFC.value;
    this.chatService.sendName(this.nameFC.value);
    }
  }
}

