import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UserAddEditRoutingModule } from "./add-edit-routing.module";
import { UserAddEditComponent } from "./add-edit.component";

@NgModule({
	declarations: [
		UserAddEditComponent
	],
	imports: [
		UserAddEditRoutingModule,
		CommonModule,
		FormsModule,
		ReactiveFormsModule
	]
})
export class UserAddEditModule { }
