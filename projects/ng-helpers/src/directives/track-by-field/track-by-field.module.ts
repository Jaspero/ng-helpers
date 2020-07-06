import {CommonModule} from '@angular/common';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {TrackByFieldDirective} from './track-by-field.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TrackByFieldDirective
  ],
  exports: [
    TrackByFieldDirective
  ],
})
export class TrackByFieldModule {
  static defaultKey(value = 'id'): ModuleWithProviders<TrackByFieldModule> {
    return {
      ngModule: TrackByFieldModule,
      providers: [
        {
          provide: 'defaultKey',
          useValue: value
        }
      ]
    };
  }
}
