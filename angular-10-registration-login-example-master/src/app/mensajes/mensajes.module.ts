import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MensajesRoutingModule } from './mensajes-routing.module';
import { LayoutComponent } from './layout.component';
import { ChatComponent } from './chat.component';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MensajesRoutingModule
    ],
    declarations: [
        LayoutComponent,
        ChatComponent
    ]
})
export class MensajesModule { }