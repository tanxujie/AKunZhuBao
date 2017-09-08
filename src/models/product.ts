
export class Product {
    id: number;
    code: string;
    name: string;
    majorCategoryName: string;
    minorCategoryName: string;
    description: string;
    exFactoryPrice: string;
    favorablePrice: string;
    primaryPrice: string;
    phoneNumber: string;
    wechatNumber: string;
    color: string;
    category: string;
    style: string;
    theme: string;
    priceRangeFrom: string;
    priceRangeTo: string;
    circleRation: string;

    // image src
    imageSrc: string;

    // all product image's srcs
    imageSrcs: string[];

    hasVideo: boolean;
    videoSrc: string;

    constructor(private params?: any) {
        if (params) {
            this.id = params['id'];
            this.code = params['code'] || '';
            this.name = params['name'] || '';
            this.majorCategoryName = params['majorCategoryName']||'';
            this.minorCategoryName = params['minorCategoryName'] || '';
            this.description = params['description'] || '';
            this.exFactoryPrice = params['exFactoryPriceStr'] || '';
            this.favorablePrice = params['favorablePriceStr'] || '';
            this.primaryPrice = params['primaryPriceStr'] || '';
            this.phoneNumber = params['phoneNumber'] || '';
            this.wechatNumber = params['wechatNumber'] || '';
            this.color = params['color'] || '';
            this.category = params['category'] || '';
            this.style = params['style'] || '';
            this.theme = params['theme'] || '';
            this.priceRangeFrom = params['priceRangeFromStr'] || '';
            this.priceRangeTo = params['priceRangeToStr'] || '';
            this.circleRation = params['circleRation'] || '';
            this.imageSrc = params['imageSrc'] || '';
            this.imageSrcs = params['imageSrcs'] || '';
            this.hasVideo = params['hasVideo'];
            this.videoSrc = params['videoSrc']||'';
        }
    }
}