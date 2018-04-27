import { Injectable } from '@angular/core';
import {AppState, User} from '../../app.state';
import {Store} from '@ngrx/store';
import {Puzzle, PuzzleData} from '../../types';
import * as firebase from 'firebase';
import {DocumentChangeAction} from 'angularfire2/firestore/interfaces';

@Injectable()
export class CommonService {

  constructor(private store: Store<AppState>) { }

  getUserId(): string {
    let user: User;
    this.store.select( state => state.user).take(1)
      .subscribe( u => user = u);
    return user ? user.uid : null;
  }

  mapActionsToPuzzles = (actions: DocumentChangeAction[]): Puzzle[] => {
    return actions.map( this.mapActionToPuzzle);
  };

  mapActionToPuzzle( action: DocumentChangeAction): Puzzle {
    const data = action.payload.doc.data() as PuzzleData;
    const id = action.payload.doc.id;
    return { id, data };
  }
}
