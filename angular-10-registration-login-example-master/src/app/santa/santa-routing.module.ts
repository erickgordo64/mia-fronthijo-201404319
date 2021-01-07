import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';

import { LayoutComponent } from './layout.component';
import { PublicacionComponent} from './publicacion.component';
import { ComentarComponent } from './comentar.component';
import { ComentariosComponent } from './comentarios.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component:  PublicacionComponent},
            { path: 'comentar/:id', component:  ComentarComponent},
            { path: 'comentarios/:id', component:  ComentariosComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SantaRoutingModule { }