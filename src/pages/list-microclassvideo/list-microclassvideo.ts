import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MicroClassVideo } from '../../models/microclassvideo';
import { MicroclassvideoDetailPage } from '../microclassvideo-detail/microclassvideo-detail';
/**
 * Generated class for the ListMicroclassvideoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-list-microclassvideo',
  templateUrl: 'list-microclassvideo.html',
})
export class ListMicroclassvideoPage {
  currentMicroClassVideos: MicroClassVideo[]; 
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.currentMicroClassVideos = navParams.get('microClassVideos');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListMicroclassvideoPage');
  }

  openMicroClassVideo(microClassVideo) {
    this.navCtrl.push(MicroclassvideoDetailPage, {'MicroClassVideo': microClassVideo});
  }
}
