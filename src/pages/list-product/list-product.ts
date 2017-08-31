import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { Product } from '../../models/product';
import { ProductPair } from '../../models/productpair';
import { ProductDetailPage } from '../product-detail/product-detail';
import { ProductProvider } from '../../providers/product/product';
/**
 * Generated class for the ListProductPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-list-product',
  templateUrl: 'list-product.html',
})
export class ListProductPage {

  currentProducts: ProductPair[] = [];
  currentPage: number = 1;
  condition: string = '';
  newProduct: boolean = false; // default is true
  byExpert: boolean = false;
  recommended: boolean = false;
  usingEmerald: boolean = false;
  handmade: boolean = false;

  orderBy: string = '';
  orderDirection: string = '';

  subCondition: string = '';
  subOrderBy: string = '';


  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public loadingCtrl: LoadingController, 
              public pdProvider: ProductProvider) {
    this.subCondition = 'newProduct';
    this.subOrderBy = 'default';
    this.condition = '';
    this.doSearch();
  }

  ionViewDidLoad() {
  }

  search(ent: any) {
    this.condition = ent.target.value || '';
    this.doSearch({condition : this.condition });
  }

  openDetail(pd: Product) {
    this.navCtrl.push(ProductDetailPage, { product: pd });
  }

  doRefresh(refresher) {
    this.pdProvider.query({page: this.currentPage}).subscribe(
      data => { refresher.complete();this.resolveRefresh(data);}, 
      err => { refresher.complete();this.reject(err);});
  }

  selectNewProduct() {
    this.newProduct = true;
    this.byExpert = false;
    this.recommended = false;
    this.usingEmerald = false;
    this.handmade = false;
    this.doSearch({condition : this.condition });
  }

  selectByExpert() {
    this.newProduct = false;
    this.byExpert = true;
    this.recommended = false;
    this.usingEmerald = false;
    this.handmade = false;
    this.doSearch({condition : this.condition });
  }

  selectRecommended() {
    this.newProduct = false;
    this.byExpert = false;
    this.recommended = true;
    this.usingEmerald = false;
    this.handmade = false;
    this.doSearch({condition : this.condition });
  }

  selectUsingEmerald() {
    this.newProduct = false;
    this.byExpert = false;
    this.recommended = false;
    this.usingEmerald = true;
    this.handmade = false;
    this.doSearch({condition : this.condition });
  }

  selectHandmade() {
    this.newProduct = false;
    this.byExpert = false;
    this.recommended = false;
    this.usingEmerald = false;
    this.handmade = true;
    this.doSearch({condition : this.condition });
  }

  selectDefault() {
    this.orderBy = '';
    this.orderDirection = '';
    this.doSearch({condition : this.condition });
  }

  selectPrice() {
    this.orderBy = 'ex_factory_price';
    if (this.orderDirection == '' || this.orderDirection == 'DESC') {
      this.orderDirection = 'ASC';
    } else {
      this.orderDirection = 'DESC';
    }
    this.doSearch({condition : this.condition });
  }

  selectPopularity() {
    this.orderBy = '';
    if (this.orderDirection == '' || this.orderDirection == 'DESC') {
      this.orderDirection = 'ASC';
    } else {
      this.orderDirection = 'DESC';
    }
    this.doSearch({condition : this.condition });
  }

  private doSearch(params?: any) {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: '查询中...',
      dismissOnPageChange: true,
      showBackdrop: true
    });
    loading.present();
    let p: any = {
      newProduct: this.newProduct,
      byExpert: this.byExpert,
      recommended: this.recommended,
      usingEmerald: this.usingEmerald,
      handmade: this.handmade,
      orderBy: this.orderBy,
      orderDirection: this.orderDirection
    };
    if (params) {
      for(let k in params) {
        p[k] = params[k];
      }
    }
    this.pdProvider
      .query(p)
      .subscribe(
        data => { loading.dismiss(); this.resolve(data); }, 
        err => { loading.dismiss(); this.reject(err); });
  }

  private resolve(data) {
    this.currentProducts.length = 0;
    if (data.success) {
      let cnt = data.data.length;
      for (let i = 0; i < cnt; i++) {
        this.currentProducts.push(new ProductPair(data.data[i]));
      }
    }
  }

  private resolveRefresh(data) {
    if (data.success) {
      let cnt = data.data.length;
      for (let i = 0; i < cnt; i++) {
        this.currentProducts.push(new ProductPair(data.data[i]));
      }
    }
  }

  private reject(err) {
    console.log(err);
  }
}