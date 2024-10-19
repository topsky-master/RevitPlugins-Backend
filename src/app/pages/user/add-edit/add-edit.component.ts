import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ApisService } from "app/services/apis.service";
import { UtilsService } from "app/services/utils.service";

@Component({
	selector: 'user-add-edit-cmp',
	templateUrl: 'add-edit.component.html'
})
export class UserAddEditComponent implements OnInit {
	form: FormGroup;
	id: string;
	isAddMode: boolean;
	loading = false;
	submitted = false;

	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private api: ApisService,
		private util: UtilsService
	) { }

	ngOnInit() {
		this.id = this.route.snapshot.params['id'];
		this.isAddMode = !this.id;

		// password not required in edit mode
		const passwordValidators = [Validators.minLength(6)];
		if (this.isAddMode) {
			passwordValidators.push(Validators.required);
		}

		this.form = this.formBuilder.group({
			first_name: ['', Validators.required],
			last_name: ['', Validators.required],
			username: ['', Validators.required],
			email: ['', Validators.required],
			password: ['', passwordValidators],
			_id: ['']
		});

		if (!this.isAddMode) {
			this.api.get('user', {_id: this.id}).then((users) => {
				const user = users[0];
				this.f.first_name.setValue(user.first_name);
				this.f.last_name.setValue(user.last_name);
				this.f.username.setValue(user.username);
				this.f.email.setValue(user.email);
				this.f._id.setValue(user._id);
			});
		}
	}

	// convenience getter for easy access to form fields
	get f() { return this.form.controls; }

	onSubmit() {
		this.submitted = true;

		// stop here if form is invalid
		if (this.form.invalid) {
			return;
		}

		this.loading = true;
		if (this.isAddMode) {
			this.createUser();
		} else {
			this.updateUser();
		}
	}

	private createUser() {
		this.api.post('user/register', this.form.value)
			.then((data) => {
					this.util.showMsg("success", "", "User added successfully");
					this.router.navigate(['.', { relativeTo: this.route }]);
				},
				error => {
					this.util.showMsg("error", "", error);
					this.loading = false;
				});
	}

	private updateUser() {
		this.api.put('user', this.form.value)
			.then((data) => {
					this.util.showMsg("success", "", "User updated successfully");
					this.router.navigate(['..', { relativeTo: this.route }]);
				},
				error => {
					this.util.showMsg("error", "", error);
					this.loading = false;
				});
	}
}