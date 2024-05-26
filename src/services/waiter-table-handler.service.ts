import { Injectable } from '@angular/core';
//import { Subject } from 'rxjs';
import { Table } from 'src/types/tableType';

@Injectable({
  providedIn: 'root'
})
export class WaiterTableHandlerService {
  //selectedTable = new Subject<string>();
  selectedTable:Table={
    tableName:"",
    _id:"",
    orders:[{
      date:new Date(),
      currentOrder:"",
      customerId:"",
      status:""
    }]
  }

  getTable():Table{
    return this.selectedTable
  }

  setTable(selectedT:Table)
  {
    this.selectedTable=selectedT
  }

  constructor() { }
}
