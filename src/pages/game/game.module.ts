import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { Game } from './game';
import { Results } from '../pages/results/results';

@NgModule({
  declarations: [
    Game,
    Results
  ],
  imports: [
    IonicPageModule.forChild(Game),
  ],
  exports: [
    Game
  ],
  entryComponents: [
    Results
  ]
})
export class GameModule {}
