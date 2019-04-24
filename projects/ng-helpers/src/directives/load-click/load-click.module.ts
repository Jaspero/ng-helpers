import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {LoadClickDirective} from './load-click.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LoadClickDirective
  ],
  exports: [
    LoadClickDirective
  ]
})
export class LoadClickModule { }
