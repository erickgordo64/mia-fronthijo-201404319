import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/_services';

@Component({ templateUrl: 'comentar.component.html' })
export class ComentarComponent implements OnInit {
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
        

        this.form = this.formBuilder.group({
            comentario: ['', Validators.required]
        });

    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {

        if (this.form.invalid) {
            return;
        }

        this.submitted = true;
        
        this.idhijo=this.user[0].idhijo;
        console.log(this.idhijo);
        console.log(this.id);
        console.log(this.f.comentario.value);
        this.accountService.addComentario(this.f.comentario.value, this.id ,this.idhijo)
            .pipe(first())
            .subscribe({next: () => {
                this.alertService.success('comenatrio exitoso', { keepAfterRouteChange: true });
                this.router.navigate(['/santa'], { relativeTo: this.route });
            },
            error: error => {
                this.alertService.error(error);
                this.loading = false;
            }});
    }
}