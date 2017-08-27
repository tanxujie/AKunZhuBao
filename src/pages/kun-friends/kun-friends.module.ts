import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KunFriendsPage } from './kun-friends';

@NgModule({
  declarations: [
    KunFriendsPage,
  ],
  imports: [
    IonicPageModule.forChild(KunFriendsPage),
  ],
})
export class KunFriendsPageModule {}
