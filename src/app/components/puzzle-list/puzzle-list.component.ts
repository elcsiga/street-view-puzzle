import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFirestore} from 'angularfire2/firestore';
import {Puzzle} from '../../types';
import {StreetViewService} from '../../services/street-view/street-view.service';
import {Router} from '@angular/router';
import {CommonService} from '../../services/common/common.service';

@Component({
  selector: 'app-puzzle-list',
  templateUrl: './puzzle-list.component.html',
  styleUrls: ['./puzzle-list.component.scss']
})
export class PuzzleListComponent implements OnInit {

  puzzles: Observable<Puzzle[]>;
  constructor(
    private db: AngularFirestore,
    private streetViewService: StreetViewService,
    private commonService: CommonService,
    private router: Router
  ) {

    this.puzzles = this.db.collection('puzzles').snapshotChanges().map( this.commonService.mapActionsToPuzzles );

  }

  ngOnInit() {
  }

  getStaticImage(puzzle: Puzzle) {
    return this.streetViewService.getStaticImageUrlOf(puzzle.data);
  }

  startPuzzle(puzzle: Puzzle) {
    this.router.navigate(['/play/' + puzzle.id]);
  }
}
