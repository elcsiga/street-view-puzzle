import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Puzzle} from '../../../types';

@Component({
  selector: 'app-solve-dialog',
  templateUrl: './solve-dialog.component.html',
  styleUrls: ['./solve-dialog.component.scss']
})
export class SolveDialogComponent implements OnInit {

  solved = false;
  answer: string;

  constructor(
    public dialogRef: MatDialogRef<SolveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Puzzle
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

  onSolve() {
    const COMPARABLE = s => s.trim().toLowerCase();
    this.solved = this.data.answers.map(COMPARABLE).includes(COMPARABLE(this.answer));
  }
}


