import { Injectable } from '@angular/core';
//import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WaiterTableHandlerService {
  //selectedTable = new Subject<string>();
  selectedTable=""
  getTable(){
    return this.selectedTable
  }

  setTable(selectedT:string)
  {
    this.selectedTable=selectedT
  }

  constructor() { }
}
