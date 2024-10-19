import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'app/models/user';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UtilsService } from './utils.service';

@Injectable({
	providedIn: 'root'
})
export class ApisService {
	apiEndpoint: string = '';
	private userSubject: BehaviorSubject<User>;
	public user: Observable<User>;

	constructor(
		private http: HttpClient,
		private router: Router,
		private util: UtilsService
	) {
		this.apiEndpoint = environment.apiEndpoint;
		this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
		this.user = this.userSubject.asObservable();
	}

	public get userValue(): User {
		return this.userSubject.value;
	}

	public login(email, password) {
		return this.http.post<User>(`${environment.apiEndpoint}user/login`, { email, password })
			.pipe(map(user => {
				// store user details and jwt token in local storage to keep user logged in between page refreshes
				localStorage.setItem('user', JSON.stringify(user));
				this.userSubject.next(user);
				return user;
			}));
	}

	public logout() {
		// remove user from local storage and set current user to null
		localStorage.removeItem('user');
		this.userSubject.next(null);
		this.router.navigate(['/login']);
	}

	sendNotification(msg, title) {
		// const body = {
		// 	app_id: environment.onesignal.appId,
		// 	included_segments: ['Active Users', 'Inactive Users"'],
		// 	headings: { en: title },
		// 	contents: { en: msg },
		// 	data: { task: msg }
		// };
		// const header = {
		// 	headers: new HttpHeaders()
		// 		.set('Content-Type', 'application/json')
		// 		.set('Authorization', `Basic ${environment.onesignal.restKey}`)
		// };
		// return this.http.post('https://onesignal.com/api/v1/notifications', body, header);
	}

	JSON_to_URLEncoded(element, key?, list?) {
		let new_list = list || [];
		if (typeof element === 'object') {
			for (let idx in element) {
				this.JSON_to_URLEncoded(
					element[idx],
					key ? key + '[' + idx + ']' : idx,
					new_list
				);
			}
		} else {
			new_list.push(key + '=' + encodeURIComponent(element));
		}
		return new_list.join('&');
	}

	upload(files: File[]): Promise<any> {
		this.util.showSpinner();
		return new Promise<any>((resolve, reject) => {
			let header;
			if (localStorage.getItem('token')) {
				header = {
					headers: new HttpHeaders()
						.set('Authorization', `Bearer ${localStorage.getItem('token')}`)
				};
			}
			else {
				header = {
					headers: new HttpHeaders()
						.set('Basic', `${environment.authToken}`)
				};
			}

			const formData = new FormData();
			Array.from(files).forEach(f => formData.append('file', f));
			this.http.post(this.apiEndpoint + 'upload', formData).subscribe((data) => {
				this.util.hideSpinner();
				resolve(data);
			}, error => {
				this.util.hideSpinner();
				reject(error);
			});
		});
	}

	public post(url, body): Promise<any> {
		this.util.showSpinner();
		return new Promise<any>((resolve, reject) => {
			let header;
			if (localStorage.getItem('token')) {
				header = {
					headers: new HttpHeaders()
						.set('Content-Type', 'application/x-www-form-urlencoded')
						.set('Authorization', `Bearer ${localStorage.getItem('token')}`)
				};
			}
			else {
				header = {
					headers: new HttpHeaders()
						.set('Content-Type', 'application/x-www-form-urlencoded')
						.set('Basic', `${environment.authToken}`)
				};
			}
			const param = this.JSON_to_URLEncoded(body);
			this.http.post(this.apiEndpoint + url, param, header).subscribe((data) => {
				this.util.hideSpinner();
				resolve(data);
			}, error => {
				this.util.hideSpinner();
				reject(error);
			});
			// return this.http.post(this.baseUrl + url, param, header);
		});
	}

	public put(url, body): Promise<any> {
		this.util.showSpinner();
		return new Promise<any>((resolve, reject) => {
			let header;
			if (localStorage.getItem('token')) {
				header = {
					headers: new HttpHeaders()
						.set('Content-Type', 'application/x-www-form-urlencoded')
						.set('Authorization', `Bearer ${localStorage.getItem('token')}`)
				};
			}
			else {
				header = {
					headers: new HttpHeaders()
						.set('Content-Type', 'application/x-www-form-urlencoded')
						.set('Basic', `${environment.authToken}`)
				};
			}
			const param = this.JSON_to_URLEncoded(body);
			this.http.put(this.apiEndpoint + url, param, header).subscribe((data) => {
				this.util.hideSpinner();
				resolve(data);
			}, error => {
				this.util.hideSpinner();
				reject(error);
			});
			// return this.http.post(this.baseUrl + url, param, header);
		});
	}

	public get(url, params = null, hasNext = false): Promise<any> {
		this.util.showSpinner();
		return new Promise<any>((resolve, reject) => {
			let header;
			if (localStorage.getItem('token')) {
				header = {
					headers: new HttpHeaders()
						.set('Content-Type', 'application/x-www-form-urlencoded')
						.set('Authorization', `Bearer ${localStorage.getItem('token')}`)
				};
			}
			else {
				header = {
					headers: new HttpHeaders()
						.set('Content-Type', 'application/x-www-form-urlencoded')
						.set('Basic', `${environment.authToken}`)
				};
			}
			if(params) {
				header.params = new HttpParams();
				for(var p in params) {
					header.params = header.params.append(p, params[p]);
				}
			}
			this.http.get(this.apiEndpoint + url, header).subscribe((data) => {
				if(!hasNext)
					this.util.hideSpinner();
				resolve(data);
			}, error => {
				this.util.hideSpinner();
				reject(error);
			});
		});
	}

	public delete(url, params = {}): Promise<any> {
		this.util.showSpinner();
		return new Promise<any>((resolve, reject) => {
			let header;
			if (localStorage.getItem('token')) {
				header = {
					headers: new HttpHeaders()
						.set('Content-Type', 'application/x-www-form-urlencoded')
						.set('Authorization', `Bearer ${localStorage.getItem('token')}`)
				};
			}
			else {
				header = {
					headers: new HttpHeaders()
						.set('Content-Type', 'application/x-www-form-urlencoded')
						.set('Basic', `${environment.authToken}`)
				};
			}
			if(params) {
				header.params = new HttpParams();
				for(var p in params)
					header.params.set(p, params[p]);
			}
			this.http.delete(this.apiEndpoint + url, header).subscribe((data) => {
				this.util.hideSpinner();
				resolve(data);
			}, error => {
				this.util.hideSpinner();
				reject(error);
			});
			// return this.http.post(this.baseUrl + url, param, header);
		});
	}
}
