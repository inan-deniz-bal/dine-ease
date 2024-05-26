import { Injectable } from '@angular/core';
import { restaurantByTableResponseType } from 'src/types/restaurantByTableResponseType';

@Injectable({
  providedIn: 'root',
})
export class RestaurantByTableService {
  private defaultResponse: restaurantByTableResponseType = {
    restaurantName: '',
    menu: [],
  };
  private selectedTableID: string = '';

  getResponse(): restaurantByTableResponseType {
    return this.defaultResponse;
  }

  setResponse(response: restaurantByTableResponseType): void {
    this.defaultResponse = response;
  }

  getSelectedTableID(): string {
    return this.selectedTableID;
  }

  setSelectedTableID(id: string): void {
    console.log("yeni id", id)
    this.selectedTableID = id;
  }

  constructor() {}
}
