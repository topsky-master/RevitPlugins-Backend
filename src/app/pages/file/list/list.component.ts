import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApisService } from 'app/services/apis.service';
import { UtilsService } from 'app/services/utils.service';
import { Table } from 'app/shared/table/table.component';

@Component({
	selector: 'file-list-cmp',
	moduleId: module.id,
	templateUrl: 'list.component.html'
})
export class FileListComponent implements OnInit {
	table: any;
	products: Array<any> = [];

	constructor(
		private api: ApisService,
		private util: UtilsService,
		private router: Router
		) {
		let self = this;
		this.api.get('product', null, true).then(products => {
			this.products = products;
		});

		this.table = new Table({
			url: "file",
			title: "Files",
			columns: [
				{headerText: "Name", dataField: "name", width: "20%", filterable: true},
				{headerText: "Product", dataField: "products", width: "20%", renderer: function(row, val) {
					let product_names = [];
					val.forEach(id => {
						let product = self.products.find(x => x._id == id);
						if(product)
							product_names.push(product.name);
					});
					return product_names.join(", ");
				}},
				{headerText: "Comment", dataField: "comment", width: "auto"},
				{headerText: "Version", dataField: "version", width: "10%"},
				{headerText: "Checksum", dataField: "checksum", width: "10%"},
			],
			actions: [
				{text: "Edit", class: "btn-primary", click: function(row) {
					self.router.navigate(['/file/edit/' + row._id]);
				}},
				{text: "Delete", class: "btn-danger"
					, click: function(row) {
						self.util.confirm("Are you sure to delete this file?", function() {
							row['isInActionDelete'] = true;
							self.api.delete(`file/${row._id}`).then((res) => {
								self.table.rows = self.table.rows.filter(x => x._id !== row._id);
							});
						});
					}
				},
			],
			buttons: [
				{
					text: "Add File", class: "btn-success", click: function() {
						self.router.navigate(['/file/add']);
					}
				}
			]
		});
	}

	ngOnInit() {
	}
}
