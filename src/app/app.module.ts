import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FixedPluginModule } from './shared/fixedplugin/fixedplugin.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { JwtInterceptor } from "./helpers/jwt.interceptor";
import { ErrorInterceptor } from "./helpers/error.interceptor";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { SharedModule } from "./shared/shared.module";

@NgModule({
	declarations: [
		AppComponent,
		AdminLayoutComponent
	],
	imports: [
		BrowserAnimationsModule,
		SharedModule,
		RouterModule.forRoot(AppRoutes, {
			useHash: true,
			relativeLinkResolution: 'legacy'
		}),
		SidebarModule,
		NavbarModule,
		ToastrModule.forRoot(),
		FooterModule,
		FixedPluginModule,
		HttpClientModule,
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
