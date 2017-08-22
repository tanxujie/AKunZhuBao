import { Product } from './product';

export class ProductPair {

    left: Product;
    right: Product;
    hasLeft: boolean;
    hasRight: boolean;

    constructor(private params: any) {
        this.left = new Product(params['left']);
        this.right = new Product(params['right'])
        this.hasLeft = params['hasLeft'];
        this.hasRight = params['hasRight'];
    }
}