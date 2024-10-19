import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TableComponent } from './table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableFilterPipe } from 'app/pipes/table-filter.pipe';
import { SharedModule } from '../shared.module';

@NgModule({
    imports: [ RouterModule, CommonModule, ReactiveFormsModule, FormsModule, SharedModule ],
    declarations: [ TableComponent, TableFilterPipe ],
    exports: [ TableComponent ]
})

export class TableModule {}
