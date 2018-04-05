import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';
import * as firebase from 'firebase/app';
import {NotificationsService} from '../../services/notifications/notifications.service';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent implements OnInit {

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    public notifications: NotificationsService
  ) {}

  loginWithGoogle() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then( () => this.router.navigate(['/']))
      .catch( error => this.notifications.error(error.message));
  }
  loginWithFacebook() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then( () => this.router.navigate(['/']))
      .catch( error => this.notifications.error(error.message));
  }

  ngOnInit() {
  }

}
