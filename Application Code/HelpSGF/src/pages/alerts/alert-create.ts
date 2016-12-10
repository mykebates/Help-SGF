import {Component} from '@angular/core';
import {NavController, ViewController} from 'ionic-angular';

@Component({
    selector: 'page-alert-create',
    templateUrl: 'alert-create.html'
})

export class AlertCreatePage {

    constructor(public navCtrl: NavController, public viewCtrl: ViewController) {
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}
