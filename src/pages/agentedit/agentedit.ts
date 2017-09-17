import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AgentProvider } from '../../providers/agent/agent';
import { AgentPage } from '../agent/agent';
import { Settings } from '../../providers/settings';
/**
 * Generated class for the AgenteditPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-agentedit',
  templateUrl: 'agentedit.html',
})
export class AgenteditPage {

  accountId: number;
  phoneNumber: string;
  wechatNumber: string;
  name: string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public agentProvider: AgentProvider,
              public settings: Settings,
            public alertController: AlertController) {
    let accountInfo = this.settings.getValue("LOGIN_ACCOUNT");
    if (accountInfo) {
      this.accountId = accountInfo.id;
    }
  }

  ionViewDidLoad() {
  }

  public saveAgent() {
    let params = {
      superAgentId: this.accountId,
      phoneNumber: this.phoneNumber,
      wechatNumber: this.wechatNumber,
      name: this.name
    };
    this.agentProvider.save(params).subscribe((resp)=>{
      if (resp) {
        this._showMessage(resp.data);
        /*if (!!resp.success) {
          this.navCtrl.pop();
        }*/
      }
    }, err=>console.log(err));
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