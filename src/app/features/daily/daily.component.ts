import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-daily',
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.scss']
})
export class DailyComponent  implements OnInit {

  public members = [{
    id: 1,
    name: 'Andy Yair',
    lastName: 'Bolaño Castilla',
    registersTypes: [
      {
        name: 'assistance',
        value: false
      },
      {
        name: 'study',
        value: false
      },
      {
        name: 'mission',
        value: false
      },
    ]
  },{
    id: 1,
    name: 'Andy Yair',
    lastName: 'Bolaño Castilla',
    registersTypes: [
      {
        name: 'assistance',
        value: false
      },
      {
        name: 'study',
        value: false
      },
      {
        name: 'mission',
        value: false
      },
    ]
  },{
    id: 1,
    name: 'Andy Yair',
    lastName: 'Bolaño Castilla',
    registersTypes: [
      {
        name: 'assistance',
        value: false
      },
      {
        name: 'study',
        value: false
      },
      {
        name: 'mission',
        value: false
      },
    ]
  },{
    id: 1,
    name: 'Andy Yair',
    lastName: 'Bolaño Castilla',
    registersTypes: [
      {
        name: 'assistance',
        value: false
      },
      {
        name: 'study',
        value: false
      },
      {
        name: 'mission',
        value: false
      },
    ]
  }]
  constructor() { }

  ngOnInit() {
    this.getRegisters()
  }

  private getRegisters (): void {

  }

  public next (): void {
    
  }

  public prev (): void {
    
  }
}
