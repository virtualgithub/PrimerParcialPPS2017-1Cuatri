import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Game } from './game';

@NgModule({
  declarations: [
    Game,
  ],
  imports: [
    IonicPageModule.forChild(Game),
  ],
  exports: [
    Game
  ]
})
export class GameModule {}
