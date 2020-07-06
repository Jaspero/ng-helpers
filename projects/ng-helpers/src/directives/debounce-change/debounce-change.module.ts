import {CommonModule} from '@angular/common';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {DebounceChangeDirective} from './debounce-change.directive';
import {DEBOUNCE_TIME} from './debounce-time.const';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DebounceChangeDirective
  ],
  exports: [
    DebounceChangeDirective
  ],
  providers: [
    {
      provide: DEBOUNCE_TIME,
      useValue: 500
    }
  ]
})
export class DebounceChangeModule {
  static defaultDebounceTime(value: number): ModuleWithProviders<DebounceChangeModule> {
    return {
      ngModule: DebounceChangeModule,
      providers: [
        {
          provide: DEBOUNCE_TIME,
          useValue: value
        }
      ]
    };
  }
}
