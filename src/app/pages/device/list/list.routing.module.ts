import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DeviceListComponent } from "./list.component";

const routes: Routes = [
	{
		path: '',
		component: DeviceListComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DeviceListRoutingModule {}