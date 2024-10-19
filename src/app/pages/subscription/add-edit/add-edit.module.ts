import { NgModule } from "@angular/core";
import { SharedModule } from "app/shared/shared.module";
import { SubscriptionAddEditRoutingModule } from "./add-edit-routing.module";
import { SubscriptionAddEditComponent } from "./add-edit.component";

@NgModule({
	declarations: [
		SubscriptionAddEditComponent
	],
	imports: [
		SubscriptionAddEditRoutingModule,
		SharedModule
	]
})
export class SubscriptionAddEditModule { }
