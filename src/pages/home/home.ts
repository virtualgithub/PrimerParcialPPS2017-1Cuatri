import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';//STORAGE FOR IONIC

import { About } from '../about/about';
import { Game } from '../game/game';
import { Jugada } from "../../classes/jugada";
import { Cuestionario } from "../../classes/cuestionario";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  jugadas : Jugada[];
  jugadaActual : Jugada;
  cuestionarios : Cuestionario[];

  constructor(public navCtrl: NavController, private storage: Storage) {
    //OBTENCIÓN DE JUGADAS DESDE EL STORAGE HACIA EL ARRAY LOCAL
    this.storage.get('jugadas').then((val) => {this.jugadas = JSON.parse(val);});
    //OBTENCIÓN DE CUESTIONARIOS DESDE EL STORAGE HACIA EL ARRAY LOCAL
    this.storage.get('cuestionarios').then((val) => {this.cuestionarios = JSON.parse(val);});
  }
  
  irGame(nombre){
    this.jugadaActual = new Jugada(nombre, this.cuestionarios.length);
    

    //AGREGADO DEL NOMBRE AL ARRAY LOCAL DE JUGADAS
    this.jugadas[0].nombreJugador = nombre;
    this.storage.ready().then(() => {
      //GUARDADO DE LA JUGADA EN BASE DE DATOS
      this.storage.set('jugadas', this.jugadas).then((val) => {
        //REDIRECCION A PAGINA GAME
        this.navCtrl.push(Game);
      });      
    });
  }

  irAbout(){
    this.navCtrl.push(About);
  }


}