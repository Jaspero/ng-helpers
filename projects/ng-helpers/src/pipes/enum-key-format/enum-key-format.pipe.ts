import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jpEnumKeyFormat'
})
export class EnumKeyFormatPipe implements PipeTransform {

  static defaultFormat(value: string) {
    return value
      .split(new RegExp('(?=[A-Z])'))
      .join(' ');
  }

  transform(value: any, enumValue: any, formatFunction: Function = EnumKeyFormatPipe.defaultFormat): any {
    return enumValue[value] ?
      formatFunction(enumValue[value]) :
      value;
  }

}
