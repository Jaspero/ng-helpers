import {Directive, ElementRef, Inject, Input, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {LOAD_CLICK_CLASS} from './load-click-class.const';

/**
 * Directive will add loading class to the host element on click event
 * Usage: [jpLoadClick]="save()"
 * Function save() should return observable
 */

@Directive({selector: '[jpLoadClick]', standalone: false})
export class LoadClickDirective implements OnInit, OnDestroy {
  constructor(
    private _el: ElementRef,
    private _renderer: Renderer2,
    @Inject(LOAD_CLICK_CLASS) private _defaultLoadClickClass: string
  ) {}

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

  @Input()
  disableAttribute = true;

  subscription: Subscription;

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

        if (this.disableAttribute) {
          this._renderer.setAttribute(
            this._el.nativeElement,
            'disabled',
            ''
          );
        }

        this.subscription = this.jpLoadClick()
          .pipe(
            finalize(() => {
              this._renderer.removeClass(this._el.nativeElement, defaultClass);

              if (this.disableAttribute) {
                this._renderer.removeAttribute(this._el.nativeElement, 'disabled');
              }
            })
          )
          .subscribe();
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
