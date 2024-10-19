import { Routes } from '@angular/router';
import { AuthGuard } from './helpers/auth.guard';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

export const AppRoutes: Routes = [
	{
		path: '',
		redirectTo: 'login',
		pathMatch: 'full',
	}, {
		path: '',
		component: AdminLayoutComponent,
		children: [
			{
				path: '',
				loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
			}],
		canActivate: [AuthGuard]
	},
	{
		path: 'login',
		loadChildren: () => import('./pages/user/login/login.module').then(m => m.LoginModule)
	},
	{
		path: 'register',
		loadChildren: () => import('./pages/user/register/register.module').then(m => m.RegisterModule)
	},
	{
		path: '**',
		redirectTo: 'dashboard'
	}
]
