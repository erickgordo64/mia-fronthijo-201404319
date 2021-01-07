import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CartaRoutingModule } from './carta-routing.module';
import { LayoutComponent } from './layout.component';
import { ListaCartaComponent } from './listacarta.component';
import { AddEditComponent } from './add-edit.component';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        CartaRoutingModule
    ],
    declarations: [
        LayoutComponent,
        ListaCartaComponent,
        AddEditComponent
    ]
})
export class CartaModule { }