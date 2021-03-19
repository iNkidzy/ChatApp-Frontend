import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [],
  imports: [
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  exports: [
    FlexLayoutModule
  ]
})
export class SharedModule { }
