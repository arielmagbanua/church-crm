import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MembersComponent } from './membership/members/members.component';
import { SmallGroupsComponent } from './membership/small-groups/small-groups.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/members',
    pathMatch: 'full',
  },
  {
    path: 'members',
    component: MembersComponent
  },
  {
    path: 'small-groups',
    component: SmallGroupsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
