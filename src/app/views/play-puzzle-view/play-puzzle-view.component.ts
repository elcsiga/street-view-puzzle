import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { Puzzle } from '../../types';
import { switchMap } from 'rxjs/operator/switchMap';

@Component({
  selector: 'app-play-puzzle-view',
  templateUrl: './play-puzzle-view.component.html',
  styleUrls: ['./play-puzzle-view.component.css']
})
export class PlayPuzzleViewComponent implements OnInit, OnDestroy {


  puzzle$: Observable<Puzzle>;
  constructor(
    private route: ActivatedRoute,
    private db: AngularFirestore
  ) { }

  ngOnInit() {
    this.puzzle$ = this.route.params
      .switchMap( params => this.db.doc<Puzzle>(`puzzles/${params.id}`).valueChanges());
  }

  ngOnDestroy(): void {
  }
}
