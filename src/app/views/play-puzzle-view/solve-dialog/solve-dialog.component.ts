import {Component, OnInit, Inject, OnDestroy} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Puzzle} from '../../../types';
import {NotificationsService} from '../../../services/notifications/notifications.service';
import {LevenshteinService} from '../../../services/levenshtein/levenshtein.service';
import {AppState, User} from '../../../app.state';
import {Store} from '@ngrx/store';
import {AngularFirestore} from 'angularfire2/firestore';
import {CommonService} from '../../../services/common/common.service';

@Component({
  selector: 'app-solve-dialog',
  templateUrl: './solve-dialog.component.html',
  styleUrls: ['./solve-dialog.component.scss']
})
export class SolveDialogComponent implements OnInit, OnDestroy {

  solvedAnswer = null;
  puzzleSolvingInProgress = false;
  answer: string;

  constructor(
    public dialogRef: MatDialogRef<SolveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Puzzle,
    private notificationsService: NotificationsService,
    private levenshteinService: LevenshteinService,
    private store: Store<AppState>,
    private db: AngularFirestore,
    private commonService: CommonService
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }
  ngOnDestroy() {
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

        this.puzzleSolvingInProgress = true;

        console.log(this.data);
        this.db.collection('solvings').add({
          puzzleId: this.data.id,
          userId: this.commonService.getUserId()
        })
          .then( solvingRef => {
            this.puzzleSolvingInProgress = false;
            this.notificationsService.info('Puzzle successfully solved');
            // this.router.navigate(['/']);
          })
          .catch( error => {
            this.puzzleSolvingInProgress = false;
            this.notificationsService.error('Error while solving puzzle.');
          });
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
        const feedback = feedbacks[Math.min(result.distance, feedbacks.length) - 1];
        this.notificationsService.error(feedback);
      }
    }

  }
}


