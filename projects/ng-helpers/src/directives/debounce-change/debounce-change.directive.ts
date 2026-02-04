import {AfterViewInit, Directive, ElementRef, EventEmitter, Inject, Input, NgZone, OnDestroy, Output} from '@angular/core';
import {fromEvent, Subscription} from 'rxjs';
import {debounceTime, filter} from 'rxjs/operators';
import {DEBOUNCE_TIME} from './debounce-time.const';

@Directive({
  selector: '[jpDebounceChange]',
  standalone: false
})
export class DebounceChangeDirective implements AfterViewInit, OnDestroy {
  constructor(
    private _el: ElementRef,
    private _ngZone: NgZone,
    @Inject(DEBOUNCE_TIME) private _defaultDebounceTime: number
  ) {}

  /**
   * time to forward to the debounceTime pipe
   */
  @Input() debounceTime;

  /**
   * Any valid html event
   */
  @Input() debounceChangeEventType = 'keyup';

  /**
   * If true and the event has a 'target.value'
   * we listen for it and only emit if the value changed
   */
  @Input() emitOnlyOnChange = false;

  /**
   * Emits original event after debounce
   */
  @Output() jpDebounceChange = new EventEmitter<string>();

  subscription: Subscription;

  ngAfterViewInit() {
    this._ngZone.runOutsideAngular(() => {

      let prev = this._el.nativeElement.value;

      this.subscription = fromEvent<any>(this._el.nativeElement, this.debounceChangeEventType)
        .pipe(
          debounceTime(this.debounceTime || this._defaultDebounceTime),
          filter(event => {
            return event.target &&
              event.target.value !== undefined &&
              this.emitOnlyOnChange ?
                event.target.value !== prev :
                true;
          })
        )
        .subscribe(event => {
          this._ngZone.run(() => {
            if (event.target) {
              prev = event.target.value;
            }

            this.jpDebounceChange.emit(event.target.value);
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
