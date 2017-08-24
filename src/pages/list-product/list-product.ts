import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Product } from '../../models/product';
import { ProductPair } from '../../models/productpair';
import { ProductDetailPage } from '../product-detail/product-detail';
import { ProductProvider } from '../../providers/product/product';
/**
 * Generated class for the ListProductPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-list-product',
  templateUrl: 'list-product.html',
})
export class ListProductPage {

  currentProducts: ProductPair[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public pdProvider: ProductProvider) {
    this.pdProvider.query().subscribe(
      data => this.resolve(data), 
      err => this.reject(err));
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ListProductPage');
  }

  search(ent: any) {
    this.pdProvider
      .query({ condition : ent.target.value })
      .subscribe(data => this.resolve(data), err => this.reject(err));
  }

  openDetail(pd: Product) {
    this.navCtrl.push(ProductDetailPage, { product: pd });
  }

  private resolve(data) {
    this.currentProducts.length = 0;
    if (data.success) {
      let cnt = data.data.length;
      for (let i = 0; i < cnt; i++) {
        this.currentProducts.push(new ProductPair(data.data[i]));
      }
    }
  }

  private reject(err) {
    console.log(err);
  }
}
