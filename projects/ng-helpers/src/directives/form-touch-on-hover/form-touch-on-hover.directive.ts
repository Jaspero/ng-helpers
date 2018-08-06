import {Directive, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {FormGroup, FormArray} from '@angular/forms';

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
  @Input() jpFormTouchOnHover: FormGroup | FormArray;

  /**
   * Outputs when form finish iterating
   */
  @Output() jpFormTouched = new EventEmitter();

  @HostListener('mouseenter')
  enter() {
    FormTouchOnHoverDirective.markFormGroupTouched(this.jpFormTouchOnHover);
    this.jpFormTouched.emit();
  }
}
