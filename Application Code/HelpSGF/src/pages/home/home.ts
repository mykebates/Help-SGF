import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Push, PushToken} from '@ionic/cloud-angular';
import { Platform } from 'ionic-angular';


@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    constructor(public navCtrl: NavController, public push: Push, private platform: Platform) {

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




}
