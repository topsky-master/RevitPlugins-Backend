import { Component, HostBinding, Input } from '@angular/core';
import { ApisService } from 'app/services/apis.service';

@Component({
    moduleId: module.id,
    selector: 'table-cmp',
    templateUrl: 'table.component.html',
		styleUrls: ['table.component.css']
})

export class TableComponent {
	@Input('table') table: Table;

	constructor(
		private api: ApisService
	) {
		this.table = new Table();
	}

	ngOnInit() {
		if(this.table.url == "")
			return;

		this.api.get(this.table.url).then((rows) => {
			this.table.skeletons = [];
			this.table.rows = rows;

			this.table.columns.forEach((column: any) => {
				if(column.type == "select") {
					this.table.filter[column.dataField + "s"] = [];
					rows.forEach(row => {
						let val = row[column.dataField];
						if(column.renderer) {
							val = column.renderer(row, row[column.dataField]);
						}
						if(this.table.filter[column.dataField + "s"].indexOf(val) < 0)
							this.table.filter[column.dataField + "s"].push(val);
					});
				}
			});
		})
	}
}

export class Table {
	public title: string = "";
	public skeletons: Array<string> = Array(5);
	public page: number = 1;
	public itemsPerPage: number = 10;
	public rows: Array<object> = [];
	public filter: object = {};
	public columns: Array<object> = [];
	public actions: Array<object> = [];
	public url: string = "";
	public buttons: Array<object> = [];

	constructor(options: any = {}) {
		if(options.title)	this.title = options.title;
		if(options.skeletons)	this.skeletons = options.skeletons;
		if(options.page)	this.page = options.page;
		if(options.itemsPerPage)	this.itemsPerPage = options.itemsPerPage;
		if(options.rows)	this.rows = options.rows;
		if(options.filter)	this.filter = options.filter;
		if(options.columns)	this.columns = options.columns;
		if(options.actions)	this.actions = options.actions;
		if(options.url)	this.url = options.url;
		if(options.buttons)	this.buttons = options.buttons;
	}
}
