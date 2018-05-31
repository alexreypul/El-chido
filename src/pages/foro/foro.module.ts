import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForoPage } from './foro';

@NgModule({
  declarations: [
    ForoPage,
  ],
  imports: [
    IonicPageModule.forChild(ForoPage),
  ],
})
export class ForoPageModule {}
