import {Directive, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {FormGroup, FormArray} from '@angular/forms';

type entry = FormGroup | FormArray;

@Directive({
  selector: '[jpFormTouchOnHover]'
})
export class FormTouchOnHoverDirective {

  static markFormGroupTouched(formGroup: (FormGroup | FormArray)) {
    (Object as any).values(formGroup.controls)
      .forEach(control => {
        control.markAsTouched();

        if (control && control.controls) {
          if (Array.isArray(control.controls)) {
            control.controls.forEach(c => FormTouchOnHoverDirective.markFormGroupTouched(c));
          } else {
            for (const key in control.controls) {
              if (control.controls.hasOwnProperty(key)) {
                control.controls[key].markAsTouched();
              }
            }
          }
        }
      });
  }

  /**
   * Entry FormGroup which to iterate over
   */
  @Input() jpFormTouchOnHover: entry | Array<entry>;

  /**
   * Outputs when form finish iterating
   */
  @Output() jpFormTouched = new EventEmitter();

  @HostListener('mouseenter')
  enter() {
    if (Array.isArray(this.jpFormTouchOnHover)) {
      this.jpFormTouchOnHover.forEach(form => FormTouchOnHoverDirective.markFormGroupTouched(form))
    } else {
      FormTouchOnHoverDirective.markFormGroupTouched(this.jpFormTouchOnHover);
    }

    this.jpFormTouched.emit();
  }
}
