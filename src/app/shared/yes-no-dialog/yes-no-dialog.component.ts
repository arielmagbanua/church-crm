import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface ConfirmData {
  title: string;
  message: string;
  positiveText: string;
  negativeText: string;
  result?: any;
}

@Component({
  selector: 'app-yes-no-dialog',
  templateUrl: './yes-no-dialog.component.html',
  styleUrls: ['./yes-no-dialog.component.scss']
})
export class YesNoDialogComponent implements OnInit {
  /**
   * Dialog title
   */
  title = '';

  /**
   * Dialog message
   */
  message = '';

  /**
   * Positive button text
   */
  negativeText = 'Yes';

  /**
   * Negative button text
   */
  positiveText = 'To';

  constructor(
    public dialogRef: MatDialogRef<YesNoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmData) {}

  ngOnInit(): void {
    this.title = this.data.title;
    this.message = this.data.message;
    this.positiveText = this.data.positiveText;
    this.negativeText = this.data.negativeText;
  }

  /**
   * Affirmation click method.
   */
  affirm(): void {
    this.dialogRef.close(this.data.result);
  }
}
