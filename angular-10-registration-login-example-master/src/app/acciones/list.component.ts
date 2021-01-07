import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@app/_models';

import { AccountService } from '@app/_services';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    users = null;
    user = null;
    edad: string;
    idhijo: string;

    constructor(private accountService: AccountService) {
        this.accountService.user.subscribe(x => this.user = x);
    }

    ngOnInit() {
        this.edad=this.user[0].edad;
        console.log(this.edad);
        this.accountService.getAcciones(this.edad)
            .pipe(first())
            .subscribe(users => this.users = users);
    }

    addAccion(idaccion: string){
        this.idhijo=this.user[0].idhijo;
        this.accountService.addAccion(this.idhijo, idaccion)
            .pipe(first())
            .subscribe(() => this.users = this.users.filter(x => x.id !== idaccion));
    }

    delete(idaccion: string) {
        const user = this.users.find(x => x.id === idaccion);
        user.isDeleting = true;
        this.accountService.delete(idaccion)
            .pipe(first())
            .subscribe(() => this.users = this.users.filter(x => x.id !== idaccion));
    }
    logout() {
        this.accountService.logout();
    }
}