import { Pipe, PipeTransform } from "@angular/core";
import * as dayjs from 'dayjs';

@Pipe({
    name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {
    transform(value: dayjs.Dayjs, format = 'D MMMM'): string {
      return value.format(format)
    }
}