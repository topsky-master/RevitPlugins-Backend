import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApisService } from 'app/services/apis.service';
import { UtilsService } from 'app/services/utils.service';
import { Table } from 'app/shared/table/table.component';
import { environment } from 'environments/environment';

@Component({
	selector: 'product-list-cmp',
	moduleId: module.id,
	templateUrl: 'list.component.html'
})
export class ProductListComponent implements OnInit {
	table: any;

	constructor(
		private api: ApisService,
		private util: UtilsService,
		private router: Router
		) {
		let self = this;
		this.table = new Table({
			url: "product",
			title: "Products",
			columns: [
				{headerText: "Name", dataField: "name", width: "30%", filterable: true},
				{headerText: "Cover Image", dataField: "cover", width: "30%", renderer: function(row, val) {
					return `<img src="${environment.uploadUrl}${val}" />`;
				}},
				{headerText: "Comment", dataField: "comment", width: "auto"},
				{headerText: "Created Date", dataField: "createdAt", type: "date", dateFormat: "MM/dd/yyyy h:mm a", width: "15%"},
			],
			actions: [
				{text: "Edit", class: "btn-primary", click: function(row) {
					self.router.navigate(['/product/edit/' + row._id]);
				}},
				{text: "Delete", class: "btn-danger"
					, click: function(row) {
						self.util.confirm("Are you sure to delete this product?", function() {
							row['isInActionDelete'] = true;
							self.api.delete(`product/${row._id}`).then((res) => {
								self.table.rows = self.table.rows.filter(x => x._id !== row._id);
							});
						});
					}
				},
			],
			buttons: [
				{
					text: "Add Product", class: "btn-success", click: function() {
						self.router.navigate(['/product/add']);
					}
				}
			]
		});
	}

	ngOnInit() {
	}
}
