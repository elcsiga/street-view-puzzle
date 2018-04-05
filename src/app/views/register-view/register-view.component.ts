import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { NotificationsService } from '../../services/notifications/notifications.service';

@Component({
  selector: 'app-register-view',
  templateUrl: './register-view.component.html',
  styleUrls: ['./register-view.component.scss']
})
export class RegisterViewComponent implements OnInit {

  user = {
    email: '',
    password: ''
  };

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    public notifications: NotificationsService
  ) {
  }

  ngOnInit() {
  }

  registerWithEmailAndPassword() {
    this.afAuth.auth.createUserWithEmailAndPassword(this.user.email, this.user.password)
      .then( () => this.router.navigate(['/']))
      .catch( error => this.notifications.error(error.message));
  }
}
