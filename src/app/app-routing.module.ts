import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SideNavComponent } from './core/components/side-nav/side-nav.component';
import { SampleComponent } from './core/components/sample/sample.component';
import { LoginComponent } from './core/components/login/login.component';
import { DetailComponent } from './core/components/detail/detail.component';
import { authGuard } from './core/Guard/auth.guard';
import { checkGuard } from './core/Guard/check.guard';
import { TableComponent } from './core/components/table/table.component';
import { BlockComponent } from './core/components/block/block.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: 'detail/:id', component: DetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'table', component: TableComponent, canActivate: [authGuard] },
  { path: 'side', component: SideNavComponent },
  { path: 'block', component: BlockComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
