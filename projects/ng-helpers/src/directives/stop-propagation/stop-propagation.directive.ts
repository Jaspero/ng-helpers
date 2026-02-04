import {Directive, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2} from '@angular/core';

/**
 * Used for preventing propagation on event calls event.stopPropagation())
 *
 * @example
 * <div (jpStopPropagation)="doSomething()"></div>
 */
@Directive({
  selector: '[jpStopPropagation]',
  standalone: false
})
export class StopPropagationDirective implements OnInit {
  constructor(private _renderer: Renderer2, private _el: ElementRef) {}

  /**
   * Any valid html event
   */
  @Input() stopPropagationEventType = 'click';

  /**
   * Should preventDefault also be called
   */
  @Input() preventDefault = false;

  @Input() condition: boolean | ((event: MouseEvent) => boolean);

  /**
   * Outputs the input event
   */
  @Output() jpStopPropagation = new EventEmitter();

  ngOnInit() {
    this._renderer.listen(
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
          } else if (this.condition(event)) {
            this.sp(event);
          }
        } else {
          this.sp(event);
        }
      }
    );
  }

  private sp(event) {
    event.stopPropagation();
    this.jpStopPropagation.emit(event);
  }
}
