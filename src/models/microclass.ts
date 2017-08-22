import { MicroClassVideo } from './microclassvideo';

export class MicroClass {

    title: string;
    description: string;
    microClassVideos: MicroClassVideo[] = [];

    constructor(private params?: any) {
        if (params) {
            this.title = params['title'];
            this.description = params['description'];
            let mcvLst = params['microClassVideos'];
            if (mcvLst && mcvLst.length) {
                for (let mcv of mcvLst) {
                    this.microClassVideos.push(new MicroClassVideo(mcv));
                }
            }
        }
    }
}