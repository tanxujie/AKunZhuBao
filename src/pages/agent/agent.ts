import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { AgentProvider } from '../../providers/agent/agent';
import { Agent } from '../../models/agent';
/**
 * Generated class for the AgentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-agent',
  templateUrl: 'agent.html',
})
export class AgentPage {

  currentAgents: Agent[] = [];
  condition: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController,  public agentProvider: AgentProvider) {
  }

  ionViewDidLoad() {
  }

  openAgent() {

  }

  search(event:any) {
    let params = {
      supperAgentId: 1,
      condition: this.condition
    };
    this.doSearch(params);
  }

  private doSearch(params?: any) {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: '加载中...',
      dismissOnPageChange: true,
      showBackdrop: true
    });
    loading.present();
    this.agentProvider
      .query(params)
      .subscribe(
        data => { loading.dismiss(); this.resolve(data); }, 
        err => { loading.dismiss(); this.reject(err); });
  }

  private resolve(data) {
    this.currentAgents.length = 0;
    if (data.success) {
      let cnt = data.data.length;
      for (let i = 0; i < cnt; i++) {
        this.currentAgents.push(new Agent(data.data[i]));
      }
    }
  }

  private reject(err) {
    console.log(err);
  }
}