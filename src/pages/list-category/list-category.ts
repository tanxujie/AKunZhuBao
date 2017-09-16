import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ListCategoryProductPage } from '../list-category-product/list-category-product';

/**
 * Generated class for the ListCategoryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-list-category',
  templateUrl: 'list-category.html',
})
export class ListCategoryPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

  openByMajorCategory(id:number) {
    this.navCtrl.push(ListCategoryProductPage, { majorCategoryId: id});
  }

  openByMinorCategory(id:number) {
    this.navCtrl.push(ListCategoryProductPage, { minorCategoryId: id});
  }
}