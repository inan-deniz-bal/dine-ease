import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { ServerHandlerService } from 'src/services/server-handler.service';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit {
  constructor(
    private serverH: ServerHandlerService,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {}
  isTransparent = false;

  ngOnInit() {
    this.startScanner();
  }

  async startScanner() {
    await BarcodeScanner.checkPermission({ force: true });
    BarcodeScanner.hideBackground();
    this.isTransparent = true;
    const result = await BarcodeScanner.startScan();
    // if the result has content
    if (result.hasContent) {
      this.serverH.getRestaurantFromTable(result.content).subscribe({
        next: (response) => {
          if (response.status === 'success') {
            this.stopScan();
            const navigationExtras: NavigationExtras = {
              state: { data: response.data }, // Data to pass to the destination component
            };
            this.navCtrl.navigateRoot(['./table'], navigationExtras);
          }
        },
        error: (error) => {
          console.log(error);
          this.failAlert(error.message);
        },
      });
    }
  }
  ngOnDestroy() {
    this.stopScan();
  }
  stopScan = () => {
    BarcodeScanner.showBackground();
    this.isTransparent = false;
    BarcodeScanner.stopScan();
  };
  failAlert(message: string) {
    this.alertCtrl
      .create({
        header: 'Masa Dolu',
        message: message,
        buttons: [
          {
            text: 'Tamam',
            handler: () => {
              this.startScanner();
            },
          },
        ],
      })
      .then((alertEl) => {
        alertEl.present();
      });
  }
}
