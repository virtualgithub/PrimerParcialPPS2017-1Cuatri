import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';//STORAGE FOR IONIC

import { About } from '../about/about';
import { Game } from '../game/game';
import { Jugada } from "../../classes/jugada";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  jugadas : Jugada[];

  constructor(public navCtrl: NavController, private storage: Storage) {
    this.jugadas = new Array();
    //PREPARACIÓN DEL ALMACENAMIENTO
    this.storage.ready().then(() => {
      //OBTENCIÓN DE JUGADAS DESDE EL STORAGE HACIA EL ARRAY LOCAL
      this.storage.clear();//////////////////////////////////////////////////borrar para historial
      this.storage.get('jugadas').then((val) => {
        if(val === null){
          return;
        }
        this.jugadas = val;
      });
    });
  }
  
  irGame(nombre){
    //CREACIÓN DE JUGADA Y AGREGADO DE JUGADA EN ARRAY DE JUGADAS
    new Jugada(nombre).AgregarJugada(this.jugadas);
    //PREPARACIÓN DEL ALMACENAMIENTO
    this.storage.ready().then(() => {
      //GUARDADO DE LAS JUGADAS EN BASE DE DATOS
      this.storage.set('jugadas', JSON.stringify(this.jugadas)).then(() => {
        //REDIRECCION A PAGINA GAME
        this.navCtrl.push(Game);
      });      
    });
  }

  irAbout(){
    this.navCtrl.push(About);
  }
}