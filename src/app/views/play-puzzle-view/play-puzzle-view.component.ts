import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { extendedStreetViewPanoramaOptions, Puzzle } from '../../types';
import { googleMapsApiKey } from '../../../environments/config';
import 'rxjs/add/operator/take';
import {MatDialog} from '@angular/material';
import {SolveDialogComponent} from './solve-dialog/solve-dialog.component';

@Component({
  selector: 'app-play-puzzle-view',
  templateUrl: './play-puzzle-view.component.html',
  styleUrls: ['./play-puzzle-view.component.scss']
})
export class PlayPuzzleViewComponent implements OnInit, OnDestroy {

  puzzle$: Observable<Puzzle>;
  panoramaOptions: extendedStreetViewPanoramaOptions;
  apiKey = googleMapsApiKey;

  constructor(
    private route: ActivatedRoute,
    private db: AngularFirestore,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.puzzle$ = this.route.params
      .switchMap( params => this.db.doc<Puzzle>(`puzzles/${params.id}`).valueChanges());
    this.puzzle$.take(1).subscribe( puzzle => {
      this.panoramaOptions = {
        position: {
          lat: puzzle.pos.lat,
          lng: puzzle.pos.lng,
        },
        pov: {
          heading: puzzle.pos.heading,
          pitch: puzzle.pos.pitch,
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
      console.log('The dialog was closed', result);
    });
  }

  ngOnDestroy(): void {
  }
}


