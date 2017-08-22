import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

declare let Wechat: any;

/**
 * Generated class for the MicroclassvideoDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-microclassvideo-detail',
  templateUrl: 'microclassvideo-detail.html',
})
export class MicroclassvideoDetailPage {

  currentVideoSrc: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.currentVideoSrc = navParams.get('VideoSrc');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MicroclassvideoDetailPage');
  }

  shareWxSession() {
    /*Wechat.isInstalled(function (installed) {
      alert("Wechat installed: " + (installed ? "Yes" : "No"));
    }, function (reason) {
      alert("Failed: " + reason);
    });*/

    Wechat.share({
      message: {
        title: "Video",
        description: '',
        media: {
          type: Wechat.Type.VIDEO,
          video: this.currentVideoSrc
        }
      },
      scene: Wechat.Scene.SESSION   // share to Session
    }, function () {
      alert("Success");
    }, function (reason) {
      alert("Share Session Failed: " + reason);
    });
  }

  shareWxTimeLine() {
    /*Wechat.isInstalled(function (installed) {
      alert("Wechat installed: " + (installed ? "Yes" : "No"));
    }, function (reason) {
      alert("Failed: " + reason);
    });*/

    Wechat.share({
      message: {
        title: '',
        description: '',
        media: {
          type: Wechat.Type.VIDEO,
          video: this.currentVideoSrc
        }
      },
      scene: Wechat.Scene.TIMELINE   // share to Timeline
    }, function () {
      alert("Success");
    }, function (reason) {
      alert("Share " + this.item.imageName + " Failed: " + reason);
    });
  }
}
