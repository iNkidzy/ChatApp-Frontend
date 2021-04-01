import { Injectable } from '@angular/core';
import {SocketStock} from '../../app.module';
import {CreateStockDto} from './create-stock.dto';
import {StockDto} from './stock.dto';
import {Observable} from 'rxjs';
import {UpdateStockDto} from './update-stock.dto';
import {ChatMessage} from '../../chat/shared/chat-message.model';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private socketStocks: SocketStock) {
  }
  create(stock: CreateStockDto): void {
    this.socketStocks.emit('create-stock', stock);
  }
  getAllStock(): Observable<StockDto[]> {
    return this.socketStocks.fromEvent<StockDto[]>('allStock');
  }
  updateStock(updatedValue: number): void {
    this.socketStocks.emit('updatedValue', updatedValue);
  }
  deleteStock(id: number ): void {
     this.socketStocks.emit('delete', id);
  }
  listenForCreate(): Observable<StockDto> {
    return this.socketStocks.fromEvent<StockDto>('stock-created-success');
  }

  listenForCreateError(): Observable<string> {
    return this.socketStocks.fromEvent<string>('stock-created-error');
  }
  listenForAllStock(): Observable<StockDto[]> {
    return this.socketStocks
      .fromEvent<StockDto[]>('getAllStocks');
  }
}
