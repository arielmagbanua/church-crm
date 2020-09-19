import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';

import { Member } from '../member';
import { MemberDialogComponent } from '../member-dialog/member-dialog.component';
import { NotifierService } from '../../shared/notifier.service';
import { MembersService } from '../members.service';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class MemberListComponent implements OnInit, OnDestroy {
  /**
   * The data source of the members
   */
  dataSource: MatTableDataSource<Member>;

  /**
   * Columns to display.
   */
  columnsToDisplay = ['firstName', 'lastName', 'mobileNumber', 'status', 'membershipDate'];

  /**
   * Columns mapping
   */
  columnsValueMap = {
    firstName: 'First Name',
    lastName: 'Last Name',
    mobileNumber: 'Mobile Number',
    status: 'Status',
    membershipDate: 'Membership Date'
  };
  expandedMember: Member | null;

  /**
   * Members subscription.
   *
   * @private
   */
  private membersSubscription: Subscription;

  /**
   * Add member subscription.
   *
   * @private
   */
  private memberDialogSubscription: Subscription;

  /**
   * Confirm delete member subscription
   *
   * @private
   */
  private confirmDeleteMemberDialogSubscription: Subscription;

  /**
   * Table paginator
   */
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  /**
   * Table sorting
   */
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    private notifierService: NotifierService,
    private membersService: MembersService
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.membersSubscription = this.membersService.members.subscribe((members: Member[]) => {
      this.dataSource.data = members;
    });
  }

  /**
   * Apply the filtering of members
   *
   * @param event
   */
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * Open the add member dialog.
   */
  openAddMemberDialog(): void {
    const dialogRef = this.dialog.open(MemberDialogComponent, {
      width: '65vw'
    });

    this.memberDialogSubscription = dialogRef.afterClosed()
      .subscribe((result: Member) => {
      console.log(`Dialog result: ${result}`);

      if (result) {
        // show snackbar to signify success
        this.notifierService.showSimpleSnackBar('Member was added successfully.');
      }
    });
  }

  /**
   * Open edit member dialog
   *
   * @param member
   */
  openEditMemberDialog(member: Member): void {
    const dialogRef = this.dialog.open(MemberDialogComponent, {
      width: '65vw',
      data: member
    });

    this.memberDialogSubscription = dialogRef.afterClosed()
      .subscribe((result: Member) => {
        if (result) {
          // show snackbar to signify success
          this.notifierService.showSimpleSnackBar('Member was updated successfully.');
        }
      });
  }

  /**
   * Show confirm delete dialog
   *
   * @param id
   */
  deleteConfirmDialog(id: string): Observable<any> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Member',
        message: 'Are you sure you want to delete this member?',
        positiveText: 'Yes',
        negativeText: 'No',
        result: id
      }
    });
    return dialogRef.afterClosed();
  }

  /**
   * Delete member
   *
   * @param id
   */
  deleteMember(id: string): void {
    // show dialog
    this.confirmDeleteMemberDialogSubscription = this.deleteConfirmDialog(id)
      .subscribe((memberId) => {
      if (memberId) {
        // delete id
        this.membersService.deleteMember(id).then(() => {
          // show snackbar to signify success
          this.notifierService.showSimpleSnackBar('Member was deleted successfully.');
        });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.membersSubscription) {
      this.membersSubscription.unsubscribe();
    }

    if (this.memberDialogSubscription) {
      this.memberDialogSubscription.unsubscribe();
    }

    if (this.confirmDeleteMemberDialogSubscription) {
      this.confirmDeleteMemberDialogSubscription.unsubscribe();
    }
  }
}
