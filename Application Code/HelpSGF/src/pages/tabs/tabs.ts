import {Component} from '@angular/core';

import {HomePage} from '../home/home';
import {AboutPage} from '../about/about';
import {AlertsPage} from  '../alerts/alerts'
import {ContactPage} from  '../contact/contact'
import {ResourcePage} from  '../resource/resource'
@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    tab1Root: any = HomePage;
    //tab1Root: any = ResourcePage;
    tab2Root: any = AboutPage;
    tab3Root: any = AlertsPage;
    tab4Root: any = ContactPage;

    constructor() {

    }
}
