import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/_services';

@Component({ templateUrl: 'comentarios.component.html' })
export class ComentariosComponent implements OnInit {
    form: FormGroup;
    id: string;
    isAddMode: boolean;
    loading = false;
    submitted = false;
    user=null;
    users=null;
    idhijo: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService
    ) {
        this.accountService.user.subscribe(x => this.user = x);
    }

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.accountService.getComentarios(this.id)
        .pipe(first())
        .subscribe(users => this.users = users);
    }

    // convenience getter for easy access to form fields
}