
export class Product {
    id: number;
    code: string;
    name: string;
    majorCategoryName: string;
    minorCategoryName: string;
    description: string;
    exFactoryPrice: number;
    favorablePrice: number;
    primaryPrice: number;
    phoneNumber: string;
    wechatNumber: string;
    color: string;
    category: string;
    style: string;
    theme: string;
    priceRangeFrom: number;
    priceRangeTo: number;
    circleRation: string;

    // image src
    imageSrc: string;

    // all product image's srcs
    imageSrcs: string[];

    videoSrc: string;

    constructor(private params?: any) {
        if (params) {
            this.id = params['id'];
            this.code = params['code'] || '';
            this.name = params['name'] || '';
            this.majorCategoryName = params['majorCategoryName']||'';
            this.minorCategoryName = params['minorCategoryName'] || '';
            this.description = params['description'] || '';
            this.exFactoryPrice = params['exFactoryPrice'] || 0;
            this.favorablePrice = params['favorablePrice'] || 0;
            this.primaryPrice = params['primaryPrice'] || 0;
            this.phoneNumber = params['phoneNumber'] || '';
            this.wechatNumber = params['wechatNumber'] || '';
            this.color = params['color'] || '';
            this.category = params['category'] || '';
            this.style = params['style'] || '';
            this.theme = params['theme'] || '';
            this.priceRangeFrom = params['priceRangeFrom'] || 0;
            this.priceRangeTo = params['priceRangeTo'] || 0;
            this.circleRation = params['circleRation'] || '';
            this.imageSrc = params['imageSrc'] || '';
            this.imageSrcs = params['imageSrcs'] || '';
            this.videoSrc = params['videoSrc']||'';
        }
    }
}