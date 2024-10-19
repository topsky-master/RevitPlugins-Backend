import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SubscriptionAddEditComponent } from "./add-edit.component";

const routes: Routes = [
	{
		path: '',
		component: SubscriptionAddEditComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class SubscriptionAddEditRoutingModule {}