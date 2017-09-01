import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { PhotoLibrary } from '@ionic-native/photo-library';

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

  currentVideoSrc: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public photoLibrary: PhotoLibrary, public alertController: AlertController) {
    this.currentVideoSrc = navParams.get('VideoSrc');
  }

  ionViewDidLoad() {
    console.log('Loading Video : ' + this.currentVideoSrc);
  }

  public saveVideo() {
    this.photoLibrary.requestAuthorization().then(() => {
      this.photoLibrary.saveVideo(this.currentVideoSrc, '视频');
    }).catch(err => console.log(err));
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
        title: '小视频',
        description: '测试小视频',
        media: {
          type: Wechat.Type.VIDEO,
          videoUrl: this.currentVideoSrc
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
          videoUrl: this.currentVideoSrc
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
