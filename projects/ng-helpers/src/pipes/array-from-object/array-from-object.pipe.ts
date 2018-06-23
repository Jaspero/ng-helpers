import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'jpArrayFromObject'
})
export class ArrayFromObjectPipe implements PipeTransform {
  static format(value: Object) {
    return Object.entries(value).map(entry => ({
      key: entry[0],
      value: entry[1]
    }));
  }

  transform(value: Object): any {
    return ArrayFromObjectPipe.format(value);
  }
}
