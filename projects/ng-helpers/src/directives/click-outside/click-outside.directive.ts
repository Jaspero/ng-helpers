import {AfterViewInit, Directive, ElementRef, EventEmitter, Input, NgZone, OnDestroy, Output} from '@angular/core';
import {fromEvent, Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';

/**
 * Emits an event when a click action occurs that does not target the element
 *
 * @example
 * <div (jpClickOutside)="doSomething()"></div>
 */
@Directive({
  selector: '[jpClickOutside]',
  standalone: false
})
export class ClickOutsideDirective implements AfterViewInit, OnDestroy {
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

  subscription: Subscription;

  ngAfterViewInit() {
    this._ngZone.runOutsideAngular(() => {
      this.subscription = fromEvent<MouseEvent>(window, this.clickOutsideEventType)
        .pipe(
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

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
