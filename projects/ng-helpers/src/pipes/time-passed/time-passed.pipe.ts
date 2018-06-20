import { Pipe, PipeTransform } from '@angular/core';

export enum TimePassedType {
  Millisecond,
  Second,
  Minute,
  Hour,
  Day,
  Month,
  Year
}

@Pipe({
  name: 'jpTimePassed'
})
export class TimePassedPipe implements PipeTransform {

  static timeDiff(
    dateOne: Date,
    dateTwo: Date = new Date(),
    type = TimePassedType.Day
  ) {
    const oneDay = 24 * 60 * 60 * 1000;

    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = hour * 24;

    const durationMap = {
      [TimePassedType.Millisecond]: 1,
      [TimePassedType.Second]: 1000,
      [TimePassedType.Minute]: minute,
      [TimePassedType.Hour]: hour,
      [TimePassedType.Day]: day,
      [TimePassedType.Month]: day * 30,
      [TimePassedType.Year]: day * 365
    };

    return Math.round(
      Math.abs((dateOne.getTime() - dateTwo.getTime()) / durationMap[type])
    );
  }

  transform(dateOne: Date, dateTwo?: Date, type?: TimePassedType): any {
    return TimePassedPipe.timeDiff(
      dateOne,
      dateTwo,
      type
    );
  }

}
