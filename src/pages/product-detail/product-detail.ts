import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Product } from '../../models/product';
// WeChat plugin global variable
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertController: AlertController) {
    this.currentProduct = navParams.get('product');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailPage');
  }

  public shareWXTimeLine() {
    let slf = this;
    Wechat.isInstalled(function(installed){
      if (!!installed) {
        slf._shareWXTimeLine();
      } else {
        slf._showMessage('您还没有安装微信');
      }
    }, function(reason){
      slf._showMessage('分享朋友圈发生错误：'  + reason);
    });
  }

  public shareWXSession() {
    let slf = this;
    Wechat.isInstalled(function(installed){
      if (!!installed) {
        slf._shareWXSession();
      } else {
        slf._showMessage('您还没有安装微信');
      }
    }, function(reason){
      slf._showMessage('发送朋友发生错误：'  + reason);
    });
  }

  private _shareWXTimeLine() {
    let slf = this;
    Wechat.share({
      message: {
        title: this.currentProduct.code + ":" + this.currentProduct.name,
        description: (this.currentProduct.description || ''),
        media: {
          type: Wechat.Type.IMAGE,
          image: this.currentProduct.imageSrc
        }
      },
      scene: Wechat.Scene.TIMELINE   // share to Timeline
    }, function () {
      slf._showMessage('分享朋友圈成功');
    }, function (reason) {
      slf._showMessage('分享朋友圈失败');
    });
  }

  private _shareWXSession() {
    let slf = this;
    Wechat.share({
      message: {
        title: this.currentProduct.code + ":" + this.currentProduct.name,
        description: (this.currentProduct.description|| ''),
        media: {
          type: Wechat.Type.IMAGE,
          image: this.currentProduct.imageSrc
        }
      },
      scene: Wechat.Scene.SESSION   // share to Session
    }, function () {
      slf._showMessage('发送朋友成功');
    }, function (reason) {
      slf._showMessage('发送朋友失败');
    });
  }

  /*
  * 显示消息
  */
  private _showMessage(msg: string) {
    let alert = this.alertController.create({
        title: "提示",
        subTitle: msg,
        buttons: ['OK']
    });
    alert.present();
  }
}