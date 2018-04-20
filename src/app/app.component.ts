import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {routerTransition} from './app.router.animations';
import * as firebase from 'firebase';
import {AngularFireAuth} from 'angularfire2/auth';
import {Subscription} from 'rxjs/Subscription';
import {AppState, SetUserAction} from './app.state';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [ routerTransition ],
})
export class AppComponent implements OnInit, OnDestroy {
  private userSubscription: Subscription;

  constructor(
    private auth: AngularFireAuth,
    private store: Store<AppState>
  ) {
  }

  ngOnInit() {
    this.userSubscription = this.auth.authState.subscribe(
      authState => this.store.dispatch( new SetUserAction( authState ))
    );
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  getState(outlet) {
    return 'same';
  }
}
