import { Component, OnInit } from '@angular/core';
import {Pos, Puzzle} from '../../types';

@Component({
  selector: 'app-create-puzzle-view',
  templateUrl: './create-puzzle-view.component.html',
  styleUrls: ['./create-puzzle-view.component.css']
})
export class CreatePuzzleViewComponent implements OnInit {

  initialAddress = '';

  puzzle: Puzzle = {
    title: '',
    question: '',
    answers: [''],
    pos: {
      lat: 0,
      lng: 0,
      heading: 0,
      pitch: 0,
    }
  };

  constructor() { }

  ngOnInit() {
  }

  addAnswer(event) {
    event.preventDefault();
    this.puzzle.answers.push('');
  }
  removeAnswer(index) {
    if (index > 0) {
      this.puzzle.answers.splice(index, 1);
    }
  }
  trackByFn(index, item) {
    return index;
  }
}
