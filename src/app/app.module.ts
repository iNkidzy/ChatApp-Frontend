import {Injectable, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {Socket, SocketIoConfig, SocketIoModule} from 'ngx-socket-io';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxsModule} from '@ngxs/store';
import {environment} from '../environments/environment';
import {ChatState} from './chat/state/chat.state';

@Injectable()
 export class SocketChat extends Socket {
  constructor() {
    super({url: 'http://localhost:3600', options: {} });
  }
}
@Injectable()
export class SocketStock extends Socket {
  constructor() {
    super({url: 'http://localhost:3500', options: {} });
  }
}
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule,
    NgbModule,
    NgxsModule.forRoot([ChatState], {
      developmentMode: !environment.production
    })
  ],
  providers: [SocketChat, SocketStock],
  bootstrap: [AppComponent]
})
export class AppModule { }
