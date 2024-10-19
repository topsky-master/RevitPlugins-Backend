import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'app/services/utils.service';

export interface RouteInfo {
	path: string;
	title: string;
	icon: string;
	class: string;
}

export const ROUTES: RouteInfo[] = [
	{ path: '/dashboard', title: 'Dashboard', icon: 'nc-bank', class: '' },
//	{ path: '/icons', title: 'Icons', icon: 'nc-diamond', class: '' },
	{ path: '/maps', title: 'Maps', icon: 'nc-pin-3', class: '' },
	{ path: '/message', title: 'Messages', icon: 'nc-email-85', class: '' },//bell-55
	{ path: '/product', title: 'Products', icon: 'nc-diamond', class: '' },
	{ path: '/file', title: 'Files', icon: 'nc-tablet-2', class: '' },
	{ path: '/user', title: 'Users', icon: 'nc-single-02', class: '' },
	{ path: '/device', title: 'Devices', icon: 'nc-laptop', class: '' },
//	{ path: '/typography', title: 'Typography', icon: 'nc-caps-small', class: '' },
//	{ path: '/upgrade', title: 'Upgrade to PRO', icon: 'nc-spaceship', class: 'active-pro' },
	{ path: '/subscription', title: 'Subscriptions', icon: 'nc-cart-simple', class: '' },
	{ path: '/todos', title: 'Blogs', icon: 'nc-bullet-list-67', class: '' },//caps-small
	{ path: '/bugs', title: 'Bugs', icon: 'nc-tile-56', class: '' },
];

@Component({
	moduleId: module.id,
	selector: 'sidebar-cmp',
	templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
	public menuItems: any[];

	constructor(public utils: UtilsService) {
		
	}
	
	ngOnInit() {
		this.menuItems = ROUTES.filter(menuItem => menuItem);
	}
}
