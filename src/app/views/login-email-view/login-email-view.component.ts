import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { NotificationsService } from '../../services/notifications/notifications.service';

@Component({
  selector: 'app-login-email-view',
  templateUrl: './login-email-view.component.html',
  styleUrls: ['./login-email-view.component.scss']
})
export class LoginEmailViewComponent implements OnInit {

  user = {
    email: '',
    password: ''
  };

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    public notifications: NotificationsService
  ) {}

  ngOnInit() {
  }

  loginWithEmailAndPassword() {
    this.afAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password)
      .then( () => this.router.navigate(['/']))
      .catch( error => this.notifications.error(error.message));
  }

}
