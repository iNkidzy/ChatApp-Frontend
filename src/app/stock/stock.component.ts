import { Component, OnInit } from '@angular/core';
import {StockService} from './shared/stock.service';
import {StockDto} from './shared/stock.dto';
import {Subject} from 'rxjs';
import {UpdateStockDto} from './shared/update-stock.dto';
import {take, takeUntil} from 'rxjs/operators';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})

export class StockComponent implements OnInit {
  stockFC = new FormControl('');
  public stockD: StockDto | undefined;
  allStocks: StockDto[] = [];
  unsubscribe$ = new Subject();
  selected = '';
  stockUpdate: UpdateStockDto | undefined;
  constructor(private stockService: StockService) {
  }

  ngOnInit(): void {
   /* this.stockService.listenForAllStock()
      .subscribe(() =>
        this.stockService.getAllStock()); */

        this.stockService.getAllStock()
          .subscribe(stocks => {
            console.log('asd');
            this.allStocks = stocks;
      });
    // this.stockService.getAllStock()
    //   .subscribe((result) =>
    //   this.allStocks = result);
  }

  update(): void {
    const stockUpdate: UpdateStockDto = this.stockFC.value;
    this.stockService.updateStock(stockUpdate.updatedValue);
  }

  deleteStock(): void {
    this.stockService.deleteStock(this.stockFC.value);
    this.stockFC.patchValue(this.stockUpdate?.updatedValue);
  }

  /*onSelection(o: { option: { value: string; }; }, t: any): any {
    console.log(this.selected = o.option.value);
    this.selected = o.option.value;
     } */
}
