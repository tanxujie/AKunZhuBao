
export class Agent {
    id: number;
    name: string;
    phoneNumber: string;
    wechatNumber: string;

    constructor(private params?: any) {
        if (params) {
            this.id = params['id'];
            this.name = params['name'] || '';
            this.phoneNumber = params['phoneNumber'] || '';
            this.wechatNumber = params['wechatNumber'] || '';
        }
    }
}