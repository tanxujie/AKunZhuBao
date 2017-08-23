import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MySettingPage } from './my-setting';

@NgModule({
  declarations: [
    MySettingPage,
  ],
  imports: [
    IonicPageModule.forChild(MySettingPage),
  ],
})
export class MySettingPageModule {}
