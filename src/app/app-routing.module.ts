import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@shared/guards/auth.guard';
import { LoginGuard } from '@shared/guards/login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./features/auth/login/login.module').then(m => m.LoginModule),
    canActivate: [LoginGuard] 
  },
  {
    path: 'daily',
    loadChildren: () => import('./features/daily/daily.module').then(m => m.DailyModule),
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '' } 
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
