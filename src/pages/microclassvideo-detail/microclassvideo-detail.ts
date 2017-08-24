import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

//declare let Wechat: any;

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.currentVideoSrc = navParams.get('VideoSrc');
  }

  ionViewDidLoad() {
    console.log('Loading Video : ' + this.currentVideoSrc);
  }
}
