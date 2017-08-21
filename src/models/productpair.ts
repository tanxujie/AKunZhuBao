import { Product } from './product';

export class ProductPair {

    left: Product;
    right: Product;

    constructor(private params: any) {
        this.left = new Product(params['left']);
        this.right = new Product(params['right'])
    }
}