import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApisService } from 'app/services/apis.service';
import { first } from 'rxjs/operators';
import { ToastrService } from "ngx-toastr";

@Component({
	selector: 'login-cmp',
	templateUrl: 'login.component.html',
	styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {
	form: FormGroup;
	loading = false;
	submitted = false;
	returnUrl: string;

	constructor(
		private formBuilder: FormBuilder,
		private apiService: ApisService,
		private router: Router,
		private toastr: ToastrService
	) {
		// get return url from route parameters or default to '/'
		//		this.returnUrl = this.router.snapshot.queryParams['returnUrl'] || '/';
		this.returnUrl = '/dashboard';
		if (this.apiService.userValue) {
			this.router.navigate(['/dashboard']);
		}
	}

	ngOnInit() {
		this.form = this.formBuilder.group({
			email: ['', Validators.required],
			password: ['', Validators.required]
		});
	}

	get f() { return this.form.controls; }

	onSubmit() {
		this.submitted = true;

		// stop here if form is invalid
		if (this.form.invalid) {
			return;
		}

		this.loading = true;
		this.apiService.login(this.f.email.value, this.f.password.value)
			.pipe(first())
			.subscribe(
				data => {
					this.router.navigate([this.returnUrl]);
				},
				error => {
					this.toastr.error(
						'<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Invalid credentials</span>',
						"",
						{
							timeOut: 4000,
							enableHtml: true,
							closeButton: true,
							toastClass: "alert alert-danger alert-with-icon",
							positionClass: "toast-top-right"
						}
					);
					this.loading = false;
				});
	}
}
