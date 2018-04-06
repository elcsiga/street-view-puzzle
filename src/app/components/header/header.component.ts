import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Router} from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() menuClicked = new EventEmitter<void>();

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router
  ) {}

  logout() {
    this.afAuth.auth.signOut();
  }

  ngOnInit() {
  }

}
