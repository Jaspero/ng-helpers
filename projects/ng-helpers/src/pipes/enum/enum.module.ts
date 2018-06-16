import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {EnumPipe} from './enum.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    EnumPipe
  ],
  exports: [
    EnumPipe
  ]
})
export class EnumModule { }
