import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {DebounceChangeDirective} from './debounce-change.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DebounceChangeDirective
  ],
  exports: [
    DebounceChangeDirective
  ]
})
export class DebounceChangeModule { }
