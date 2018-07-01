import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {TrackByFieldModule} from '../../projects/ng-helpers/src/directives/track-by-field/track-by-field.module';
import {AppComponent} from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    TrackByFieldModule.defaultKey()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
