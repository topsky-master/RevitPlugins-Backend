import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FileAddEditRoutingModule } from "./add-edit-routing.module";
import { FileAddEditComponent } from "./add-edit.component";

@NgModule({
	declarations: [
		FileAddEditComponent
	],
	imports: [
		FileAddEditRoutingModule,
		CommonModule,
		FormsModule,
		ReactiveFormsModule
	]
})
export class FileAddEditModule { }
