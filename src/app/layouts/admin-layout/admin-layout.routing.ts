import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';

export const AdminLayoutRoutes: Routes = [
	{ path: 'dashboard', component: DashboardComponent },

	{ 
		path: 'product',
		loadChildren: () => import('../../pages/product/list/list.module').then(m => m.ProductListModule)
	},
	{ 
		path: 'product/add',
		loadChildren: () => import('../../pages/product/add-edit/add-edit.module').then(m => m.ProductAddEditModule)
	},
	{ 
		path: 'product/edit/:_id',
		loadChildren: () => import('../../pages/product/add-edit/add-edit.module').then(m => m.ProductAddEditModule)
	},

	{ 
		path: 'file',
		loadChildren: () => import('../../pages/file/list/list.module').then(m => m.FileListModule)
	},
	{ 
		path: 'file/add',
		loadChildren: () => import('../../pages/file/add-edit/add-edit.module').then(m => m.FileAddEditModule)
	},
	{ 
		path: 'file/edit/:_id',
		loadChildren: () => import('../../pages/file/add-edit/add-edit.module').then(m => m.FileAddEditModule)
	},

	{ 
		path: 'device',
		loadChildren: () => import('../../pages/device/list/list.module').then(m => m.DeviceListModule)
	},
	{ 
		path: 'device/edit/:_id',
		loadChildren: () => import('../../pages/device/add-edit/add-edit.module').then(m => m.DeviceAddEditModule)
	},

	{ 
		path: 'subscription',
		loadChildren: () => import('../../pages/subscription/list/list.module').then(m => m.SubscriptionListModule)
	},
	{ 
		path: 'subscription/edit/:_id',
		loadChildren: () => import('../../pages/subscription/add-edit/add-edit.module').then(m => m.SubscriptionAddEditModule)
	},

	{ 
		path: 'user',
		loadChildren: () => import('../../pages/user/user.module').then(m => m.UserModule)
	},
	{ 
		path: 'user/add',
		loadChildren: () => import('../../pages/user/add-edit/add-edit.module').then(m => m.UserAddEditModule)
	},
	{ 
		path: 'user/edit/:id',
		loadChildren: () => import('../../pages/user/add-edit/add-edit.module').then(m => m.UserAddEditModule)
	},

	{ path: 'typography', component: TypographyComponent },
	{ path: 'icons', component: IconsComponent },
	{ path: 'maps', component: MapsComponent },
	{ path: 'notifications', component: NotificationsComponent },
	{ path: 'upgrade', component: UpgradeComponent }
];
