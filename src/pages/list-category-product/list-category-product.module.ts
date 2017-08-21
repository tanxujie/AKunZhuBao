import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListCategoryProductPage } from './list-category-product';

@NgModule({
  declarations: [
    ListCategoryProductPage,
  ],
  imports: [
    IonicPageModule.forChild(ListCategoryProductPage),
  ],
})
export class ListCategoryProductPageModule {}
