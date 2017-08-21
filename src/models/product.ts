
export class Product {
    id: number;
    code: string;
    name: string;
    imageName: string;

    constructor(private params?: any) {
        if (params) {
            this.id = params['id'];
            this.code = params['code'] || '';
            this.name = params['name'] || '';
            this.imageName = params['imageName'] || '';
        }
    }
}