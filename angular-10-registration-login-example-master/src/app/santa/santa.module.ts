import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SantaRoutingModule } from './santa-routing.module';
import { LayoutComponent } from './layout.component';
import { PublicacionComponent } from './publicacion.component';
import { ComentarComponent } from './comentar.component';
import { ComentariosComponent } from './comentarios.component';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SantaRoutingModule
    ],
    declarations: [
        LayoutComponent,
        PublicacionComponent,
        ComentarComponent,
        ComentariosComponent
    ]
})
export class SantaModule { }