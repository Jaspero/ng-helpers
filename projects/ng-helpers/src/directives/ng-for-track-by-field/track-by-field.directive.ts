import {NgForOf} from '@angular/common';
import {Directive, Host, Inject, Input} from '@angular/core';

@Directive({
  selector: '[jpTrackByField]',
})
export class TrackByFieldDirective<T> {

  @Input()
  public jpTrackByField: keyof T;

  constructor(
    @Host() private ngFor: NgForOf<T>,
    @Inject('defaultKey') private defaultKey: string
  ) {
    const valueToUse = this.jpTrackByField || this.defaultKey;
    this.ngFor.ngForTrackBy = (index: number, item: T) => item[valueToUse];
  }

}
