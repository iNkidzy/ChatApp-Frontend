import {ChatClient} from './chat-client.module';
import {ChatMessage} from './chat-message.model';

export interface WelcomeDto {
  clients: ChatClient[];
  client: ChatClient;
  messages: ChatMessage[];
 }
