import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChatService} from './shared/chat.service';
import {Observable, of, Subject, Subscription} from 'rxjs';
import {FormControl} from '@angular/forms';
import {debounceTime, take, takeUntil} from 'rxjs/operators';
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
  clientsTyping: ChatClient[] = [];
  clients: ChatClient[] = [];
  unsubscribe$ = new Subject();
  name: ChatMessage | undefined;
  clients$: Observable<ChatClient[]> | undefined;
  error$: Observable<string> | undefined;
  chatClient: ChatClient | undefined;
  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.clients$ = this.chatService.listenForClients();
    this.error$ = this.chatService.listenForErrors();
    this.message.valueChanges
      .pipe(takeUntil(this.unsubscribe$),
        debounceTime(500))
      .subscribe((value) => {
        this.chatService.sendTyping(value.length > 0);
      });
    this.chatService.listenForMessages()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(message => {
        console.log('message:', message);
        this.messages.push(message);
      });
    this.chatService.listenForClientTyping()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((chatClient) => {
        if (chatClient.typing && !this.clientsTyping.find((c) => c.id === chatClient.id)){
          this.clientsTyping.push(chatClient);
        } else {
          this.clientsTyping = this.clientsTyping.filter((c) => c.id !== chatClient.id);
        }
      });
    this.chatService.listenForWelcome()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe( welcome => {
        this.messages = welcome.messages;
        this.chatClient = this.chatService.chatClient = welcome.client;
      });
    if (this.chatService.chatClient) {
      this.chatService.sendName(this.chatService.chatClient.name);
    }
     // this.messageFC.valueChanges
     // .pipe()
     // .subscribe((value) => {
        // if(value.length >0)
        // send event to backend I am typing
    //  });
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
       this.chatService.sendName(this.nameFC.value);
    }
  }
}

