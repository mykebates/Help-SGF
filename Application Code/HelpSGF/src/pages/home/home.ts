import {Component} from '@angular/core';
import {NavController, ModalController} from 'ionic-angular';
import {Push, PushToken} from '@ionic/cloud-angular';
import { Platform } from 'ionic-angular';
import {ReportCreatePage} from '../alerts/report-create';
import {AboutPage} from '../about/about';
import {ListPage} from '../resource/list';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    constructor(public navCtrl: NavController, public push: Push, private platform: Platform, public modalCtrl: ModalController) {

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
