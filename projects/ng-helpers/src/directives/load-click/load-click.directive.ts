import {
  Directive,
  ElementRef,
  HostListener, Inject,
  Input,
  Renderer2
} from '@angular/core';
import {Observable} from 'rxjs';
import {finalize, takeUntil} from 'rxjs/operators';
import {RxDestroy} from '../../helpers/rx-destroy';
import {LOAD_CLICK_CLASS} from './load-click.const';

/**
 * Directive will add loading class to the host element on click event
 * Usage: [jpLoadClick]="save()"
 * Function save() should return observable
 */

@Directive({selector: '[jpLoadClick]'})
export class LoadClickDirective extends RxDestroy {
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
  loadClickStopPropagation = false;

  @Input()
  loadClickClass: string;

  @HostListener('click', ['$event'])
  click(event) {
    const defaultClass = this.loadClickClass || this._defaultLoadClickClass;

    if (this.loadClickStopPropagation) {
      event.stopPropagation();
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
}
