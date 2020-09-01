import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Member } from '../../shared/member';
import { MemberDialogComponent } from '../member-dialog/member-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { NotifierService } from '../../shared/notifier.service';
import { MembersService } from '../members.service';
import { Subscription } from 'rxjs';

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
  dataSource: MatTableDataSource<Member>;
  columnsToDisplay = ['firstName', 'lastName', 'mobileNumber', 'status', 'membershipDate'];
  columnsValueMap = {
    firstName: 'First Name',
    lastName: 'Last Name',
    mobileNumber: 'Mobile Number',
    status: 'Status',
    membershipDate: 'Membership Date'
  };
  expandedMember: Member | null;
  private membersSubscription: Subscription;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
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

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

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

  ngOnDestroy(): void {
    this.membersSubscription.unsubscribe();
  }
}

// const DUMMY_MEMBERS: Member[] = [
//   {
//     firstName: 'John',
//     middleName: 'Smith',
//     lastName: 'Doe',
//     gender: 'M',
//     email: 'john@foo.com',
//     mobileNumber: '11223344',
//     birthdate: '4/23/1988',
//     address: 'BARPA',
//     status: 'guest',
//     smallGroup: 'sg2',
//     membershipDate: '4/23/2012',
//   },
//   {
//     firstName: 'Jane',
//     middleName: 'Smith',
//     lastName: 'Doe',
//     gender: 'F',
//     email: 'jane@foo.com',
//     mobileNumber: '11223344',
//     birthdate: '4/23/1988',
//     address: 'AGDAO',
//     status: 'guest',
//     smallGroup: 'sg3',
//     membershipDate: '4/23/2013',
//   },
//   {
//     firstName: 'Max',
//     middleName: 'Dean',
//     lastName: 'Joe',
//     gender: 'M',
//     email: 'max@foo.com',
//     mobileNumber: '34234234',
//     birthdate: '4/23/1988',
//     address: 'JEROME',
//     status: 'guest',
//     smallGroup: 'sg1',
//     membershipDate: '4/23/2015',
//   },
//   {
//     firstName: 'Alice',
//     middleName: 'In',
//     lastName: 'Wonderland',
//     gender: 'F',
//     email: 'alice@wonderland.com',
//     mobileNumber: '34234234',
//     birthdate: '5/23/1988',
//     address: 'JEROME',
//     status: 'attendee',
//     smallGroup: 'sg1',
//     membershipDate: '4/23/2015',
//   },
//   {
//     firstName: 'Jennifer',
//     middleName: 'In',
//     lastName: 'Wonderland',
//     gender: 'F',
//     email: 'alice@wonderland.com',
//     mobileNumber: '34234234',
//     birthdate: '5/29/1988',
//     address: 'TORIL',
//     status: 'attendee',
//     smallGroup: 'sg1',
//     membershipDate: '1/23/2015',
//   },
//   {
//     firstName: 'Jake',
//     middleName: 'In',
//     lastName: 'Wonderland',
//     gender: 'M',
//     email: 'jake@wonderland.com',
//     mobileNumber: '34234234',
//     birthdate: '5/29/1988',
//     address: 'TORIL',
//     status: 'attendee',
//     smallGroup: 'sg1',
//     membershipDate: '1/23/2015',
//   }
// ];
