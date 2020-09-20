import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { SmallGroup } from '../small-group';

@Component({
  selector: 'app-small-group-dialog',
  templateUrl: './small-group-dialog.component.html',
  styleUrls: ['./small-group-dialog.component.scss']
})
export class SmallGroupDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SmallGroupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SmallGroup
  ) { }

  ngOnInit(): void {
  }
}
