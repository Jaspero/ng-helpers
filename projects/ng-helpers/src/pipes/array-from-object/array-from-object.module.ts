import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ArrayFromObjectPipe} from './array-from-object.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ArrayFromObjectPipe
  ],
  exports: [
    ArrayFromObjectPipe
  ]
})
export class ArrayFromObjectModule {}
