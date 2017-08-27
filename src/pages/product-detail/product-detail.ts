import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//import { CallNumber } from '@ionic-native/we-chat';
import { Product } from '../../models/product';

declare let Wechat;

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
    Wechat.share({
      message: {
        title: this.currentProduct.code + ":" + this.currentProduct.name,
        description: (this.currentProduct.description || ''),
        //thumb: "www/img/thumbnail.png",
        //mediaTagName: "TEST-TAG-001",
        //messageExt: "这是第三方带的测试字段",
        //messageAction: "<action>dotalist</action>",
        media: {
          type: Wechat.Type.IMAGE,
          image: this.currentProduct.imageSrc
        }
      },
      //text: "Just a test for session",
      scene: Wechat.Scene.TIMELINE   // share to Timeline
    }, function () {
      alert("分享朋友圈成功");
    }, function (reason) {
      alert("分享朋友圈失败");
    });
  }

  shareWXSession() {
    Wechat.share({
      //text: "Just a test for session",
      message: {
        title: this.currentProduct.code + ":" + this.currentProduct.name,
        description: (this.currentProduct.description|| ''),
        //thumb: "www/img/thumbnail.png",
        //mediaTagName: "TEST-TAG-001",
        //messageExt: "这是第三方带的测试字段",
        //messageAction: "<action>dotalist</action>",
        media: {
          type: Wechat.Type.IMAGE,
          image: this.currentProduct.imageSrc
        }
      },
      scene: Wechat.Scene.SESSION   // share to Timeline
    }, function () {
      alert("发送朋友成功");
    }, function (reason) {
      alert("发送朋友失败");
    });
  }
}