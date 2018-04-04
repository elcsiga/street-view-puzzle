import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {AngularFirestore} from "angularfire2/firestore";
import {Puzzle} from "../../types";

@Component({
  selector: 'app-puzzle-list',
  templateUrl: './puzzle-list.component.html',
  styleUrls: ['./puzzle-list.component.css']
})
export class PuzzleListComponent implements OnInit {

  puzzles: Observable<Puzzle[]>;
  constructor(db: AngularFirestore) {
    this.puzzles = db.collection('puzzles').valueChanges() as Observable<Puzzle[]>;
  }

  ngOnInit() {
  }

}
