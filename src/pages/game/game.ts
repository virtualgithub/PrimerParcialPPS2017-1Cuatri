import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class Game {
  nombre : string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
    this.storage.get('nombre').then((val) => {
      this.nombre = val;
    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad Game');
  }

}
