import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Puzzle} from '../../../types';
import {NotificationsService} from '../../../services/notifications/notifications.service';
import {LevenshteinService} from '../../../services/levenshtein/levenshtein.service';

@Component({
  selector: 'app-solve-dialog',
  templateUrl: './solve-dialog.component.html',
  styleUrls: ['./solve-dialog.component.scss']
})
export class SolveDialogComponent implements OnInit {

  solvedAnswer = null;
  answer: string;

  constructor(
    public dialogRef: MatDialogRef<SolveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Puzzle,
    private notificationsService: NotificationsService,
    private levenshteinService: LevenshteinService
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

  onSolve() {
    if (this.answer && this.answer.length) {
      const COMPARABLE = s => s.trim().toLowerCase();
      const comparableAnswer = COMPARABLE(this.answer);

      const result = this.data.answers
        .reduce((r, a) => {
          const d = this.levenshteinService.levenshteinDistance(COMPARABLE(a), comparableAnswer);
          return (d < r.distance) ? {
            distance: d,
            answer: a
          } : r;
        }, {
          distance: 1000,
          answer: ''
        });

      if (result.distance === 0) {
        this.solvedAnswer = result.answer;
      } else {
        const feedbacks = [
          'Forró, forró!',
          'Majdnem!',
          'Ez lesz az ...',
          'Végül is ez már hasonlít...',
          'Langyos, langyos...',
          'Nem az igazi...',
          'Hideg, hideg...'
        ];
        const feedback = feedbacks[Math.min(result.distance,feedbacks.length) - 1];
        this.notificationsService.error(feedback);
      }
    }

  }
}


