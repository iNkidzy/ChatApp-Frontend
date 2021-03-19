import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatInputModule} from '@angular/material/input';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatInputModule,
    FlexLayoutModule
  ],
  exports: [
    FlexLayoutModule
  ]
})
export class SharedModule { }
