import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AccionesRoutingModule } from './acciones-routing.module';
import { LayoutComponent } from './layout.component';
import { ListComponent } from './list.component';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AccionesRoutingModule
    ],
    declarations: [
        LayoutComponent,
        ListComponent

    ]
})
export class AccionesModule { }