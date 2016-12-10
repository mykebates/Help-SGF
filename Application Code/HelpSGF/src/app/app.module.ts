import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {AboutPage} from '../pages/about/about';
import {ContactPage} from '../pages/contact/contact';
import {HomePage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';
import {AlertsPage} from '../pages/alerts/alerts';
import {AlertCreatePage} from '../pages/alerts/alert-create';
import {ReportCreatePage} from '../pages/alerts/report-create';
import {ResourcePage} from  '../pages/resource/resource'
import {ListPage} from  '../pages/resource/list'
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

const cloudSettings: CloudSettings = {
    'core': {
        'app_id': '8af7b9cd'
    },
    'push': {
        'pluginConfig': {
            'ios': {
                'badge': true,
                'sound': true
            },
        }
    }
};


@NgModule({
    declarations: [
        MyApp,
        AboutPage,
        ContactPage,
        HomePage,
        TabsPage,
        AlertsPage,
        AlertCreatePage,
        ReportCreatePage,
        ResourcePage,
        ListPage
    ],
    imports: [
        IonicModule.forRoot(MyApp),
        CloudModule.forRoot(cloudSettings)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        AboutPage,
        ContactPage,
        HomePage,
        TabsPage,
        AlertsPage,
        AlertCreatePage,
        ReportCreatePage,
        ResourcePage,
        ListPage
    ],
    providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {

}
