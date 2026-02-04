import {Pipe, PipeTransform} from '@angular/core';

/**
 * Returns an array of {key: number, value: string} objects.
 * Most useful in *ngFor iterations
 *
 * @example
 * <div *ngFor="let item of someEnum | enum></div>
 *
 */
@Pipe({
  name: 'jpEnum',
  standalone: false
})
export class EnumPipe implements PipeTransform {
  public transform(value): Array<{key: number; value: string}> {
    const keys = [];
    for (const enumMember in value) {
      if (value[enumMember]) {
        const val = parseInt(enumMember, 10);
        if (!isNaN(val)) {
          keys.push({key: val, value: value[enumMember]});
        }
      }
    }
    return keys;
  }
}
