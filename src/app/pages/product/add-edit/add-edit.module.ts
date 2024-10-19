import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ProductAddEditRoutingModule } from "./add-edit-routing.module";
import { ProductAddEditComponent } from "./add-edit.component";

@NgModule({
	declarations: [
		ProductAddEditComponent
	],
	imports: [
		ProductAddEditRoutingModule,
		CommonModule,
		FormsModule,
		ReactiveFormsModule
	]
})
export class ProductAddEditModule { }
