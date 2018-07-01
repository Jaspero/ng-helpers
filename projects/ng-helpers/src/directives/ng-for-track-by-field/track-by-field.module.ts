import {CommonModule} from '@angular/common';
import {InjectionToken, ModuleWithProviders, NgModule} from '@angular/core';
import {TrackByFieldDirective} from './track-by-field.directive';

export const DEFAULT_KEY = new InjectionToken<string>('defaultKey');

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TrackByFieldDirective
  ],
  exports: [
    TrackByFieldDirective
  ]
})
export class TrackByFieldModule {
  static defaultKey(value: string): ModuleWithProviders {
    return {
      ngModule: TrackByFieldModule,
      providers: [
        {
          provide: DEFAULT_KEY,
          useValue: value || 'id'
        }
      ]
    };
  }
}
