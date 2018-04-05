import {Routes} from '@angular/router';
import {HomeViewComponent} from './views/home-view/home-view.component';
import {PageNotFoundViewComponent} from './views/page-not-found-view/page-not-found-view.component';
import {LoginViewComponent} from './views/login-view/login-view.component';
import {LoginEmailViewComponent} from './views/login-email-view/login-email-view.component';
import {RegisterViewComponent} from './views/register-view/register-view.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeViewComponent },
  { path: 'login', component: LoginViewComponent },
  { path: 'login/email', component: LoginEmailViewComponent },
  { path: 'register', component: RegisterViewComponent },
  { path: '**', component: PageNotFoundViewComponent }
];
