import { Component } from '@angular/core';
import { User } from './models/user';
import { ApisService } from './services/apis.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})

export class AppComponent {
	user: User;

	constructor(private apiService: ApisService) {
		this.apiService.user.subscribe(x => this.user = x);
	}

	logout() {
		this.apiService.logout();
	}
}
