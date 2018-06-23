import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'jpArrayFromObject'
})
export class ArrayFromObjectPipe implements PipeTransform {
  transform(value: Object): any {
    return Object['entries'](value).map(entry => ({
      key: entry[0],
      value: entry[1]
    }));
  }
}
