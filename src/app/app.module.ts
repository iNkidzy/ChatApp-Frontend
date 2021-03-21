import {Injectable, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {Socket, SocketIoConfig, SocketIoModule} from 'ngx-socket-io';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from './shared/shared.module';
import {MatSliderModule} from '@angular/material/slider';
// const config: SocketIoConfig = { url: 'http://localhost:3600', options: {} };

@Injectable()
export class SocketChat extends Socket {

  constructor() {
    super({ url: 'http://localhost:3600', options: {} });
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
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [SocketChat],
  bootstrap: [AppComponent]
})
export class AppModule { }
