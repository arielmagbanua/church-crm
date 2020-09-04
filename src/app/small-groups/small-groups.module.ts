import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SmallGroupsComponent } from './small-groups.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: SmallGroupsComponent
  }
];

@NgModule({
  declarations: [
    SmallGroupsComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class SmallGroupsModule { }
