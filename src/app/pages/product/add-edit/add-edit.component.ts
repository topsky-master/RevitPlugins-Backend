import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ApisService } from "app/services/apis.service";
import { UtilsService } from "app/services/utils.service";
import { environment } from 'environments/environment';

@Component({
	selector: 'product-add-edit-cmp',
	templateUrl: 'add-edit.component.html',
	styleUrls: ['add-edit.component.css']
})
export class ProductAddEditComponent implements OnInit {
	form: FormGroup;
	_id: string;
	isAddMode: boolean;
	loading = false;
	submitted = false;
	coverImage = "";
	uploadUrl = "";

	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private api: ApisService,
		private util: UtilsService,
	) {
		this.uploadUrl = environment.uploadUrl;
	}

	ngOnInit() {
		this._id = this.route.snapshot.params['_id'];
		this.isAddMode = !this._id;

		this.form = this.formBuilder.group({
			name: ['', Validators.required],
			cover: [''],
			comment: ['', Validators.required],
			_id: ['']
		});

		if (!this.isAddMode) {
			this.api.get('product', {_id: this._id}).then((products) => {
				const product = products[0];
				this.f._id.setValue(product._id);
				this.f.name.setValue(product.name);
				//this.f.cover.setValue(product.cover);
				this.coverImage = product.cover;
				this.f.comment.setValue(product.comment);
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
			this.createProduct();
		} else {
			this.updateProduct();
		}
	}

	private createProduct() {
		let params = this.form.value;
		params.cover = this.coverImage;
		this.api.post('product', params)
			.then((data) => {
					this.util.showMsg("success", "", "Product added successfully");
					this.router.navigate(['./product', { relativeTo: this.route }]);
				},
				error => {
					this.util.showMsg("error", "", error);
					this.loading = false;
				});
	}

	private updateProduct() {
		let params = this.form.value;
		params.cover = this.coverImage;
		this.api.put('product', params)
			.then((data) => {
					this.util.showMsg("success", "", "Product updated successfully");
					this.router.navigate(['./product', { relativeTo: this.route }]);
				},
				error => {
					this.util.showMsg("error", "", error);
					this.loading = false;
				});
	}

	previewImage(files) {
		if(files.length === 0) {
			return;
		}
		const mimeType = files[0].type;
		if(mimeType.match(/image\/*/) == null) {
			return;
		}

		this.api.upload(files).then((data: any) => {
			this.coverImage = data[0];
		}).catch(error => console.log(error));
	}

	removeImage() {
		this.coverImage = "";
	}

	selectImage() {

	}
}