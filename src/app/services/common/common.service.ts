import { Injectable } from '@angular/core';
import {AppState, User} from '../../app.state';
import {Store} from '@ngrx/store';

@Injectable()
export class CommonService {

  constructor(private store: Store<AppState>) { }

  getUserId(): string {
    let user: User;
    this.store.select( state => state.user).take(1)
      .subscribe( u => user = u );
    return user ? user.uid : null;
  }

}
