import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgentPage } from './agent';

@NgModule({
  declarations: [
    AgentPage,
  ],
  imports: [
    IonicPageModule.forChild(AgentPage),
  ],
})
export class AgentPageModule {}
