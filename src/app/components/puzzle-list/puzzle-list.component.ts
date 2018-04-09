import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {AngularFirestore} from "angularfire2/firestore";
import {Puzzle} from "../../types";
import {StreetViewService} from '../../services/street-view/street-view.service';

@Component({
  selector: 'app-puzzle-list',
  templateUrl: './puzzle-list.component.html',
  styleUrls: ['./puzzle-list.component.scss']
})
export class PuzzleListComponent implements OnInit {

  puzzles: Observable<Puzzle[]>;
  constructor(
    db: AngularFirestore,
    private streetViewService: StreetViewService
  ) {
    this.puzzles = db.collection('puzzles').valueChanges() as Observable<Puzzle[]>;
  }

  ngOnInit() {
  }

  getStaticImage(puzzle: Puzzle) {
    return this.streetViewService.getStaticImageUrlOf(puzzle);
  }

}
