import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Push, PushToken} from '@ionic/cloud-angular';
import { Platform } from 'ionic-angular';
import { Camera } from 'ionic-native';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    public base64Image: string;
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


    cameraTest(){
        Camera.getPicture({
            destinationType: Camera.DestinationType.DATA_URL,
            targetWidth: 600,
            targetHeight: 600,
            allowEdit : false,
            saveToPhotoAlbum : false,
            correctOrientation: true
        }).then((imageData) => {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64:
            this.base64Image = 'data:image/jpeg;base64,' + imageData;
        }, (err) => {
            // Handle error
        });
    }

}
