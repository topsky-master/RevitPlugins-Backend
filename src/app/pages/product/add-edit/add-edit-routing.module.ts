import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductAddEditComponent } from "./add-edit.component";

const routes: Routes = [
	{
		path: '',
		component: ProductAddEditComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ProductAddEditRoutingModule {}