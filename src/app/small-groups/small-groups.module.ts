import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { SmallGroupsComponent } from './small-groups.component';
import { SmallGroupListComponent } from './small-group-list/small-group-list.component';
import { SmallGroupDialogComponent } from './small-group-dialog/small-group-dialog.component';

const routes: Routes = [
  {
    path: '',
    component: SmallGroupsComponent
  }
];

@NgModule({
  declarations: [
    SmallGroupsComponent,
    SmallGroupListComponent,
    SmallGroupDialogComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class SmallGroupsModule { }
