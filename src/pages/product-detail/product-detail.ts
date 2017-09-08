import { Component, ViewChild } from '@angular/core';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ActionSheetController, Slides } from 'ionic-angular';
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

  @ViewChild(Slides) slides: Slides;

  currentProduct: Product;

  constructor(private navCtrl: NavController, 
              private navParams: NavParams, 
              private photoLibrary: PhotoLibrary, 
              private alertController: AlertController,
              private actionSheetCtrl: ActionSheetController) {
    this.currentProduct = navParams.get('product');
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ProductDetailPage');
  }

  public shareImages() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '分享图片',
      buttons:[
        {
          text: '分享朋友圈',
          handler: () => {
            this.shareWXTimeLine();
          }
        },
        {
          text: '发送给朋友',
          handler: () => {
            this.shareWXSession();
          }
        },
        {
          text: '手工分享',
          handler: () => {
            this.downloadImages();
          }
        }
      ]
    });
    actionSheet.present();
  }

  private downloadImages() {
    let slf = this;
    if (this.currentProduct.imageSrcs == null 
      || this.currentProduct.imageSrcs.length == 0) {
      this._showMessage("下载图片不存在");
      return;
    }
    this.photoLibrary.requestAuthorization({read: true, write: true}).then(() => {
      for (let imgSrc of this.currentProduct.imageSrcs) {
        this.photoLibrary.saveImage(imgSrc, '阿坤珠宝');
      }
      //this._showMessage("图片以下载到相册'阿坤珠宝'");
      let alert = this.alertController.create({
        title: "提示",
        subTitle: "图片已下载到相册'阿坤珠宝'",
        buttons: [{
          text: 'OK',
          handler: ()=> {
            let url = "weixin://";
            Wechat.jumpToWechat(url, function(){}, function(){
              slf._showMessage("跳转微信失败");
            });
          }
        }]
    });
    alert.present();
    }).catch(err => console.log("Save-Image failed. Caused By : " + err));
  }

  private shareWXTimeLine() {
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

  private shareWXSession() {
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
    let activeIdx: number = this.slides.getActiveIndex();
    let imgCnt: number = 0;
    if (this.currentProduct.imageSrcs && this.currentProduct.imageSrcs.length) {
      imgCnt = this.currentProduct.imageSrcs.length;
    }
    if (activeIdx < imgCnt) {
      Wechat.share({
        message: {
          title: slf.currentProduct.code + ":" + slf.currentProduct.name,
          description: (slf.currentProduct.description || ''),
          media: {
            type: Wechat.Type.IMAGE,
            image: slf.currentProduct.imageSrcs[activeIdx]
          }
        },
        scene: Wechat.Scene.TIMELINE   // share to Timeline
      }, function () {
        slf._showMessage('分享朋友圈成功');
      }, function (reason) {
        slf._showMessage('分享朋友圈失败');
      });
    } else {
      Wechat.share({
        message: {
          title: slf.currentProduct.code + ":" + slf.currentProduct.name,
          description: (slf.currentProduct.description || ''),
          media: {
            type: Wechat.Type.VIDEO,
            videoUrl: slf.currentProduct.videoSrc
          }
        },
        scene: Wechat.Scene.TIMELINE   // share to Timeline
      }, function () {
        slf._showMessage('分享朋友圈成功');
      }, function (reason) {
        slf._showMessage('分享朋友圈失败');
      });
    }
  }

  private _shareWXSession() {
    let slf = this;
    let activeIdx: number = this.slides.getActiveIndex();
    let imgCnt: number = 0;
    if (this.currentProduct.imageSrcs && this.currentProduct.imageSrcs.length) {
      imgCnt = this.currentProduct.imageSrcs.length;
    }
    if (activeIdx < imgCnt) {
      Wechat.share({
        message: {
          title: slf.currentProduct.code + ":" + slf.currentProduct.name,
          description: (slf.currentProduct.description || ''),
          media: {
            type: Wechat.Type.IMAGE,
            image: slf.currentProduct.imageSrcs[activeIdx]
          }
        },
        scene: Wechat.Scene.SESSION   // share to session
      }, function () {
        slf._showMessage('发送给朋友成功');
      }, function (reason) {
        slf._showMessage('发送给朋友失败');
      });
    } else {
      Wechat.share({
        message: {
          title: slf.currentProduct.code + ":" + slf.currentProduct.name,
          description: (slf.currentProduct.description || ''),
          media: {
            type: Wechat.Type.VIDEO,
            videoUrl: slf.currentProduct.videoSrc
          }
        },
        scene: Wechat.Scene.SESSION   // share to session
      }, function () {
        slf._showMessage('发送给朋友成功');
      }, function (reason) {
        slf._showMessage('发送给朋友失败');
      });
    }
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
