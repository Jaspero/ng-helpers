import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SanitizePipe} from './sanitize.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SanitizePipe
  ],
  exports: [
    SanitizePipe
  ]
})
export class SanitizeModule { }
