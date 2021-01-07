import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AccountService } from '@app/_services';

@Component({ templateUrl: 'listacarta.component.html' })
export class ListaCartaComponent implements OnInit {
    users = null;
    user = null;
    idhijo: string;
    constructor(private accountService: AccountService) {
        this.accountService.user.subscribe(x => this.user = x);
    }

    ngOnInit() {
        this.idhijo=this.user[0].idhijo;
        console.log(this.idhijo);
        this.accountService.getCartas(this.idhijo)
            .pipe(first())
            .subscribe(users => this.users = users);
    }

    logout() {
        this.accountService.logout();
    }
}