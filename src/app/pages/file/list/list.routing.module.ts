import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FileListComponent } from "./list.component";

const routes: Routes = [
	{
		path: '',
		component: FileListComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class FileListRoutingModule {}