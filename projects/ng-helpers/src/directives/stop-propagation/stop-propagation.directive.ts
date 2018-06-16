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
   * @type {string}
   */
  @Input() stopPropagationEventType = 'click';

  /**
   * Should preventDefault also be called
   * @type {boolean}
   */
  @Input() preventDefault = false;

  /**
   * Outputs the input event
   * @type {EventEmitter<any>}
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

        event.stopPropagation();
        this.jpStopPropagation.emit(event);
      }
    );
  }

  ngOnDestroy() {
    try {
      this._eventListener.unsubscribe();
    } catch (e) {}
  }
}
