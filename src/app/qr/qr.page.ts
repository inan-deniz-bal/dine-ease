import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { ServerHandlerService } from 'src/services/server-handler.service';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { RestaurantByTableService } from 'src/services/restaurant-by-table.service';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit {
  constructor(
    private serverH: ServerHandlerService,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private restByt: RestaurantByTableService
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
            this.restByt.setResponse(response.data);
            this.restByt.setSelectedTableID(result.content);
            this.navCtrl.navigateRoot(['./table']);
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
