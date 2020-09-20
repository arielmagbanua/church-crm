import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { SmallGroupDialogComponent } from '../small-group-dialog/small-group-dialog.component';
import { NotifierService } from '../../shared/notifier.service';
import { SmallGroup } from '../small-group';

@Component({
  selector: 'app-small-group-list',
  templateUrl: './small-group-list.component.html',
  styleUrls: ['./small-group-list.component.scss']
})
export class SmallGroupListComponent implements OnInit, OnDestroy {
  /**
   * Add small group subscription.
   *
   * @private
   */
  private smallGroupDialogSubscription: Subscription;

  constructor(public dialog: MatDialog, private notifierService: NotifierService,) { }

  ngOnInit(): void {
  }

  openAddSmallSmallGroupDialog(): void {
    const dialogRef = this.dialog.open(SmallGroupDialogComponent, {
      width: '65vw'
    });

    this.smallGroupDialogSubscription = dialogRef.afterClosed()
      .subscribe((result: SmallGroup) => {
        console.log(`Dialog result: ${result}`);

        if (result) {
          // show snackbar to signify success
          this.notifierService.showSimpleSnackBar('Member was added successfully.');
        }
      });
  }

  /**
   * Apply the filtering of small groups
   *
   * @param event The event instance
   */
  applyFilter(event: Event): void {

  }

  ngOnDestroy(): void {
    if (this.smallGroupDialogSubscription) {
      this.smallGroupDialogSubscription.unsubscribe();
    }
  }
}
