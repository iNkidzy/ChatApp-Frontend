import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {ChatClient} from '../shared/chat-client.module';
import {GetClients} from './chat.actions';

export interface ChatStateModel {
  chatClients: ChatClient[];
  chatClient: ChatClient;
}
@State<any>({
  name: 'chat',
  defaults: {
    chatClients: [],
    chatClient: {id: '2', name: 'nadia'},
  }

})
@Injectable()
export class ChatState {
  @Selector()
    static clients(state: ChatStateModel): ChatClient[]{
    return state.chatClients;
  }
  @Action(GetClients)
  getClients(ctx: StateContext<ChatStateModel>): void {
    const state = ctx.getState();
    const newState: ChatStateModel = {
        ...state,
        chatClients: [{id: '2', name: 'kiki'}]
      };
    ctx.setState(newState);
    }
}
