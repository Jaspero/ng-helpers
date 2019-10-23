import {
  Directive,
  Output,
  EventEmitter,
  Renderer2,
  ElementRef,
  OnDestroy,
  OnInit,
  Input
} from '@angular/core';

/**
 * Used for preventing propagation on event calls event.stopPropagation())
 *
 * @example
 * <div (jpStopPropagation)="doSomething()"></div>
 */
@Directive({
  selector: '[jpStopPropagation]'
})
export class StopPropagationDirective implements OnInit, OnDestroy {
  constructor(private _renderer: Renderer2, private _el: ElementRef) {}

  /**
   * Any valid html event
   */
  @Input() stopPropagationEventType = 'click';

  /**
   * Should preventDefault also be called
   */
  @Input() preventDefault = false;

  @Input() condition: boolean | (() => boolean);

  /**
   * Outputs the input event
   */
  @Output() jpStopPropagation = new EventEmitter();

  private _eventListener: any;

  ngOnInit() {
    this._eventListener = this._renderer.listen(
      this._el.nativeElement,
      this.stopPropagationEventType,
      event => {
        if (this.preventDefault) {
          event.preventDefault();
        }

        if (this.condition !== undefined) {
          if (typeof this.condition === 'boolean') {
            if (this.condition) {
              this.sp(event);
            }
          } else if (this.condition()) {
            this.sp(event);
          }
        } else {
          this.sp(event);
        }
      }
    );
  }

  ngOnDestroy() {
    try {
      this._eventListener.unsubscribe();
    } catch (e) {}
  }

  private sp(event) {
    event.stopPropagation();
    this.jpStopPropagation.emit(event);
  }
}
