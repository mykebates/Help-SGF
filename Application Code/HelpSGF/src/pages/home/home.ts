import {Component} from '@angular/core';
import {NavController, ModalController} from 'ionic-angular';
import {Push, PushToken} from '@ionic/cloud-angular';
import { Platform } from 'ionic-angular';
import {ReportCreatePage} from '../alerts/report-create';
import {AboutPage} from '../about/about';
import {ListPage} from '../resource/list';
import { Data } from '../../providers/data';
import { SearchResultsPage } from '../resource/searchresult';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
    providers: [ Data ]
})
export class HomePage {

    searchText: string;

    constructor(public navCtrl: NavController, public push: Push, private platform: Platform, public modalCtrl: ModalController, private dataProvider: Data) {

        if (platform.is('cordova')) {
            this.push.register().then((t: PushToken) => {
                return this.push.saveToken(t);
            }).then((t: PushToken) => {
                console.log('Token saved:', t.token);
            });

            this.push.rx.notification()
                .subscribe((msg) => {
                    alert(msg.title + ': ' + msg.text);
             });
        }
    }


    submitSearchForm(){

        let self = this;
        this.dataProvider.shelterSearch(this.searchText).then(function(data: any){
            self.navCtrl.push(SearchResultsPage, data.hits.hits);
                console.log(data);
        });
    }

    searchWifi(){
        this.navCtrl.push(AboutPage);
    }


    findShelters(){
        this.navCtrl.push(ListPage);
    }

    showReportCreateModal() {
        let modal = this.modalCtrl.create(ReportCreatePage);
        modal.present();
    }


}
