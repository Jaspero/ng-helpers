import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {TrackByFieldModule} from '../../projects/ng-helpers/src/directives/track-by-field/track-by-field.module';
import {AppComponent} from './app.component';
import {OnChangesComponent} from './examples/on-changes/on-changes.component';

@NgModule({
  declarations: [AppComponent, OnChangesComponent],
  imports: [BrowserModule, TrackByFieldModule.defaultKey()],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
