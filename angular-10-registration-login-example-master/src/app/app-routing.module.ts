import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { AuthGuard } from './_helpers';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./users/users.module').then(x => x.UsersModule);
const cartaModule =() => import('./carta/carta.module').then(x=>x.CartaModule);
const accionesModule =() => import('./acciones/acciones.module').then(x=>x.AccionesModule);
const santaModule=()=> import('./santa/santa.module').then(x=>x.SantaModule);
const mensajesModule=()=> import('./mensajes/mensajes.module').then(x=>x.MensajesModule);

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
    { path: 'carta', loadChildren: cartaModule, canActivate: [AuthGuard] },
    { path: 'acciones', loadChildren: accionesModule, canActivate: [AuthGuard] },
    { path: 'santa', loadChildren: santaModule, canActivate: [AuthGuard] },
    { path: 'mensajes', loadChildren: mensajesModule, canActivate: [AuthGuard] },
    { path: 'account', loadChildren: accountModule },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }