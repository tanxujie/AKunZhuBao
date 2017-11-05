import { Component, ViewChild } from '@angular/core';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Clipboard } from '@ionic-native/clipboard';
import { SocialSharing } from '@ionic-native/social-sharing';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
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
              private socialSharing: SocialSharing,
              private alertController: AlertController,
              private actionSheetCtrl: ActionSheetController,
              public loadingCtrl: LoadingController) {
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
    let slf = this;
    //slf.clipboard.copy(slf.currentProduct.name||'');

    // download images
    // let files: string[] = new Array();
    let i = 0;
    let len = 0;
    // if (this.currentProduct.imageSrcs && this.currentProduct.imageSrcs.length > 0) {
    //   len = this.currentProduct.imageSrcs.length;
    //   for (; i < len; i++) {
    //     let imgSrc = this.currentProduct.imageSrcs[i];
    //     let fileName = imgSrc.substring(imgSrc.lastIndexOf("/")+1, imgSrc.lastIndexOf('?authToken'));
    //     console.log(imgSrc + '<=>' + fileName);
    //     this.fileTransfer.download(imgSrc, slf.file.tempDirectory + fileName).then((entry)=>{
    //       console.log('Local => ' + slf.file.tempDirectory + fileName);
    //       files.push(slf.file.tempDirectory + fileName);
    //     });;
    //   }
    // }
    // let files: string[] = new Array;
    // for (let i = 0, len = this.currentProduct.imageSrcs.length; i < len; i++) {
    //   files.push(this.currentProduct.imageSrcs[i]);
    // }
    // let options = {
    //   //message: slf.currentProduct.name||'',
    //   //subject: '图片分享 ',
    //   files: files,
    //   url: 'weixin://dl/moments'
    // };
    // let onSuccess = function(result) {
    //   alert('分享成功');
    // };
    // let onError = function(msg) {
    //   alert('分享失败');
    // };
    
    // this.socialSharing.shareWithOptions(options).then(onSuccess, onError);
    //this.socialSharing.share((slf.currentProduct.name||''), '', this.currentProduct.imageSrcs, 'weixin://');

    this.photoLibrary.requestAuthorization({read: true, write: true}).then(() => {
      // start downloading
      let loading = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: '正在下载...',
        dismissOnPageChange: true,
        showBackdrop: true
      });
      loading.present();

      // download images
      let i = 0; 
      let len = 0;
      if (this.currentProduct.imageSrcs && this.currentProduct.imageSrcs.length > 0) {
        len = this.currentProduct.imageSrcs.length;
        for (; i < len; i++) {
          this.photoLibrary.saveImage(this.currentProduct.imageSrcs[i], '阿坤珠宝');
        }
      }

      // download video
      if (this.currentProduct.hasVideo) {
        this.fileTransfer.download(this.currentProduct.videoSrc, this.file.tempDirectory + "AKunZhuBao.mp4")
          .then((entry)=>{
            this.photoLibrary.saveVideo(entry.toURL(), '阿坤珠宝').then(()=>{
              // remove file
              this.file.removeFile(this.file.tempDirectory, 'AKunZhuBao.mp4')
                .then(()=>console.log('Remove-Video succeeded.'), (err)=> console.log('Remove-Video failed. Caused By : ' + err));
              //this._showMessage("图片视频已下载到本地相册");
              //Wechat.jumpToWechat("weixin://", function(){}, function(){ this._showMessage('跳转微信失败');});
            }, ()=>{
              this._showMessage('视频已下载失败');
            });
          }, (err)=>{
            console.log("FileTransfer Download failed. Caused by : " + err);
          }).catch((err)=>{ console.log("FileTransfer Download failed. Caused by : " + err); });
      }

      if (len > 0 || this.currentProduct.hasVideo) {
        setTimeout(function(){
          // end downloading
          loading.dismiss();
          let alert = slf.alertController.create({
            title: "提示",
            subTitle: "图片已下载到本地相册，请选择并复制黏贴商品信息",
            buttons: [{
              text: 'OK',
              handler: ()=> {
                /*Wechat.share({
                  text: " ",
                  scene: Wechat.Scene.TIMELINE
                }, function () {
                  slf._showMessage('分享朋友圈成功');
                }, function (reason) {
                  slf._showMessage('分享朋友圈失败');
                });*/
                //slf.clipboard.copy(slf.currentProduct.name||'');
                // Wechat.jumpToWechat("weixin://", function(){}, function(){
                //   slf._showMessage('跳转微信失败');
                // });
              }
            }]
          });
          alert.present();
        }, 7000);
      }
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
    slf.clipboard.copy(slf.currentProduct.name||'');
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
    slf.clipboard.copy(slf.currentProduct.name||'');
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
