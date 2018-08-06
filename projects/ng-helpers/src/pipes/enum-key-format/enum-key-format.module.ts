import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EnumKeyFormatPipe} from './enum-key-format.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    EnumKeyFormatPipe
  ],
  exports: [
    EnumKeyFormatPipe
  ]
})
export class EnumKeyFormatModule { }
