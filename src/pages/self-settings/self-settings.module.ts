import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelfSettingsPage } from './self-settings';

@NgModule({
  declarations: [
    SelfSettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(SelfSettingsPage),
  ],
})
export class SelfSettingsPageModule {}
