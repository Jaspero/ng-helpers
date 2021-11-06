import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {DropZoneDirective} from './drop-zone.directive';

@NgModule({
  declarations: [DropZoneDirective],
  exports: [DropZoneDirective],
  imports: [CommonModule]
})
export class DropZoneModule { }
