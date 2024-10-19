import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ApisService } from "app/services/apis.service";
import { UtilsService } from "app/services/utils.service";

@Component({
	selector: 'device-add-edit-cmp',
	templateUrl: 'add-edit.component.html'
})
export class DeviceAddEditComponent implements OnInit {
	form: FormGroup;
	_id: string;
	isAddMode: boolean;
	loading = false;
	submitted = false;
	users: any;

	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private api: ApisService,
		private util: UtilsService
	) { }

	ngOnInit() {
		this._id = this.route.snapshot.params['_id'];
		this.isAddMode = !this._id;

		this.form = this.formBuilder.group({
			name: [''],
			deviceId: [''],
			username: [''],
			comment: [''],
			_id: ['']
		});

		this.api.get('user').then((users) => {
			this.users = users;

			if (!this.isAddMode) {
				this.api.get('device', {_id: this._id}).then((devices) => {
					const device = devices[0];
					this.f._id.setValue(device._id);
					const user = this.users.find(x => x._id == device.userId);
					this.f.username.setValue(user.first_name + " " + user.last_name);
					this.f.deviceId.setValue(device.deviceId);
					this.f.comment.setValue(device.comment);
				});
			}
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

		this.loading = true;
		if (this.isAddMode) {
			this.createDevice();
		} else {
			this.updateDevice();
		}
	}

	private createDevice() {
		this.api.post('device', this.form.value)
			.then((data) => {
					this.util.showMsg("success", "", "Device added successfully");
					this.router.navigate(['./device', { relativeTo: this.route }]);
				},
				error => {
					this.util.showMsg("error", "", error);
					this.loading = false;
				});
	}

	private updateDevice() {
		this.api.put('device', this.form.value)
			.then((data) => {
					this.util.showMsg("success", "", "Device updated successfully");
					this.router.navigate(['./device', { relativeTo: this.route }]);
				},
				error => {
					this.util.showMsg("error", "", error);
					this.loading = false;
				});
	}
}