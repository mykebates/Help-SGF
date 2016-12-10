import {Component} from '@angular/core';
import {NavController, ViewController, ToastController} from 'ionic-angular';
import { Camera } from 'ionic-native';
import { Data } from '../../providers/data';


@Component({
    selector: 'page-alert-create',
    templateUrl: 'alert-create.html',
    providers: [Data]
})

export class AlertCreatePage {
    public base64Image: string;
    public gathering_tree: boolean;
    public hearts_for_homeless: boolean;
    public gathering_friends: boolean;
    public sgf_police: boolean;
    public homeless_court: boolean;
    public msg: string;

    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public toastCtrl: ToastController, private dataProvider: Data) {
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    sendAlert(){
        this.dataProvider.sendAlert(this.msg, "New Alert Created");
        this.presentToast();
        this.viewCtrl.dismiss();
    }


    presentToast() {
        let toast = this.toastCtrl.create({
            message: 'Your alert has been delivered.',
            duration: 3000,
            position: 'middle'
        });

        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });

        toast.present();
    }

    getPicture(){
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
