import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MicroClass } from '../../models/microclass';
import { MicroClassVideo } from '../../models/microclassvideo';
import { MicroClassProvider } from '../../providers/micro-class/micro-class';
import { ListMicroclassvideoPage } from '../list-microclassvideo/list-microclassvideo';
/**
 * Generated class for the ListMicroclassPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-list-microclass',
  templateUrl: 'list-microclass.html',
})
export class ListMicroclassPage {

  currentMicroclasses: MicroClass[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public mcProvider: MicroClassProvider) {
    this.mcProvider.query().subscribe(data => this.resolve(data), err => this.reject(err));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListMicroclassPage');
  }

  openMicroClass(microClassVideos) {
    this.navCtrl.push(ListMicroclassvideoPage, { microClassVideos : microClassVideos});
  }

  private resolve(data) {
    this.currentMicroclasses.length = 0;
    if (data && data.success) {
      let ds = data.data;
      for (let d of ds) {
        this.currentMicroclasses.push(new MicroClass(d));
      }
    }
  }

  private reject(err) {
    console.log(err);
  }
}
