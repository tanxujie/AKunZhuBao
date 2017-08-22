
export class MicroClassVideo {
    title: string;
    description: string;
    videoSrc: string;

    constructor(private params? : any) {
        if (params) {
            this.title = params['title'];
            this.description = params['description'];
            this.videoSrc = params['videoSrc'];
        }
    }
}