import {CommonModule} from '@angular/common';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {LoadClickDirective} from './load-click.directive';
import {LOAD_CLICK_CLASS} from './load-click-class.const';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LoadClickDirective
  ],
  exports: [
    LoadClickDirective
  ],
  providers: [
    {
      provide: LOAD_CLICK_CLASS,
      useValue: 'loading'
    }
  ]
})
export class LoadClickModule {
  static defaultLoadingClass(value: string): ModuleWithProviders<LoadClickModule> {
    return {
      ngModule: LoadClickModule,
      providers: [
        {
          provide: LOAD_CLICK_CLASS,
          useValue: value
        }
      ]
    };
  }
}
