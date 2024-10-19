import { NgModule } from "@angular/core";
import { SharedModule } from "app/shared/shared.module";
import { TableModule } from "app/shared/table/table.module";
import { DeviceListComponent } from "./list.component";
import { DeviceListRoutingModule } from "./list.routing.module";

@NgModule({
	declarations: [
		DeviceListComponent
	],
	imports: [
		DeviceListRoutingModule,
		SharedModule,
		TableModule
	]
})
export class DeviceListModule { }
