import {OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';

/**
 * Uses the destroyed$ subject to indicate that the component was destroyed
 *
 * @example
 * class SomeComponent extends RxDestroy {
 *		 	ngOnInit() {
 *			 	interval(1000)
 *			 	  .pipe(
 *			 	    takeUntil(this.destroyed$)
 *			 	  )
 *			 		.subscribe(_ => {});
 *			 }
 * }
 */
export class RxDestroy implements OnDestroy {
  /**
   * Used like this in classes that extend RxDestroy: someObservable$.takeUntil(this.destroyed$)
   */
  destroyed$ = new Subject<void>();

  /**
   * Calls next() on this.destroyed$ to cancel all listeners
   */
  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
