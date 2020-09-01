import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { MembersComponent } from './members.component';
import { MemberDialogComponent } from './member-dialog/member-dialog.component';
import { MemberListComponent } from './member-list/member-list.component';
import { ExtractPipe } from './extract.pipe';
import { RouterModule, Routes } from '@angular/router';
import { CdkTableModule } from '@angular/cdk/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';

const routes: Routes = [
  {
    path: '',
    component: MembersComponent
  }
];

@NgModule({
  declarations: [
    MembersComponent,
    MemberDialogComponent,
    MemberListComponent,
    ExtractPipe
  ],
  imports: [
    CdkTableModule,
    MatDatepickerModule,
    MatDialogModule,
    MatPaginatorModule,
    SharedModule,
    MatSortModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MaterialFileInputModule,
    MatNativeDateModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
})
export class MembersModule { }
