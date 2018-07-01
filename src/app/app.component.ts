import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  test = Array.from(Array(20).keys()).map(i => ({id: i, label: 'bla' + i}));
}
