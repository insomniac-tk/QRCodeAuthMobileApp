import { Component } from '@angular/core';
import { NavController,App,NavParams,ToastController,AlertController } from 'ionic-angular';
import {BarcodeScanner,BarcodeScannerOptions} from '@ionic-native/barcode-scanner';
import { HttpClient} from '@angular/common/http';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

    options: BarcodeScannerOptions;step
    results: any;
    public items : Array<any> = [];
    public error: String;
    public flag: boolean;
      /**
    * @name PageTitle
    * @type {String}
    * @public
    * @description     Property to help set the page title
    */
      public PageTitle              : string;

    /**
    * @name baseURI
    * @type {String}
    * @public
    * @description     Remote URI for retrieving data from and sending data to
    */
    private baseURI               : string  = "https://txgit.org.in/app/";  
    public  Message:any;
  constructor(public toastCtrl  : ToastController,private barcode:BarcodeScanner,public navCtrl: NavController,public app:App, public http : HttpClient,public NP  : NavParams,private alertCtrl: AlertController) {
    this.PageTitle = NP.get("user"); // Header with username
    this.flag = false;
  }

  


  async scanBarcode()
  {
       this.options = {
          prompt: 'Place a barcode inside the scan area '
       }


    this.results = await this.barcode.scan(this.options); 
    let  url       : any      	= this.baseURI + "qr_code.php?id="+this.results.text+"&&username="+this.PageTitle;
    this.http.get(url) 
    .subscribe((data : any) =>
    {
      
      if(data.flag == 0 )
      {
        this.error = data.Message;
        alert(this.error);
      }
      else if(data.flag == 1)
      {
        this.items = data;  
        this.flag = true;
        this.Welcome();
      }
    },
      (error : any) =>
      {
        this.sendNotification('You have an error mate.');
      });
  }
  
  /**
     * GTFO METHOD :-D
     * @public
     * @method logout
     * @return {None}
     */
     logout()
     {
      const root = this.app.getRootNav();
      root.popToRoot();
     }  

    sendNotification(message : string)  : void
    {
      let notification = this.toastCtrl.create({
      message       : message,
      duration      : 4000
      });
          notification.present();
    }

Welcome() {
  let alert = this.alertCtrl.create({
    title: 'Welcome To TechXtreme 2018',
    subTitle: 'Scan successful!',
    buttons: ['Let the fun begin!']
  });
  alert.present();
}



}
