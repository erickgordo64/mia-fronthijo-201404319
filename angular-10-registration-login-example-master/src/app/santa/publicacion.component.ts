import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AccountService } from '@app/_services';

@Component({ templateUrl: 'publicacion.component.html' })
export class PublicacionComponent implements OnInit {
    users = null;
    user = null;
    idhijo: string;
    constructor(private accountService: AccountService) {
        this.accountService.user.subscribe(x => this.user = x);
    }

    ngOnInit() {
        this.accountService.getPublicaciones()
        .pipe(first())
        .subscribe(users => this.users = users);

        console.log(this.users)
    }

    logout() {
        this.accountService.logout();
    }
}