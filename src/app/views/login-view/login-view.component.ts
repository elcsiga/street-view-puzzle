import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";
import {Router} from "@angular/router";
import * as firebase from "firebase/app";

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent implements OnInit {

  model: any = {};

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router
  ) {}

  loginWithGoogle() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then( () => this.router.navigate(['/']))
      .catch( error => alert(error.message));
  }
  loginWithFacebook() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then( () => this.router.navigate(['/']))
      .catch( error => alert(error.message));
  }

  loginWithEmailAndPassword() {
    firebase.auth().createUserWithEmailAndPassword(this.model.email, this.model.password)
      .then( () => this.router.navigate(['/']))
      .catch( error => alert(error.message));
  }

  ngOnInit() {
  }

}
