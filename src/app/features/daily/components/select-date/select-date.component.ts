import { Component, OnInit } from '@angular/core';
import { getQuarter } from '@shared/utils/date';

@Component({
  selector: 'app-select-date',
  templateUrl: './select-date.component.html',
  styleUrls: ['./select-date.component.scss'],
})
export class SelectDateComponent  implements OnInit {

  public quarter = getQuarter()
  
  constructor() { }

  ngOnInit () {
    console.log('')
  }

  public next (): void {
    
  }

  public prev (): void {
    
  }

}
