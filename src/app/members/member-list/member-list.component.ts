import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { Member } from '../member';
import { MemberDialogComponent } from '../member-dialog/member-dialog.component';
import { NotifierService } from '../../shared/notifier.service';
import { MembersService } from '../members.service';

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

    dialogRef.afterClosed().subscribe((result: Member) => {
      console.log(`Dialog result: ${result}`);

      if (result) {
        // show snackbar to signify success
        this.notifierService.showSimpleSnackBar('Member was added successfully.');
      }
    });
  }

  /**
   * Delete member
   *
   * @param id
   */
  deleteMember(id: string): void {
    this.membersService.deleteMember(id).then(() => {
      // show snackbar to signify success
      this.notifierService.showSimpleSnackBar('Member was deleted successfully.');
    });
  }

  ngOnDestroy(): void {
    this.membersSubscription.unsubscribe();
  }
}
