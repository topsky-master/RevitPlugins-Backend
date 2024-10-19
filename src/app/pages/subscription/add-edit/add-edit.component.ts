import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ApisService } from "app/services/apis.service";
import { UtilsService } from "app/services/utils.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
	selector: 'subscription-add-edit-cmp',
	templateUrl: 'add-edit.component.html'
})
export class SubscriptionAddEditComponent implements OnInit {
	form: FormGroup;
	_id: string;
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
		this._id = this.route.snapshot.params['_id'];
		this.isAddMode = !this._id;

		this.form = this.formBuilder.group({
			username: [{value: '', disabled: true}],
			device: [{value: '', disabled: true}],
			product: [{value: '', disabled: true}],
			duration: ['', Validators.required],
			status: [{value: '', disabled: true}],
			comment: [''],
			activation_code: [{value: '', disabled: true}],
			_id: ['']
		});

		if (!this.isAddMode) {
			this.api.get('subscription?populate=userId,productId,deviceId', {_id: this._id}).then((subscriptions) => {
				const subscription = subscriptions[0];
				this.f._id.setValue(subscription._id);
				const user = subscription.userId;
				this.f.username.setValue(user.first_name + " " + user.last_name);
				this.f.product.setValue(subscription.productId.name);
				this.f.device.setValue(subscription.deviceId.deviceId);
				this.f.duration.setValue(subscription.duration);
				this.f.status.setValue(subscription.status);
				this.f.activation_code.setValue(subscription.activation_code);
				this.f.comment.setValue(subscription.comment);
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
			this.createSubscription();
		} else {
			this.updateSubscription();
		}
	}

	private createSubscription() {
		this.api.post('subscription', this.form.value)
			.then((data) => {
					this.util.showMsg("success", "", "Subscription added successfully");
					this.router.navigate(['./subscription', { relativeTo: this.route }]);
				},
				error => {
					this.util.showMsg("error", "", error);
					this.loading = false;
				});
	}

	private updateSubscription() {
		this.api.put('subscription', this.form.value)
			.then((data) => {
					this.util.showMsg("success", "", "Subscription updated successfully");
					this.router.navigate(['./subscription', { relativeTo: this.route }]);
				},
				error => {
					this.util.showMsg("error", "", error);
					this.loading = false;
				});
	}
}