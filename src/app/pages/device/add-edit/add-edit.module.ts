import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DeviceAddEditRoutingModule } from "./add-edit-routing.module";
import { DeviceAddEditComponent } from "./add-edit.component";

@NgModule({
	declarations: [
		DeviceAddEditComponent
	],
	imports: [
		DeviceAddEditRoutingModule,
		CommonModule,
		FormsModule,
		ReactiveFormsModule
	]
})
export class DeviceAddEditModule { }
