import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MemberDialogComponent } from './member-dialog/member-dialog.component';
import { Member } from '../shared/member';
import { NotifierService } from '../shared/notifier.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
  constructor(public dialog: MatDialog, private notifierService: NotifierService) { }

  ngOnInit(): void {
  }

  openAddMemberDialog(): void {
    const dialogRef = this.dialog.open(MemberDialogComponent);

    dialogRef.afterClosed().subscribe((result: Member) => {
      console.log(`Dialog result: ${result}`);

      if (result) {
        // show snackbar to signify success
        this.notifierService.showSimpleSnackBar('Member was added successfully.');
      }
    });
  }
}
