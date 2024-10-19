import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DeviceAddEditComponent } from "./add-edit.component";

const routes: Routes = [
	{
		path: '',
		component: DeviceAddEditComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DeviceAddEditRoutingModule {}