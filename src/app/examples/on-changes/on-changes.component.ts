import {Component, Input} from '@angular/core';
import {OnChange} from '@jaspero/ng-helpers';

@Component({
  selector: 'jp-on-changes',
  templateUrl: './on-changes.component.html',
  styleUrls: ['./on-changes.component.scss']
})
export class OnChangesComponent {
  @OnChange<number>(function(value, simpleChange) {
    console.log(value, simpleChange);
  })
  @Input()
  value: number;
}
