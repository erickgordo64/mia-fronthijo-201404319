import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { delay, first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/_services';

@Component({ templateUrl: 'add-edit.component.html' })
export class AddEditComponent implements OnInit {
    form: FormGroup;
    id: string;
    isAddMode: boolean;
    loading = false;
    submitted = false;
    users = null;
    user = null;
    estado = "false";
    carta = null;
    cartas = null
    idhijo: string;
    idcarta: string;
    detalle = null;
    bastones = 0;
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
        this.isAddMode = !this.id;

        this.bastones = this.user[0].bastones;

        if (this.isAddMode) {

            this.idhijo = this.user[0].idhijo;
            console.log(this.idhijo);
            this.accountService.addCarta(this.idhijo, this.estado)
                .pipe(first())
                .subscribe(cartas => this.cartas = cartas);
            delay(2000);
            this.idhijo = this.user[0].idhijo;
            this.accountService.getLastCarta(this.idhijo)
                .pipe(first())
                .subscribe(carta => this.carta = carta);
        }

        this.accountService.getProductos()
            .pipe(first())
            .subscribe(users => this.users = users);

        this.form = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        if (!this.isAddMode) {

        }
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        if (this.isAddMode) {
            this.createUser();
        } else {
            this.updateUser();
        }
    }

    private createUser() {
        this.accountService.register(this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('User added successfully', { keepAfterRouteChange: true });
                    this.router.navigate(['../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }

    private updateUser() {
        this.accountService.update(this.id, this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Update successful', { keepAfterRouteChange: true });
                    this.router.navigate(['../../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }

    addProducto(idproducto: string, precio: number) {
        console.log(idproducto);
        if (this.isAddMode) {
            // if (this.bastones < precio) {
            //     this.alertService.error('bastones insuficientes')
            // } else {
                this.idcarta = this.carta[0].idcarta;
                console.log(this.idcarta);
                this.accountService.addDetalleCarta(this.idcarta, idproducto)
                    .pipe(first())
                    .subscribe(detalle => this.detalle = detalle);
                this.bastones = this.bastones - precio;
           // }

        } else {
            // if (this.bastones < precio) {
            //     this.alertService.error('bastones insuficientes')
            // } else {
                console.log(this.id);
                this.accountService.addDetalleCarta(this.id, idproducto)
                    .pipe(first())
                    .subscribe(detalle => this.detalle = detalle);
                this.bastones = this.bastones - precio;
            //}

        }
    }

}