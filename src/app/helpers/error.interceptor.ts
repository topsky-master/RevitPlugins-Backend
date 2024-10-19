import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApisService } from 'app/services/apis.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
	constructor(private apiService: ApisService) { }

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(request).pipe(catchError(err => {
			if (err.status === 401) {
				// auto logout if 401 response returned from api
				this.apiService.logout();
			}

			const error = err.error.message || err.statusText;
			return throwError(error);
		}))
	}
}