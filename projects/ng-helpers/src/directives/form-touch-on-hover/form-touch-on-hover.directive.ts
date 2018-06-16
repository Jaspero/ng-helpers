import {Directive, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Directive({
  selector: '[jpFormTouchOnHover]'
})
export class TouchFormOnHoverDirective {

  /**
   * Entry FormGroup which to iterate over
   */
  @Input() jpFormTouchOnHover: FormGroup;

  /**
   * Outputs when form finish iterating
   * @type {EventEmitter<any>}
   */
  @Output() jpFormTouched = new EventEmitter();

  @HostListener('mouseenter')
  enter() {
    this._markFormGroupTouched(this.jpFormTouchOnHover);
  }

  private _markFormGroupTouched(formGroup: FormGroup) {
    (Object.values(formGroup.controls) as any[])
      .forEach(control => {
        control.markAsTouched();

        if (control && control.controls) {
          if (Array.isArray(control.controls)) {
            control.controls.forEach(c => this._markFormGroupTouched(c));
          } else {
            for (const key in control.controls) {
              if (control.controls.hasOwnProperty(key)) {
                control.controls[key].markAsTouched();
              }
            }
          }
        }
      });

    this.jpFormTouched.emit(1);
  }
}
