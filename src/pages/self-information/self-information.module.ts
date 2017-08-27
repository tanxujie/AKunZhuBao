import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelfInformationPage } from './self-information';

@NgModule({
  declarations: [
    SelfInformationPage,
  ],
  imports: [
    IonicPageModule.forChild(SelfInformationPage),
  ],
})
export class SelfInformationPageModule {}
