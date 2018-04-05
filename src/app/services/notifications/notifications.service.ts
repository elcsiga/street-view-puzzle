import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class NotificationsService {

  constructor(
    public snackBar: MatSnackBar
  ) { }

  error( message: string ): void {
    this.snackBar.open( message, null, {
      duration: 3000
    });
  }
}
