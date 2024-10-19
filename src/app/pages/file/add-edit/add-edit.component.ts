import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ApisService } from "app/services/apis.service";
import { UtilsService } from "app/services/utils.service";

@Component({
	selector: 'file-add-edit-cmp',
	templateUrl: 'add-edit.component.html'
})
export class FileAddEditComponent implements OnInit {
	form: FormGroup;
	_id: string;
	isAddMode: boolean;
	loading = false;
	submitted = false;
	products: [];

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
			name: ['', Validators.required],
			products: ['', Validators.required],
			comment: [''],
			_id: ['']
		});

		this.api.get('product').then((products) => {
			this.products = products;
		});

		if (!this.isAddMode) {
			this.api.get('file', {_id: this._id}).then((files) => {
				const file = files[0];
				this.f._id.setValue(file._id);
				this.f.name.setValue(file.name);
				this.f.products.setValue(file.products);
				this.f.comment.setValue(file.comment);
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
			this.createFile();
		} else {
			this.updateFile();
		}
	}

	private createFile() {
		this.api.post('file', this.form.value)
			.then((data) => {
					this.util.showMsg("success", "", "File added successfully");
					this.router.navigate(['./file', { relativeTo: this.route }]);
				},
				error => {
					this.util.showMsg("error", "", error);
					this.loading = false;
				});
	}

	private updateFile() {
		this.api.put('file', this.form.value)
			.then((data) => {
					this.util.showMsg("success", "", "File updated successfully");
					this.router.navigate(['./file', { relativeTo: this.route }]);
				},
				error => {
					this.util.showMsg("error", "", error);
					this.loading = false;
				});
	}
}