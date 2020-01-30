import {Directive, ElementRef, Inject, Input, OnInit, Renderer2} from '@angular/core';
import {Observable} from 'rxjs';
import {finalize, takeUntil} from 'rxjs/operators';
import {RxDestroy} from '../../helpers/rx-destroy';
import {LOAD_CLICK_CLASS} from './load-click-class.const';

/**
 * Directive will add loading class to the host element on click event
 * Usage: [jpLoadClick]="save()"
 * Function save() should return observable
 */

@Directive({selector: '[jpLoadClick]'})
export class LoadClickDirective extends RxDestroy implements OnInit {
  constructor(
    private _el: ElementRef,
    private _renderer: Renderer2,
    @Inject(LOAD_CLICK_CLASS) private _defaultLoadClickClass: string
  ) {
    super();
  }

  @Input()
  jpLoadClick: () => Observable<any>;

  @Input()
  loadClickEventType = 'click';

  @Input()
  loadClickStopPropagation = false;

  @Input()
  loadClickPreventDefault = false;

  @Input()
  loadClickClass: string;

  ngOnInit() {
    this._renderer.listen(
      this._el.nativeElement,
      this.loadClickEventType,
      event => {
        const defaultClass = this.loadClickClass || this._defaultLoadClickClass;

        if (this.loadClickStopPropagation) {
          event.stopPropagation();
        }

        if (this.loadClickPreventDefault) {
          event.preventDefault();
        }

        this._renderer.addClass(this._el.nativeElement, defaultClass);

        this.jpLoadClick()
          .pipe(
            finalize(() =>
              this._renderer.removeClass(this._el.nativeElement, defaultClass)
            ),
            takeUntil(this.destroyed$)
          )
          .subscribe();
      }
    );
  }
}
