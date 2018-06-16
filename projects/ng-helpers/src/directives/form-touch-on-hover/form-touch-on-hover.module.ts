import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormTouchOnHoverDirective} from './form-touch-on-hover.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FormTouchOnHoverDirective
  ],
  exports: [
    FormTouchOnHoverDirective
  ]
})
export class FormTouchOnHoverModule { }
