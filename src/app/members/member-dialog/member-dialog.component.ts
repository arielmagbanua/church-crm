import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-member-dialog',
  templateUrl: './member-dialog.component.html',
  styleUrls: ['./member-dialog.component.scss']
})
export class MemberDialogComponent implements OnInit {
  selectedStatus: string;

  constructor() { }

  ngOnInit(): void {
  }

}
