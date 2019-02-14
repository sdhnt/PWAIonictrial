import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController, AlertController } from 'ionic-angular';
import firebase from 'firebase';
import { FeedPage } from '../feed/feed';
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

	name: string="";
	email: string="";
	password: string="";

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public alertCtrl: AlertController) {
  }

  signup(){
  	firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
  	(data) 	=> {

  		let newUser: firebase.User = data.user;
  		newUser.updateProfile({
  		displayName: this.name,
  		photoURL: ""
  		}).then( (res) =>{
  		console.log("Profile Updated")
      this.alertCtrl.create({
      title: "Account Created",
      message: "Your account has been created successfully.",
      buttons:[{

      text: "OK",
      handler: () => {
        this.navCtrl.setRoot(FeedPage)//navigate to feeds page
      }//end handler
      }]//end button

      }).present();
      
  		}).catch((err)=>{
  		console.log(err)});
  		
  	}).catch( (err) => {
  		console.log(err)
    this.toastCtrl.create({

    message: err.message,
    duration: 3000
  }).present();


  	});

  }

  goBack(){
  this.navCtrl.pop();
  }

}


