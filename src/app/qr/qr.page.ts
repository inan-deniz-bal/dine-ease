import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit {
  constructor() {}
  isTransparent = false;

  ngOnInit() {
    this.startScanner();

  }

  async startScanner() {
    await BarcodeScanner.checkPermission({ force: true });
    BarcodeScanner.hideBackground();
    this.isTransparent=true;
    const result = await BarcodeScanner.startScan();
    // if the result has content
    if (result.hasContent) {
      console.log(result.content); // log the raw scanned content
    }
  }
  ngOnDestroy() {
    this.stopScan();
  }
  stopScan = () => {
    BarcodeScanner.showBackground();
    this.isTransparent=false;
    BarcodeScanner.stopScan();
  };
}
