import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { ActionSheetController } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { MicroClassVideo } from '../../models/microclassvideo';

// WeChat plugin global variable
declare let Wechat;
/**
 * Generated class for the MicroclassvideoDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-microclassvideo-detail',
  templateUrl: 'microclassvideo-detail.html',
})
export class MicroclassvideoDetailPage {

  currentMicroClassVideo: MicroClassVideo;
  fileTransfer: FileTransferObject;

  constructor(private navCtrl: NavController, 
              private navParams: NavParams, 
              private photoLibrary: PhotoLibrary, 
              private transfer: FileTransfer, 
              private file: File, 
              private alertController: AlertController,
              private actionSheetCtrl: ActionSheetController) {
    this.currentMicroClassVideo = navParams.get('MicroClassVideo');
    this.fileTransfer = this.transfer.create();
  }

  ionViewDidLoad() {
    //console.log('Loading Video : ' + this.currentMicroClassVideo.videoSrc);
  }

  public shareVideo() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '分享视频',
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
            this.downloadVideo();
          }
        }
      ]
    });
    actionSheet.present();
  }

  private downloadVideo() {
    this.photoLibrary.requestAuthorization({read: true, write: true}).then(() => {
      //let fileTransfer: FileTransferObject = this.transfer.create();
      // cdvfile://localhost/persistent/img/AKunZhuBao.mp4
      this.fileTransfer.download(this.currentMicroClassVideo.videoSrc, this.file.tempDirectory + "AKunZhuBao.mp4")
        .then((entry) => {
          let fileUrl = entry.toURL();
          console.log('download complete : ' + fileUrl);
          this.photoLibrary.saveVideo(fileUrl, '阿坤珠宝').then(()=>{
            // remove file
            this.file.removeFile(this.file.tempDirectory, "AKunZhuBao.mp4")
              .then(()=>console.log("Remove-Video succeeded."), (err)=> console.log("Remove-Video failed. Caused By : " + err));
            this._showMessage("视频已下载到本地相册'阿坤珠宝'");
            // jump to wechat
            let url = "weixin://";
            Wechat.jumpToWechat(url, function(){}, function(){
              this._showMessage("跳转微信失败");
            });
            
          }, (err)=>{
            console.log("Save-Video failed. Caused By : " + err);
            this._showMessage("视频已下载失败");
          });
        }, 
        (err)=>{ console.log("Download-Video failed. Caused By : " + err);});
    }).catch((err) => console.log("Save Video URL: " + this.currentMicroClassVideo.videoSrc + "; Caused by : " + err));
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
      console.log('发送朋友发生错误：'  + reason);
      slf._showMessage('发送朋友发生错误');
    });
  }

  private _shareWXTimeLine() {
    let slf = this;
    Wechat.share({
      message: {
        title: '小视频',
        description: '测试小视频',
        media: {
          type: Wechat.Type.VIDEO,
          videoUrl: this.currentMicroClassVideo.videoSrc
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
        title: '小视频',
        description: '测试小视频',
        media: {
          type: Wechat.Type.VIDEO,
          videoUrl: this.currentMicroClassVideo.videoSrc
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
