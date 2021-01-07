import { Component, OnInit } from '@angular/core';
import { delay, first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AccountService, AlertService } from '@app/_services';

@Component({ templateUrl: 'chat.component.html' })
export class ChatComponent implements OnInit {
    users = null;
    user = null;
    idhijo: string;
    idchat: string;
    idadmin: string;
    loading = false;
    form: FormGroup;
    submitted = false;


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

        delay(2000);

        this.idhijo=this.user[0].idhijo;
        console.log(this.idhijo);
        this.accountService.getMensajes(this.idhijo)
        .pipe(first())
        .subscribe(users => this.users = users);

        console.log(this.users)

        this.form = this.formBuilder.group({
            comentario: ['', Validators.required]
        });
    }

    get f() { return this.form.controls; }

    onSubmit(){
        if (this.form.invalid) {
            return;
        }

        this.submitted = true;
        
        this.idhijo=this.user[0].idhijo;
        this.idchat=this.users[0].idchat;
        this.idadmin=this.users[0].idadmin;
        console.log(this.idhijo);
        console.log(this.idchat);
        console.log(this.idadmin);
        console.log(this.f.comentario.value);
        this.accountService.addMensajes(this.idchat, this.f.comentario.value, this.idadmin , this.idhijo)
            .pipe(first())
            .subscribe({next: () => {
                this.alertService.success('comenatrio exitoso', { keepAfterRouteChange: true });
                delay(2000);
                this.router.navigate(['/mensajes'], { relativeTo: this.route });
            },
            error: error => {
                this.alertService.error(error);
                this.loading = false;
            }});
    }

    logout() {
        this.accountService.logout();
    }
}