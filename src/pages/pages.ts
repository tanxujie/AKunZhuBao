import { WelcomePage } from './welcome/welcome';
import { TabsPage } from './tabs/tabs';
import { ListProductPage } from './list-product/list-product';
import { ListMicroclassPage } from './list-microclass/list-microclass';
import { MySettingPage } from './my-setting/my-setting';
// The page the user lands on after opening the app and without a session
//export const FirstRunPage = WelcomePage;
export const FirstRunPage = WelcomePage

// The main page the user will see as they use the app over a long period of time.
// Change this if not using tabs
export const MainPage = TabsPage;

// The initial root pages for our tabs (remove if not using tabs)
export const Tab1Root = ListProductPage;
export const Tab2Root = ListMicroclassPage;
export const Tab3Root = MySettingPage;
