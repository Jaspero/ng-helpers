import {AfterViewInit, Directive, ElementRef, EventEmitter, Input, NgZone, Output} from '@angular/core';
import {fromEvent} from 'rxjs';
import {filter} from 'rxjs/operators';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

/**
 * Emits an event when a click action occurs that does not target the element
 *
 * @example
 * <div (jpClickOutside)="doSomething()"></div>
 */
@UntilDestroy()
@Directive({
  selector: '[jpClickOutside]'
})
export class ClickOutsideDirective implements AfterViewInit {
  constructor(private _el: ElementRef, private _ngZone: NgZone) {}

  /**
   * Any valid html event
   */
  @Input() clickOutsideEventType = 'click';

  /**
   * if true jpClickOutside doesn't emit
   */
  @Input() clickOutsideBlock = false;

  /**
   * Emits when triggered event doesn't contain this e
   */
  @Output() jpClickOutside = new EventEmitter<MouseEvent>();

  ngAfterViewInit() {
    this._ngZone.runOutsideAngular(() => {
      fromEvent<MouseEvent>(window, this.clickOutsideEventType)
        .pipe(
          untilDestroyed(this),
          filter(
            event =>
              !this.clickOutsideBlock &&
              !this._el.nativeElement.contains(event.target)
          )
        )
        .subscribe(event => {
          this._ngZone.run(() => {
            this.jpClickOutside.emit(event);
          });
        });
    });
  }
}
