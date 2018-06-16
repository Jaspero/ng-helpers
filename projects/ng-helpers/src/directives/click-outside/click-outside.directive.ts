import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  Output
} from '@angular/core';
import {fromEvent} from 'rxjs';
import {filter, takeUntil} from 'rxjs/operators';
import {RxDestroy} from '../../helpers/rx-destroy';

/**
 * Emits an event when a click action occurs that does not target the element
 *
 * @example
 * <div (jpClickOutside)="doSomething()"></div>
 */
@Directive({
  selector: '[jpClickOutside]'
})
export class ClickOutsideDirective extends RxDestroy implements AfterViewInit {
  constructor(private _el: ElementRef, private _ngZone: NgZone) {
    super();
  }

  /**
   * Any valid html event
   * @type {string}
   */
  @Input() clickOutsideEventType = 'click';

  /**
   * if true jpClickOutside doesn't emit
   * @type {boolean}
   */
  @Input() clickOutsideBlock = false;

  /**
   * Emits when triggered event doesn't contain this e
   * @type {EventEmitter<MouseEvent>}
   */
  @Output() jpClickOutside = new EventEmitter<MouseEvent>();

  ngAfterViewInit() {
    this._ngZone.runOutsideAngular(() => {
      fromEvent<MouseEvent>(window, this.clickOutsideEventType)
        .pipe(
          takeUntil(this.destroyed$),
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
