import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core'
import {TimePassedPipe} from './time-passed.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TimePassedPipe
  ],
  exports: [
    TimePassedPipe
  ]
})
export class TimePassedModule { }
