import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApisService } from 'app/services/apis.service';
import { UtilsService } from 'app/services/utils.service';
import { Table } from 'app/shared/table/table.component';

@Component({
	selector: 'device-list-cmp',
	moduleId: module.id,
	templateUrl: 'list.component.html'
})
export class DeviceListComponent implements OnInit {
	table: any;

	constructor(
		private api: ApisService,
		private util: UtilsService,
		private router: Router
		) {
		let self = this;
		this.table = new Table({
			url: "device?populate=userId",
			title: "Devices",
			columns: [
				{headerText: "User", dataField: "userId", width: "30%", filterable: true, renderer: function(row, val) {
					return val.first_name + " " + val.last_name;
				}},
				{headerText: "Device ID", dataField: "deviceId", width: "30%"},
				{headerText: "Comment", dataField: "comment", width: "auto"},
				{headerText: "Created Date", dataField: "createdAt", type: "date", dateFormat: "MM/dd/yyyy h:mm a", width: "15%"},
			],
			actions: [
				{text: "Edit", class: "btn-primary", click: function(row) {
					self.router.navigate(['/device/edit/' + row._id]);
				}},
				{text: "Delete", class: "btn-danger"
					, click: function(row) {
						self.util.confirm("Are you sure to delete this device?", function() {
							row['isInActionDelete'] = true;
							self.api.delete(`device/${row._id}`).then((res) => {
								self.table.rows = self.table.rows.filter(x => x._id !== row._id);
							});
						});
					}
				},
			]
		});
		}

	ngOnInit() {
	}
}
