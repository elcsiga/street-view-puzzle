import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';
import {AppState, User} from '../../app.state';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() menuClicked = new EventEmitter<void>();

  public user$: Observable<User>;

  constructor(
    public store: Store<AppState>,
    public auth: AngularFireAuth,
    public router: Router
  ) {}

  logout() {
    this.auth.auth.signOut();
  }

  ngOnInit() {
    this.user$ =  this.store.select (state => state.user );
  }

}
