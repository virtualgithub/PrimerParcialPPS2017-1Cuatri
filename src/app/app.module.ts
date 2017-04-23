import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';//STORAGE FOR IONIC

import { About } from '../pages/about/about';
import { Game } from '../pages/game/game';
import { HomePage } from '../pages/home/home';
import { MyApp } from './app.component';
import { Results } from '../pages/results/results';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    About,
    Game,
    Results
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()//STORAGE FOR IONIC
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    About,
    Game,
    Results
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
