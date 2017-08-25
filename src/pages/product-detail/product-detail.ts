import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Product } from '../../models/product';
/**
 * Generated class for the ProductDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {

  @ViewChild('ionSlides') slides;

  currentProduct: Product;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.currentProduct = navParams.get('product');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailPage');
    //this.slides.startAutoplay();
  }

  shareWXTimeLine() {
    alert("TimeLine");
  }

  shareWXSession() {
    alert("Session");
  }
}