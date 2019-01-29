import { Component } from '@angular/core';
import {IonicPage, NavController,ToastController} from 'ionic-angular';
import { HttpClient} from '@angular/common/http';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HomePage } from '../home/home';
import { Network } from '@ionic-native/network';


//import { PARAMETERS } from '@angular/core/src/util/decorators';
@IonicPage()
@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',
})



export class LandingPage {
  /**
    * @name form
    * @type {FormGroup}
    * @public
    * @description     Define FormGroup property for  manphpaging form validation / data retrieval
    */  

    public form                   : FormGroup;


     /**
    * @name Username
    * @type {Any}
    * @public
    * @description     Model for managing Username field
    */
   public Username         : any;

   /**
    * @name Password
    * @type {Any}
    * @public
    * @description     Model for managing Password field
    */
   public Password  : any;

    /**
    * @name baseURI 
  
    * @type {String}
    * @public
    * @description     Remote URI for retrieving data from and sending data to
    */
    private baseURI               : string  = "http://localhost/";


/**
* Clear values in the page's HTML form fields
*
* @public
* @method resetFields
* @return {None}
*/

resetFields() : void
{
this.Username          = "";
this.Password          = "";
}


 /**
    * @name usr
    * @type String
    * @public
    * @description     Used to store returned PHP data and to pass as Parameter
    */
    public usr : String;

  
 // Initialise module classes
 constructor(public navCtrl    : NavController,
  public http       : HttpClient,
  public fb         : FormBuilder,
  public toastCtrl  : ToastController,private network: Network)
  {
  
    // Create form builder validation rules
    // "name" and "password" are the formControl names
    
      this.form = fb.group({
        "name"                  : ["", Validators.required],
        "password"              : ["", Validators.required]
          });
  
  }
  
 

ionViewWillEnter() : void
{
  // Login form should be empty
  this.resetFields();
} 


ionViewDidEnter()
{
  this.network.onConnect().subscribe(data => {
    console.log(data);
    this.sendNotification("Your device is now connected to the internet!");
  }, error => console.error(error));
 
  this.network.onDisconnect().subscribe(data => {
    console.log(data);
    this.sendNotification("Bummer.Your device is not connected to the internet.!");
  }, error => console.error(error));
}


PhpValidate(): void
{
    let username_to_send          : string = this.form.controls["name"].value,
    password_to_send              : string = this.form.controls["password"].value;
    let url       : any      	= this.baseURI + "phpscript.php?username="+username_to_send+"&&password="+password_to_send ;
    this.http.get(url)
    .subscribe((data : any) =>
    {
      if(data.flag==0)
      {
        alert("Invalid Username/Password. Try again.");
      }

        else
        {
          this.sendNotification("Welcome to TX 2018 " + data.Username);
        this.usr = username_to_send;
        this.navCtrl.push(HomePage,{user: this.usr}) // push Homepage on Nav stack with param of type String  
        } 
      },
      (error : any) =>
      {this 
        console.log("GTFO!");
      });
     
}


/**
* Manage notifying the user of the outcome of remote operations
*
* @public
* @method sendNotification
* @param message 	{String} Username'];
fwrite($myfile,json_encode(			Message to be displayed in the notification
* @return {None}
*/
sendNotification(message : string)  : void
{
let notification = this.toastCtrl.create({
message       : message,
duration      : 2000
});
notification.present();
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LandingPage');
  }
}