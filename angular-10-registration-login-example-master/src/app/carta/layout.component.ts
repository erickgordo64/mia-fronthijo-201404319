import { Component } from '@angular/core';

import { AccountService } from '@app/_services';


@Component({ templateUrl: 'layout.component.html' })
export class LayoutComponent {
    user=null;


    constructor(private accountService: AccountService) {
        this.accountService.user.subscribe(x => this.user = x);
    }

    logout() {
        this.accountService.logout();
    }

 }