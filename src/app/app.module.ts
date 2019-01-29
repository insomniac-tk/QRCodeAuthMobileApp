import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {LandingPage} from '../pages/landing/landing';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HttpModule } from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import {BarcodeScanner} from '@ionic-native/barcode-scanner';
import {Network} from '@ionic-native/network';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LandingPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{scrollPadding: false,
      scrollAssist: false}),
    HttpModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LandingPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpModule,
    BarcodeScanner,
    Network
  ]
})
export class AppModule {}
