import { Component, OnInit } from '@angular/core';
import {ChatService} from './shared/chat.service';
import {Observable, of, Subscription} from 'rxjs';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  message = new FormControl('');
  nameFC = new FormControl('');
  messages: string[] = [];
  clients: string[] = [];
  sub: Subscription | undefined;
  sub2: Subscription | undefined;
  name: string | undefined;

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.sub = this.chatService.listenForMessages()
      .subscribe(message => {
        this.messages.push(message);
      });
    this.sub2 = this.chatService.listenForClients()
      .subscribe(clients => {
        this.clients = clients;
      });
  }
  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
  }

  sendMessage(): void {
    this.chatService.sendMessage(this.message.value);
  }

  sendName(): void {
    this.name = this.nameFC.value;
    if (this.name){
      this.chatService.sendName(this.name);
    }
  }
}

