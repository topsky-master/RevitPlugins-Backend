import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FileAddEditComponent } from "./add-edit.component";

const routes: Routes = [
	{
		path: '',
		component: FileAddEditComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class FileAddEditRoutingModule {}