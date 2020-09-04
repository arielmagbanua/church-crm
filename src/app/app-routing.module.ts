import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module')
      .then((m) => m.DashboardModule)
  },
  {
    path: 'members',
    loadChildren: () => import('./members/members.module')
      .then((m) => m.MembersModule)
  },
  {
    path: 'small-groups',
    loadChildren: () => import('./small-groups/small-groups.module')
      .then((m) => m.SmallGroupsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
