import { NgModule } from "@angular/core";
import { SharedModule } from "app/shared/shared.module";
import { TableModule } from "app/shared/table/table.module";
import { ProductListComponent } from "./list.component";
import { ProductListRoutingModule } from "./list.routing.module";

@NgModule({
	declarations: [
		ProductListComponent
	],
	imports: [
		ProductListRoutingModule,
		SharedModule,
		TableModule
	]
})
export class ProductListModule { }
