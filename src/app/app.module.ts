import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage, IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
// product
import { ListProductPage } from '../pages/list-product/list-product';
import { ProductDetailPage } from '../pages/product-detail/product-detail';
// microclass & microclassvideo
import { ListMicroclassPage } from '../pages/list-microclass/list-microclass';
import { ListMicroclassvideoPage } from '../pages/list-microclassvideo/list-microclassvideo';
import { MicroclassvideoDetailPage } from '../pages/microclassvideo-detail/microclassvideo-detail';
// category & product by category
import { ListCategoryPage } from '../pages/list-category/list-category';
import { ListCategoryProductPage } from '../pages/list-category-product/list-category-product';
// my setting
import { MySettingPage } from '../pages/my-setting/my-setting';
import { SelfInformationPage } from '../pages/self-information/self-information'
import { AgentPage } from '../pages/agent/agent'
import { KunFriendsPage } from '../pages/kun-friends/kun-friends'
import { CompanyInfoPage } from '../pages/company-info/company-info'
import { AboutPage } from '../pages/about/about'
import { SelfSettingsPage } from '../pages/self-settings/self-settings'
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { TabsPage } from '../pages/tabs/tabs';
import { WelcomePage } from '../pages/welcome/welcome';

import { Api } from '../providers/api';
//import { Items } from '../mocks/providers/items';
//import { Items } from '../providers/items';
import { Settings } from '../providers/settings';
//import { User } from '../providers/user';

import { Camera } from '@ionic-native/camera';
import { GoogleMaps } from '@ionic-native/google-maps';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { StreamingMedia } from '@ionic-native/streaming-media';
import { CallNumber } from '@ionic-native/call-number';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ProductProvider } from '../providers/product/product';
import { MicroClassProvider } from '../providers/micro-class/micro-class';

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function provideSettings(storage: Storage) {
  /**
   * The Settings provider takes a set of default settings for your app.
   *
   * You can add new settings options at any time. Once the settings are saved,
   * these values will not overwrite the saved values (this can be done manually if desired).
   */
  return new Settings(storage, {
    option1: true,
    option2: 'Ionitron J. Framework',
    option3: '3',
    option4: 'Hello'
  });
}

@NgModule({
  declarations: [
    MyApp,
    ListProductPage,
    ProductDetailPage,
    ListMicroclassPage,
    ListMicroclassvideoPage,
    MicroclassvideoDetailPage,
    ListCategoryPage,
    ListCategoryProductPage,
    MySettingPage,
    SelfInformationPage,
    AgentPage,
    KunFriendsPage,
    CompanyInfoPage,
    AboutPage,
    SelfSettingsPage,
    LoginPage,
    SignupPage,
    TabsPage,
    WelcomePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    }),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListProductPage,
    ProductDetailPage,
    ListMicroclassPage,
    ListMicroclassvideoPage,
    MicroclassvideoDetailPage,
    ListCategoryPage,
    ListCategoryProductPage,
    MySettingPage,
    SelfInformationPage,
    AgentPage,
    KunFriendsPage,
    CompanyInfoPage,
    AboutPage,
    SelfSettingsPage,
    LoginPage,
    SignupPage,
    TabsPage,
    WelcomePage
  ],
  providers: [
    Api,
    Camera,
    GoogleMaps,
    SplashScreen,
    StatusBar,
    StreamingMedia,
    CallNumber,
    PhotoLibrary,
    File,
    FileTransfer,
    { provide: Settings, useFactory: provideSettings, deps: [Storage] },
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ProductProvider,
    MicroClassProvider
  ]
})
export class AppModule { }
