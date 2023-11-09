import { Component, OnInit } from '@angular/core';
import { RestList } from 'src/classes/rest-list';
import { ServerHandlerService } from 'src/services/server-handler.service';
import { SelectedRestService } from 'src/services/selected-rest.service';
import { SelectedRestaurant } from 'src/interfaces/selected-restaurant';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  restourants: RestList[] = [];
  constructor(

    private serverH: ServerHandlerService,
    private selectedRest: SelectedRestService,
    private route:Router
  ) {}

  ngOnInit() {
    this.restourants = this.serverH.getRestList();
    console.log("Restaurants ",this.restourants)
  }
  showRestaurant(selectedRestaurant: RestList) {
    const selectedR: SelectedRestaurant = {
      name: selectedRestaurant.getName(),
      rate: selectedRestaurant.getRate(),
    };

    this.selectedRest.selectRestaurant(selectedRestaurant);
    this.route.navigate(['./restaurant'])
  }
}
