import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { firebaseConfig } from '../environments/config';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { PuzzleListComponent } from './components/puzzle-list/puzzle-list.component';
import { HeaderComponent } from './components/header/header.component';
import { StreetviewPanoramaComponent } from './components/streetview-panorama/streetview-panorama.component';
import { StreetViewService } from './services/street-view/street-view.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LevenshteinService } from './services/levenshtein/levenshtein.service';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatIconModule,
  MatMenuModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule, MatStepperModule, MatProgressSpinnerModule, MatSidenavModule, MatListModule, MatCardModule, MatChipsModule,
  MatTooltipModule, MatDialogModule,
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { LoginViewComponent } from './views/login-view/login-view.component';
import { CreatePuzzleViewComponent } from './views/create-puzzle-view/create-puzzle-view.component';
import { PageNotFoundViewComponent } from './views/page-not-found-view/page-not-found-view.component';
import { PlayPuzzleViewComponent } from './views/play-puzzle-view/play-puzzle-view.component';
import { HomeViewComponent } from './views/home-view/home-view.component';
import { routes } from './app.routes';
import { FormsModule } from '@angular/forms';
import { LoginEmailViewComponent } from './views/login-email-view/login-email-view.component';
import { RegisterViewComponent } from './views/register-view/register-view.component';
import { NotificationsService } from './services/notifications/notifications.service';
import { SolveDialogComponent } from './views/play-puzzle-view/solve-dialog/solve-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    PuzzleListComponent,
    HeaderComponent,
    StreetviewPanoramaComponent,
    LoginViewComponent,
    CreatePuzzleViewComponent,
    PageNotFoundViewComponent,
    PlayPuzzleViewComponent,
    HomeViewComponent,
    LoginEmailViewComponent,
    RegisterViewComponent,
    SolveDialogComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig, 'street-view-puzzle'),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    BrowserAnimationsModule,

    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatChipsModule,
    MatTooltipModule,
    MatDialogModule,

    RouterModule.forRoot(routes),
    FormsModule
  ],
  entryComponents: [
    SolveDialogComponent
  ],
  providers: [
    StreetViewService,
    LevenshteinService,
    NotificationsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
