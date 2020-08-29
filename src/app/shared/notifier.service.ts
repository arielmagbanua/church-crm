import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotifierService {
  constructor(private snackBar: MatSnackBar) { }

  showSimpleSnackBar(message: string): void {
    this.snackBar.open(message, 'ok', {
      duration: 3000,
    });
  }
}
