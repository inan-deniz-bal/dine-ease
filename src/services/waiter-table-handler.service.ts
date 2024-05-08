import { Injectable } from '@angular/core';
//import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WaiterTableHandlerService {
  //selectedTable = new Subject<string>();
  selectedTable:String|string=""
  getTable(){
    return this.selectedTable
  }

  setTable(selectedT:String)
  {
    this.selectedTable=selectedT
  }

  constructor() { }
}
