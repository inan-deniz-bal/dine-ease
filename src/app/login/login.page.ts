import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ServerHandlerService } from 'src/services/server-handler.service';
import { Login } from 'src/classes/login';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = '';
  password: string = '';

  constructor(
    private navctrl: NavController,
    private serverSer: ServerHandlerService,
    private menuCtrl:MenuController
  ) {}



  ngOnInit() {
    this.menuCtrl.enable(false)


  }

  login() {

    const serverResponse= this.serverSer.loginHandler(new Login(this.username,this.password))
    if(serverResponse=="not_match"){
      this.navctrl.navigateForward('/sign-up')
    }
    else if(serverResponse=="wrong_pass"){
      this.username="Wrong password"
    }
    else{
      this.menuCtrl.enable(true)
      this.navctrl.navigateRoot('/home')
    }
  }
}
