import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApisService } from 'app/services/apis.service';
import { UtilsService } from 'app/services/utils.service';
import { Table } from 'app/shared/table/table.component';

@Component({
	selector: 'subscription-list-cmp',
	moduleId: module.id,
	templateUrl: 'list.component.html'
})
export class SubscriptionListComponent implements OnInit {
	table: any;

	constructor(
		private api: ApisService
		, private util: UtilsService
		, private router: Router
		) {
		let self = this;
		this.table = new Table({
			url: "subscription?populate=userId,productId,deviceId",
			title: "Subscriptions",
			itemsPerPage: 50,
			columns: [
				{headerText: "User", dataField: "userId", width: "10%", filterable: true, renderer: function(row, val) {
					return val.first_name + " " + val.last_name;
				}},
				{headerText: "Email", dataField: "userId", width: "10%", filterable: true, renderer: function(row, val) {
					return val.email;
				}},
				{headerText: "Device ID", dataField: "deviceId", width: "10%", renderer: function(row, val) {
					return val.deviceId;
				}},
				{headerText: "Product", dataField: "productId", type: "select", filterable: true, align: "text-center", width: "10%", renderer: function(row, val) {
					return val.name;
				}},
				{headerText: "Duration", dataField: "duration", align: "text-right", width: "5%"},
				{headerText: "Status", dataField: "status", type: "select", filterable: true, align: "text-center", width: "10%"},
				{headerText: "Comment", dataField: "comment", width: "auto"},
				{headerText: "Requested Date", dataField: "createdAt", type: "date", dateFormat: "MM/dd/yyyy h:mm a", width: "15%"},
				{headerText: "Approved/Rejected DATE", dataField: "last_status_changed", type: "date", dateFormat: "MM/dd/yyyy", width: "15%"},
				{headerText: "Expiration Date", dataField: "last_status_changed", displayField: 'expiration_date', type: "date", dateFormat: "MM/dd/yyyy", width: "10%", renderer: function(row, val) {
					if(row.status == "approved") {
						let date = new Date(val);
						date.setDate(date.getDate() + row.duration);
						let now = new Date();
						let remaining = Math.round((date.getTime() - now.getTime()) / 3600 / 1000 / 24);
						let html = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
						return html;
					}
					return "";
				}},
			],
			actions: [
				{text: "Edit", class: "btn-primary", click: function(row) {
					self.router.navigate(['/subscription/edit/' + row._id]);
				}},
				{text: "Approve", class: "btn-primary",
					visible: function(row) {
						return row.status == 'waiting';
					},
					click: function(row) {
						self.util.confirm("Are you sure to approve this subscription?", function() {
							row.status = "approved";
							row['isInActionApprove'] = true;
							self.api.put(`subscription`, row).then((res) => {
								row['isInActionApprove'] = false;
							});
						});
					}
				}	,
				{text: "Reject", class: "btn-danger",
					visible: function(row) {
						return row.status == 'waiting' || row.status == 'approved';
					},
					click: function(row) {
						self.util.confirm("Are you sure to reject this subscription?", function() {
							row.status = "rejected";
							row['isInActionReject'] = true;
							self.api.put(`subscription`, row).then((res) => {
								row['isInActionReject'] = false;
							});
						});
					}
				},
				{text: "Delete", class: "btn-danger"
					, click: function(row) {
						self.util.confirm("Are you sure to delete this subscription?", function() {
							row['isInActionDelete'] = true;
							self.api.delete(`subscription/${row._id}`).then((res) => {
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
