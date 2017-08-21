import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListCategoryPage } from './list-category';

@NgModule({
  declarations: [
    ListCategoryPage,
  ],
  imports: [
    IonicPageModule.forChild(ListCategoryPage),
  ],
})
export class ListCategoryPageModule {}
