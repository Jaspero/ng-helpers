import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgForTrackByFieldDirective } from '../../projects/ng-helpers/src/directives/ng-for-track-by-field/ng-for-track-by-field.directive';

@NgModule({
  declarations: [
    AppComponent,
    NgForTrackByFieldDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
