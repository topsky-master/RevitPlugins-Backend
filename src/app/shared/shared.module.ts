import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		NgxPaginationModule,
		NgxSkeletonLoaderModule,
		NgxSpinnerModule,
	],
	declarations: [
	],
	exports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		NgxSkeletonLoaderModule,
		NgxPaginationModule,
		NgxSpinnerModule,
	],
	providers: [
	]
})
export class SharedModule { }
