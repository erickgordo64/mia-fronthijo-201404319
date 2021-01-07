import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User, Padre, Accion, Carta, Producto, Publicacion, Comentarios, Mensaje } from '@app/_models';
import { ThrowStmt } from '@angular/compiler';

@Injectable({ providedIn: 'root' })
export class AccountService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    private padreSubject: BehaviorSubject<Padre>;
    public padre: Observable<Padre>;

    private accionSubject: BehaviorSubject<Accion>;
    public accion: Observable<Accion>

    private cartaSubject: BehaviorSubject<Carta>;
    public carta: Observable<Carta>;

    private productoSubject: BehaviorSubject<Producto>;
    public producto: Observable<Producto>;

    private publicacionSubject: BehaviorSubject<Publicacion>;
    public publicacion: Observable<Publicacion>;

    private comentarioSubject: BehaviorSubject<Comentarios>;
    public comentario: Observable<Comentarios>;

    private mensajeSubject: BehaviorSubject<Mensaje>;
    public mensaje: Observable<Mensaje>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();

        this.padreSubject = new BehaviorSubject<Padre>(JSON.parse(localStorage.getItem('padre')));
        this.padre = this.padreSubject.asObservable();

        this.accionSubject = new BehaviorSubject<Accion>(JSON.parse(localStorage.getItem('accion')));
        this.accion = this.accionSubject.asObservable();

        this.cartaSubject = new BehaviorSubject<Carta>(JSON.parse(localStorage.getItem('carta')));
        this.carta = this.cartaSubject.asObservable();

        this.productoSubject = new BehaviorSubject<Producto>(JSON.parse(localStorage.getItem('producto')));
        this.producto = this.productoSubject.asObservable();

        this.publicacionSubject = new BehaviorSubject<Publicacion>(JSON.parse(localStorage.getItem('publicacion')));
        this.publicacion = this.publicacionSubject.asObservable();

        this.comentarioSubject = new BehaviorSubject<Comentarios>(JSON.parse(localStorage.getItem('comentarios')));
        this.comentario = this.comentarioSubject.asObservable();

        this.mensajeSubject = new BehaviorSubject<Mensaje>(JSON.parse(localStorage.getItem('mensaje')));
        this.mensaje = this.mensajeSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    public get accionValue(): Accion{
        return this.accionSubject.value;
    }

    public get cartaValue(): Carta{
        return this.cartaSubject.value;
    }

    public get productoValue(): Producto{
        return this.productoSubject.value;
    }
        
    public get publicacionValue(): Publicacion{
        return this.publicacionSubject.value;
    }

    public get comentarioValue(): Comentarios{
        return this.comentarioSubject.value;
    }

    public get mensajeValue(): Mensaje{
        return this.mensajeSubject.value;
    }

    login(correo, contrasena) {
        return this.http.post<User>(`${environment.apiUrl}/login`, { correo,contrasena })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/account/login']);
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/registroHijo`, user);
    }

    registerPadre(padre: Padre) {
        return this.http.post(`${environment.apiUrl}/registroPadre`, padre);
    }

    //MODULO HIJO
    getAcciones(edad: string){
        return this.http.get<Accion[]>(`${environment.apiUrl}/getAcciones/?edad=${edad}`);
    }

    addAccion(idhijo, idaccion){
        return this.http.post<User>(`${environment.apiUrl}/addAccion`, { idhijo,idaccion })
    }

    getCartas(idhijo: string){
        return this.http.get<Carta[]>(`${environment.apiUrl}/getCartas/?idhijo=${idhijo}`);
    }

    getProductos(){
        return this.http.get<Producto[]>(`${environment.apiUrl}/getProducto`);
    }

    addCarta(idhijo, estado){
        return this.http.post<User>(`${environment.apiUrl}/addCarta`, { idhijo, estado })
    }

    getLastCarta(idhijo: string){
        return this.http.get<Carta[]>(`${environment.apiUrl}/getUltimaCarta/?idhijo=${idhijo}`);
    }

    addDetalleCarta(idcarta, idproducto){
        return this.http.post<Carta>(`${environment.apiUrl}/addDetalleCarta`, { idcarta,idproducto })
    }

    getPublicaciones(){
        return this.http.get<Publicacion[]>(`${environment.apiUrl}/getPublicacion`);
    }

    addComentario(comentario, idpublicacion, idhijo){
        return this.http.post(`${environment.apiUrl}/addComentario`, { comentario, idpublicacion, idhijo })
    }

    getComentarios(idpublicacion: string){
        return this.http.get<Comentarios[]>(`${environment.apiUrl}/getComentarios/?idpublicacion=${idpublicacion}`);
    }

    getMensajes(idhijo: string){
        return this.http.get<Mensaje[]>(`${environment.apiUrl}/getMensajes/?idhijo=${idhijo}`);
    }

    addMensajes(idchat, contenido, idadmin, idhijo){
        return this.http.post(`${environment.apiUrl}/addMensaje`, { idchat, contenido, idadmin,idhijo })
    }
    //MODULOS EXTRA

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/getUsuarios`);
    }

    getById(id: string) {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    }

    update(id, params) {
        return this.http.put(`${environment.apiUrl}/users/${id}`, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id == this.userValue.id) {
                    // update local storage
                    const user = { ...this.userValue, ...params };
                    localStorage.setItem('user', JSON.stringify(user));

                    // publish updated user to subscribers
                    this.userSubject.next(user);
                }
                return x;
            }));
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id == this.userValue.id) {
                    this.logout();
                }
                return x;
            }));
    }
}