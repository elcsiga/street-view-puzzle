import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import {ExtendedStreetViewPanoramaOptions, Puzzle, PuzzleData, Solving} from '../../types';
import { googleMapsApiKey } from '../../../environments/config';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/distinctUntilChanged';

import {MatDialog} from '@angular/material';
import {SolveDialogComponent} from './solve-dialog/solve-dialog.component';
import {CommonService} from '../../services/common/common.service';
import {AppState} from '../../app.state';
import {Store} from '@ngrx/store';


interface PlayPuzzleViewModel {
  puzzle: Puzzle;
  solvings: Solving[];
}

@Component({
  selector: 'app-play-puzzle-view',
  templateUrl: './play-puzzle-view.component.html',
  styleUrls: ['./play-puzzle-view.component.scss']
})
export class PlayPuzzleViewComponent implements OnInit, OnDestroy {

  model$: Observable<PlayPuzzleViewModel>;
  panoramaOptions: ExtendedStreetViewPanoramaOptions;
  apiKey = googleMapsApiKey;

  constructor(
    private route: ActivatedRoute,
    private db: AngularFirestore,
    public dialog: MatDialog,
    private commonService: CommonService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.model$ = Observable.combineLatest(
      this.route.params,
      this.store.select( state => state.user)
    )
      .map(results => {
        const [params, user] = results;
        return {
          id: params.id,
          userId: user ? user.uid : null
        };
      })

      .switchMap( params => Observable.combineLatest(
        this.db.doc<PuzzleData>(`puzzles/${params.id}`).valueChanges()
          .map(data => ({id: params.id, data})),
        this.db.collection<Solving>('solvings', ref => ref
          .where('userId', '==', params.userId)
          .where('puzzleId', '==', params.id)
        ).valueChanges()
      ))
      .map(results => {
        const [puzzle, solvings] = results;
        return {
          puzzle,
          solvings
        };
      });

    this.model$.take(1)
      .map( model => model.puzzle.data.pos)
      .subscribe( pos => {
      this.panoramaOptions = {
        position: {
          lat: pos.lat,
          lng: pos.lng,
        },
        pov: {
          heading: pos.heading,
          pitch: pos.pitch,
        },
        disableDefaultUI: true,
        showRoadLabels: false
      };
    });
  }

  openDialog(puzzle: Puzzle): void {
    const dialogRef = this.dialog.open(SolveDialogComponent, {
      width: '250px',
      data: puzzle
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  ngOnDestroy(): void {
  }
}


