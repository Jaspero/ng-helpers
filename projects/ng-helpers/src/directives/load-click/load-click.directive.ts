import {Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';
import {Observable} from 'rxjs';
import {finalize, takeUntil} from 'rxjs/operators';
import {RxDestroy} from '../../helpers/rx-destroy';

/**
 * Directive will add loading class to the host element when click event is triggered
 * Usage: [loadClick]="save()"
 * Function save() should return observable
 */

@Directive({selector: '[jpLoadClick]'})
export class LoadClickDirective extends RxDestroy {
  constructor(
    private _el: ElementRef,
    private _renderer: Renderer2
  ) {
    super();
  }

  @Input()
  loadClick: Observable<any>;

  @Input()
  loadClickStopPropagation = false;

  @HostListener('click', ['$event'])
  click(event) {
    if (this.loadClickStopPropagation) {
      event.stopPropagation();
    }

    this._renderer.addClass(this._el.nativeElement, 'loading');

    this.loadClick
      .pipe(
        finalize(() => this._renderer.removeClass(this._el.nativeElement, 'loading')),
        takeUntil(this.destroyed$)
      )
      .subscribe();
  }
}
