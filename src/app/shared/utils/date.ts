import * as dayjs from 'dayjs';
import 'dayjs/locale/es';
dayjs.locale('es');
interface Ordinals {
    [key: number]: string;
}

const today = dayjs();

export const nextSaturday = (date = today): dayjs.Dayjs => {
    const daysUntilNextSaturday = (6 - date.day() + 7) % 7;
    const nextSaturday = date.add(daysUntilNextSaturday, 'day').startOf('day');
    return nextSaturday.isSame(date) ? nextSaturday.add(1, 'week') : nextSaturday;
}

export const prevSaturday = (date = today): dayjs.Dayjs => {
    const prevSaturday = date.subtract(1, 'week').startOf('day');
    return prevSaturday;
}
  
export const getQuarter = (date = today): string => {
    const quarter = Math.floor((date.month() + 3) / 3)
    return `${ getOrdinalIndicator(quarter) } Trimestre`;
}

const getOrdinalIndicator = (number: number): string => {
  const lastTwoDigits = number % 100;
  const lastDigit = lastTwoDigits % 10;

  const ordinals: Ordinals = {
    1: `${number}er`,
    2: `${number}do`,
    3: `${number}er`,
  }

  return lastTwoDigits >= 10 && lastTwoDigits <= 20 
    ?  `${number}º` 
    :   ordinals[lastDigit] || `${number}º`
}

export const getNumberSaturdayByQuarter = (date: dayjs.Dayjs): string => {
    const firstDatOfQuarter = date.startOf('year').add(Math.floor(date.month() / 3) * 3, 'month');
    const saturdayCount = Math.floor((date.diff(firstDatOfQuarter, 'day') + firstDatOfQuarter.day()) / 7);
  
    return `${ getOrdinalIndicator(saturdayCount + 1) } Sábado`;
}