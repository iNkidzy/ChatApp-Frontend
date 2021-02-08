import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChatService} from './shared/chat.service';
import {Observable, of, Subject, Subscription} from 'rxjs';
import {FormControl} from '@angular/forms';
import {take, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  message = new FormControl('');
  nameFC = new FormControl('');
  messages: string[] = [];
  clients: string[] = [];
  unsubscribe$ = new Subject();
  /* sub2: Subscription | undefined; */
  name: string | undefined;
  clients$: Observable<string[]> | undefined;

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
    this.chatService.listenForClients()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(clients => {
        console.log('user:', clients);
        this.clients = clients;
      });
    this.chatService.getAllMessages()
      .pipe(
        take(1)
      )
      .subscribe(messages => {
        console.log('allMessages:', messages);
        this.messages = messages;
      });
    this.chatService.connect();
  }
  ngOnDestroy(): void {
    console.log('Destroyed');
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    /*if (this.sub) {
      this.sub.unsubscribe();
    }
    if (this.sub2){
      this.sub2.unsubscribe();
    } */
    this.chatService.connect();
  }

  sendMessage(): void {
    this.chatService.sendMessage(this.message.value);
  }

  sendName(): void {
     if (this.nameFC.value) {
    this.name = this.nameFC.value;
    this.chatService.sendName(this.nameFC.value);
    }
  }
}

