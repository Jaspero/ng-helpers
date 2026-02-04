import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  Output
} from '@angular/core';
import {UntypedFormGroup, UntypedFormArray, UntypedFormControl} from '@angular/forms';

type entry = UntypedFormControl | UntypedFormGroup | UntypedFormArray;

@Directive({
  selector: '[jpFormTouchOnHover]',
  standalone: false
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
