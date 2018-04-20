import { Action } from '@ngrx/store';

export type User = any;

export interface AppState{
  user: User;
}


const SET_USER = 'SET_USER';

export class SetUserAction implements Action {
  type = SET_USER;
  constructor( public user: User) {}
}

export function userReducer(state: User = null, action: Action) {
  switch (action.type) {
    case SET_USER:
      return (action as SetUserAction).user;
    default:
      return state;
  }
}

export const reducers = {
  user: userReducer
};
