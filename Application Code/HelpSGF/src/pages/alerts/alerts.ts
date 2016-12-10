import {Component} from '@angular/core';
import {NavController, ModalController} from 'ionic-angular';
import {AlertCreatePage} from './alert-create';

@Component({
    selector: 'page-alerts',
    templateUrl: 'alerts.html'
})

export class AlertsPage {

    constructor(public navCtrl: NavController, public modalCtrl: ModalController) {
    }

    ionViewDidLoad() {
        console.log('Hello AlertsPage Page');
    }

    showAlertCreateModal() {
        let modal = this.modalCtrl.create(AlertCreatePage);
        modal.present();
    }

}
