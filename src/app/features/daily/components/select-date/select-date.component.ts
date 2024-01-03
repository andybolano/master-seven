import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { getNumberSaturdayByQuarter, getQuarter, nextSaturday, prevSaturday } from '@shared/utils/date';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-select-date',
  templateUrl: './select-date.component.html',
  styleUrls: ['./select-date.component.scss'],
})
export class SelectDateComponent  implements OnInit {
  @Output()
  dateChanged = new EventEmitter<string>();
  
  public quarter = getQuarter()
  public date:  dayjs.Dayjs = nextSaturday()
  public saturdayNumber: string = ''

  constructor() { }

  ngOnInit (): void {
    this.setParams(this.date)
  }

  public prev (): void {
    this.date = prevSaturday(this.date)
    this.setParams(this.date)
  }

  public next (): void {
    this.date = nextSaturday(this.date)
    this.setParams(this.date)
  }

  private setParams (date: dayjs.Dayjs): void {
    this.quarter = getQuarter(date);
    this.saturdayNumber = getNumberSaturdayByQuarter(date)
    this.dateChanged.emit(date.format('YYYY-MM-DD'))
  }

}
