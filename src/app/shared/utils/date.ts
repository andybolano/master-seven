import * as dayjs from 'dayjs';

interface Ordinals {
    [key: number]: string;
}

const today = dayjs();

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