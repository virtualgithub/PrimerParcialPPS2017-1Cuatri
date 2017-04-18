import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';//STORAGE FOR IONIC

import { About } from '../about/about';
import { Game } from '../game/game';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',

})
export class HomePage {

  constructor(public navCtrl: NavController, private storage: Storage) {

  }
  
  irGame(nombre){
    this.storage.ready().then(() => {
      //GUARDADO DEL NOMBRE EN BASE DE DATOS
      this.storage.set('nombre', nombre);
      //REDIRECCION A PAGINA GAME
      this.navCtrl.push(Game);
    });
  }

  irAbout(){
    this.navCtrl.push(About);
  }
}