import {NgForOf} from '@angular/common';
import {Directive, Host, Inject, Input, Optional} from '@angular/core';

@Directive({
  // tslint:disable-next-line
  selector: '[ngForJpTrackByField]',
})
export class TrackByFieldDirective<T> {

  @Input()
  public ngForJpTrackByField: keyof T;

  constructor(
    @Host() private ngFor: NgForOf<T>,
    @Inject('defaultKey') private defaultKey: any
  ) {
    this.ngFor.ngForTrackBy = (index: number, item: T) => item[this.ngForJpTrackByField || this.defaultKey];
  }

}
