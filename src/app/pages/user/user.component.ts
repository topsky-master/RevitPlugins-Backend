import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApisService } from 'app/services/apis.service';
import { UtilsService } from 'app/services/utils.service';
import { Table } from 'app/shared/table/table.component';

@Component({
	selector: 'user-cmp',
	moduleId: module.id,
	templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit {
	table: any;
	products: Array<any> = [];

	constructor(
		private api: ApisService,
		private util: UtilsService,
		private router: Router
		) {
		let self = this;
		this.table = new Table({
			url: "user",
			title: "Users",
			columns: [
				{headerText: "First Name", dataField: "first_name", width: "30%", filterable: true},
				{headerText: "Last Name", dataField: "last_name", width: "30%", filterable: true},
				{headerText: "Username", dataField: "username", width: "30%", filterable: true},
				{headerText: "email", dataField: "email", width: "30%", filterable: true},
			],
			actions: [
				{text: "Edit", class: "btn-primary", click: function(row) {
					self.router.navigate(['/user/edit/' + row._id]);
				}},
				{text: "Delete", class: "btn-danger"
					, click: function(row) {
						self.util.confirm("Are you sure to delete this user?", function() {
							row['isInActionDelete'] = true;
							self.api.delete(`user/${row._id}`).then((res) => {
								self.table.rows = self.table.rows.filter(x => x._id !== row._id);
							});
						});
					}
				},
			],
			buttons: [
				{
					text: "Add User", class: "btn-success", click: function() {
						self.router.navigate(['/user/add']);
					}
				}
			]
		});
	}

	ngOnInit() {
	}
}
