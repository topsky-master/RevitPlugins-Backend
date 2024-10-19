import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApisService } from 'app/services/apis.service';
import { first } from 'rxjs/operators';
import { ToastrService } from "ngx-toastr";

@Component({
	selector: 'register-cmp',
	templateUrl: 'register.component.html',
	styleUrls: ['register.component.css']
})

export class RegisterComponent implements OnInit {
	form: FormGroup;
	loading = false;
	submitted = false;

	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private apiService: ApisService
	) { }

	ngOnInit() {
		this.form = this.formBuilder.group({
			firstName: ['', Validators.required],
			lastName: ['', Validators.required],
			username: ['', Validators.required],
			password: ['', [Validators.required, Validators.minLength(6)]]
		});
	}

	// convenience getter for easy access to form fields
	get f() { return this.form.controls; }

	onSubmit() {
		this.submitted = true;

		// stop here if form is invalid
		if (this.form.invalid) {
			return;
		}

/*		this.loading = true;
		this.apiService.register(this.form.value)
			.pipe(first())
			.subscribe(
				data => {
					this.alertService.success('Registration successful', { keepAfterRouteChange: true });
					this.router.navigate(['../login'], { relativeTo: this.route });
				},
				error => {
					this.alertService.error(error);
					this.loading = false;
				});*/
	}
}
