import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  Output
} from '@angular/core';
import {FormGroup, FormArray, FormControl} from '@angular/forms';

type entry = FormControl | FormGroup | FormArray;

@Directive({
  selector: '[jpFormTouchOnHover]'
})
export class FormTouchOnHoverDirective {
  @Input() jpFormTouchOnHover: entry | Array<entry>;

  @Output() jpFormTouched = new EventEmitter();

  @HostListener('mouseenter')
  enter() {
    if (Array.isArray(this.jpFormTouchOnHover)) {
      this.jpFormTouchOnHover.forEach(form => form.markAllAsTouched());
    } else {
      this.jpFormTouchOnHover.markAllAsTouched();
    }

    this.jpFormTouched.emit();
  }
}
