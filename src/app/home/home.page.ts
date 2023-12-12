import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy{

  qrCodeString= "hola";
  scannedResult: any;
  content_visibility = "";
  
  nom: string = '';
  id: number = 0;

  constructor(private router: Router, private activeRoute: ActivatedRoute) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if(state && state['nom']) {
      this.nom = state['nom'];
      this.id = state['id'];
    }
  }

ngOnInit() {
    this.activeRoute.queryParams.subscribe(() => {
      let state = this.router.getCurrentNavigation()?.extras.state;
      if (state) {
        this.nom = state['nom'].nom;
        this.id = state['id'].id;
        console.log(this.nom);
        console.log(this.id);
      }
    })
  }

  async checkPermission() {
    try {
      // check or request permission
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        // the user granted permission
        return true;
      }
      // the user denied permission
      return false;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async startScan() {
    try{
      const permissions = await this.checkPermission();
      if (!permissions) {
        return;
      }
      await BarcodeScanner.hideBackground(); // make background of WebView transparent
      document.querySelector('body')?.classList.add('scanner-active');
      this.content_visibility = 'hidden';
      const result = await BarcodeScanner.startScan(); // start scanning and wait for a result
      console.log(result);
      
      BarcodeScanner.showBackground();
      document.querySelector('body')?.classList.remove('scanner-active');
      this.content_visibility = '';
      if (result?.hasContent) {
        this.scannedResult = result.content;
        console.log(this.scannedResult);
      }
    }catch(e){
      console.log(e);
      this.stopScan();
    }
  }
  stopScan() {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    document.querySelector('body')?.classList.remove('scanner-active');
    this.content_visibility = '';
  }

  ngOnDestroy(): void {
    this.stopScan();
  }


}
