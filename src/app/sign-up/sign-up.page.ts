import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  name:string=""
  surname:string="";
  birthday:string="";
  e_mail:string="";
  passowrd:string=""

  constructor(
    private navCtrl:NavController
  ) { }

  ngOnInit() {
  }


  signUp(){

    this.navCtrl.navigateRoot("home")
  }

}
