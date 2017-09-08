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
  page: number = 0;
  condition: string = '';

  newProduct: boolean = false; // default is true
  handOn: boolean = false;
  waterDrop: boolean = false;
  nothingCards: boolean = false;
  products108: boolean = false;
  engraving: boolean = false;

  orderBy: string = '';
  orderDirection: string = '';

  subCondition: string = '';
  subOrderBy: string = '';


  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public loadingCtrl: LoadingController, 
              public pdProvider: ProductProvider) {
    this.subCondition = 'newProduct';
    this.newProduct = true;
    this.subOrderBy = 'default';
    this.page = 0;
    this.condition = '';
    this.doSearch();
  }

  ionViewDidLoad() {
  }

  search(ent: any) {
    this.doSearch({condition : this.condition });
  }

  openDetail(pd: Product) {
    this.navCtrl.push(ProductDetailPage, { product: pd });
  }

  doRefresh(refresher) {
    let p: any = {
      newProduct: this.newProduct,
      handOn: this.handOn,
      waterDrop: this.waterDrop,
      nothingCards: this.nothingCards,
      products108: this.products108,
      engraving: this.engraving,
      orderBy: this.orderBy,
      orderDirection: this.orderDirection
    };
    this.pdProvider.query(p).subscribe(
      data => { refresher.complete();this.resolve(data);}, 
      err => { refresher.complete();this.reject(err);});
  }

  doInfinite(infiniteScroll) {
    let p: any = {
      newProduct: this.newProduct,
      handOn: this.handOn,
      waterDrop: this.waterDrop,
      nothingCards: this.nothingCards,
      products108: this.products108,
      engraving: this.engraving,
      orderBy: this.orderBy,
      orderDirection: this.orderDirection,
      page: this.page + 1
    };
    this.pdProvider.query(p).subscribe(
      data => { infiniteScroll.complete();this.resolveInfiniteScroll(data);}, 
      err => { infiniteScroll.complete();this.reject(err);});
  }

  selectNewProduct() {
    this.newProduct = true;
    this.handOn = false;
    this.waterDrop = false;
    this.nothingCards = false;
    this.products108 = false;
    this.engraving = false;
    this.doSearch({condition : this.condition });
  }

  selectHandOn() {
    this.newProduct = false;
    this.handOn = true;
    this.waterDrop = false;
    this.nothingCards = false;
    this.products108 = false;
    this.engraving = false;
    this.doSearch({condition : this.condition });
  }

  selectWaterDrop() {
    this.newProduct = false;
    this.handOn = false;
    this.waterDrop = true;
    this.nothingCards = false;
    this.products108 = false;
    this.engraving = false;
    this.doSearch({condition : this.condition });
  }

  selectNothingCards() {
    this.newProduct = false;
    this.handOn = false;
    this.waterDrop = false;
    this.nothingCards = true;
    this.products108 = false;
    this.engraving = false;
    this.doSearch({condition : this.condition });
  }

  select108Product() {
    this.newProduct = false;
    this.handOn = false;
    this.waterDrop = false;
    this.nothingCards = false;
    this.products108 = true;
    this.engraving = false;
    this.doSearch({condition : this.condition });
  }

  selectEngraving() {
    this.newProduct = false;
    this.handOn = false;
    this.waterDrop = false;
    this.nothingCards = false;
    this.products108 = false;
    this.engraving = true;
    this.doSearch({condition : this.condition });
  }

  selectDefault() {
    this.orderBy = 'created_time';
    this.orderDirection = 'DESC';
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

  selectPriceRange() {
    this.orderBy = 'price_range_from';
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
      content: '加载中...',
      dismissOnPageChange: true,
      showBackdrop: true
    });
    loading.present();
    let p: any = {
      newProduct: this.newProduct,
      handOn: this.handOn,
      waterDrop: this.waterDrop,
      nothingCards: this.nothingCards,
      products108: this.products108,
      engraving: this.engraving,
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

  private resolveInfiniteScroll(data) {
    if (data.success) {
      this.page++;
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