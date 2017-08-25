import { Component } from '@angular/core';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media';
import { NavController, NavParams } from 'ionic-angular';

//declare let Wechat: any;
//declare let streamingMedia: any;
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private streamingMedia: StreamingMedia) {
    this.currentVideoSrc = navParams.get('VideoSrc');
    /*let options: StreamingVideoOptions = {
      successCallback: () => { console.log('Video played') },
      errorCallback: (e) => { console.log('Error streaming'+ e) },
      orientation: 'landscape'
    };
    streamingMedia.playVideo(this.currentVideoSrc, options);*/
  }

  ionViewDidLoad() {
    console.log('Loading Video : ' + this.currentVideoSrc);
  }
}
