import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListMicroclassPage } from './list-microclass';

@NgModule({
  declarations: [
    ListMicroclassPage,
  ],
  imports: [
    IonicPageModule.forChild(ListMicroclassPage),
  ],
})
export class ListMicroclassPageModule {}
