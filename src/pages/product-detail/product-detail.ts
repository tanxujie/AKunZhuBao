import { Component, ViewChild } from '@angular/core';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Clipboard } from '@ionic-native/clipboard';
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
  fileTransfer: FileTransferObject;

  constructor(private navCtrl: NavController, 
              private navParams: NavParams, 
              private photoLibrary: PhotoLibrary, 
              private transfer: FileTransfer, 
              private file: File, 
              private clipboard: Clipboard,
              private alertController: AlertController,
              private actionSheetCtrl: ActionSheetController) {
    this.currentProduct = navParams.get('product');
    this.fileTransfer = this.transfer.create();
  }

  /**
   * Function after view was loaded.
   */
  ionViewDidLoad() {}

  /**
   * Share selected image to Wechat TimeLine, Session or Download to local photo folder
   */
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
            this.downloadImagesAndVideo();
          }
        }
      ]
    });
    actionSheet.present();
  }

  /*
  * Share selected image or video to wechat timeline.
  */
  private shareWXTimeLine() {
    let slf = this;
    Wechat.isInstalled(function(installed){
      if (!!installed) {
        slf._shareWXTimeLine();
      } else {
        slf._showMessage('您还没有安装微信');
      }
    }, function(reason){
      slf._showMessage('分享朋友圈失败');
    });
  }

  /*
  * Share selected image or video to wechat session
  */
  private shareWXSession() {
    let slf = this;
    Wechat.isInstalled(function(installed){
      if (!!installed) {
        slf._shareWXSession();
      } else {
        slf._showMessage('您还没有安装微信');
      }
    }, function(reason){
      slf._showMessage('发送到朋友失败');
    });
  }

  private downloadImagesAndVideo() {
    //let slf = this;
    this.photoLibrary.requestAuthorization({read: true, write: true}).then(() => {
      // download images
      if (this.currentProduct.imageSrcs && this.currentProduct.imageSrcs.length > 0) {
        for (let imgSrc of this.currentProduct.imageSrcs) {
          this.photoLibrary.saveImage(imgSrc, '阿坤珠宝');
        }
      }

      // download video
      this.fileTransfer.download(this.currentProduct.videoSrc, this.file.tempDirectory + "AKunZhuBao.mp4")
        .then((entry)=>{
          this.photoLibrary.saveVideo(entry.toURL(), '阿坤珠宝').then(()=>{
            // remove file
            this.file.removeFile(this.file.tempDirectory, 'AKunZhuBao.mp4')
              .then(()=>console.log('Remove-Video succeeded.'), (err)=> console.log('Remove-Video failed. Caused By : ' + err));
            this._showMessage("视频已下载到本地相册'阿坤珠宝'");
            Wechat.jumpToWechat("weixin://", function(){}, function(){ this._showMessage('跳转微信失败');});
          }, ()=>{
            this._showMessage('视频已下载失败');
          });
        }, (err)=>{
          console.log("FileTransfer Download failed. Caused by : " + err);
        }).catch((err)=>{ console.log("FileTransfer Download failed. Caused by : " + err); });

      let alert = this.alertController.create({
        title: "提示",
        subTitle: "图片已下载到相册'阿坤珠宝'",
        buttons: [{
          text: 'OK',
          handler: ()=> {
            Wechat.jumpToWechat("weixin://", function(){}, function(){
              this._showMessage('跳转微信失败');
            });
          }
        }]
      });
      alert.present();
    }).catch(err => console.log("Save Images&Video failed. Caused By : " + err));
  }

  private _shareWXTimeLine() {
    let slf = this;
    let activeIdx: number = this.slides.getActiveIndex();
    let imgCnt: number = 0;
    if (this.currentProduct.imageSrcs && this.currentProduct.imageSrcs.length) {
      imgCnt = this.currentProduct.imageSrcs.length;
    }
    // copy product code, name and description to clipboard
    slf.clipboard.copy("【" + slf.currentProduct.code + "】:" + (slf.currentProduct.name||'') + (slf.currentProduct.description||''));
    if (activeIdx < imgCnt) {
      Wechat.share({
        message: {
          title: "【" + slf.currentProduct.code + "】:" + slf.currentProduct.name,
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
          title: "【" + slf.currentProduct.code + "】:" + slf.currentProduct.name,
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
    // copy product code, name and description to clipboard
    slf.clipboard.copy("【" + slf.currentProduct.code + "】:" + (slf.currentProduct.name||'') + (slf.currentProduct.description||''));
    if (activeIdx < imgCnt) {
      Wechat.share({
        message: {
          title: "【" + slf.currentProduct.code + "】:" + slf.currentProduct.name,
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
          title: "【" + slf.currentProduct.code + "】:" + slf.currentProduct.name,
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
