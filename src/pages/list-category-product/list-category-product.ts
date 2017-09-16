import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { Product } from '../../models/product';
import { ProductPair } from '../../models/productpair';
import { ProductDetailPage } from '../product-detail/product-detail';
import { ProductProvider } from '../../providers/product/product';
import { ListCategoryPage } from '../list-category/list-category';
/**
 * Generated class for the ListCategoryProductPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-list-category-product',
  templateUrl: 'list-category-product.html',
})
export class ListCategoryProductPage {
  currentProducts: ProductPair[] = [];
  page: number = 0;
  orderBy: string = '';
  orderDirection: string = '';
  subOrderBy: string = '';
  majorCategoryId: number = 0;
  minorCategoryId: number = 0;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public loadingCtrl: LoadingController, 
              public pdProvider: ProductProvider) {
    this.majorCategoryId = navParams.get('majorCategoryId');
    this.minorCategoryId = navParams.get('minorCategoryId');
    this.subOrderBy = 'default';
    this.page = 0;
    this.doSearch();
  }

  ionViewDidLoad() {
  }

  openDetail(pd: Product) {
    this.navCtrl.push(ProductDetailPage, { product: pd });
  }

  doRefresh(refresher) {
    let p: any = {
      majorCategoryId: this.majorCategoryId,
      minorCategoryId: this.minorCategoryId,
      orderBy: this.orderBy,
      orderDirection: this.orderDirection
    };
    this.pdProvider.query(p).subscribe(
      data => { refresher.complete();this.resolve(data);}, 
      err => { refresher.complete();this.reject(err);});
  }

  doInfinite(infiniteScroll) {
    let p: any = {
      majorCategoryId: this.majorCategoryId,
      minorCategoryId: this.minorCategoryId,
      orderBy: this.orderBy,
      orderDirection: this.orderDirection,
      page: this.page + 1
    };
    this.pdProvider.query(p).subscribe(
      data => { infiniteScroll.complete();this.resolveInfiniteScroll(data);}, 
      err => { infiniteScroll.complete();this.reject(err);});
  }

  selectDefault() {
    this.orderBy = 'created_time';
    this.orderDirection = 'DESC';
    this.doSearch();
  }

  selectPrice() {
    this.orderBy = 'ex_factory_price';
    if (this.orderDirection == '' || this.orderDirection == 'DESC') {
      this.orderDirection = 'ASC';
    } else {
      this.orderDirection = 'DESC';
    }
    this.doSearch();
  }

  selectPopularity() {
    this.orderBy = '';
    if (this.orderDirection == '' || this.orderDirection == 'DESC') {
      this.orderDirection = 'ASC';
    } else {
      this.orderDirection = 'DESC';
    }
    this.doSearch();
  }

  selectPriceRange() {
    this.orderBy = 'price_range_from';
    if (this.orderDirection == '' || this.orderDirection == 'DESC') {
      this.orderDirection = 'ASC';
    } else {
      this.orderDirection = 'DESC';
    }
    this.doSearch();
  }
  
  showcategory() {
    this.navCtrl.push(ListCategoryPage);
  }

  private doSearch() {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: '加载中...',
      dismissOnPageChange: true,
      showBackdrop: true
    });
    loading.present();
    let params: any = {
      orderBy: this.orderBy,
      orderDirection: this.orderDirection,
      majorCategoryId: this.majorCategoryId,
      minorCategoryId: this.minorCategoryId
    };
    
    this.pdProvider
      .query(params)
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