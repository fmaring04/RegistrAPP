import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MydbService } from '../service/mydb.service';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from '../service/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  
})
export class LoginPage implements OnInit {

  usuarios: any;
  loginForm!: FormGroup;
  error_msj: string = '';
  nombre: string = '';
  pass: string = '';
  rememberUser: boolean = false;

  constructor(
    private router:Router, 
    private activeRouter:ActivatedRoute, 
    private Http: HttpClient, 
    private mydb:MydbService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private storage: Storage,
    ) { 
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      pass: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  get invaledName() {
    return this.loginForm.get('nombre')?.invalid && this.loginForm.get('nombre')?.touched;
  }

  get invaledPass() {
    return this.loginForm.get('pass')?.invalid && this.loginForm.get('pass')?.touched;
  }
  
  async ngOnInit() {
    await this.storage.create();

    this.storage.get('nombre').then((value) => {
      this.nombre = value;
      console.log(this.nombre);
    });

    this.storage.get('pass').then((value) => {
      this.pass = value;
      console.log(this.pass);
    });

    this.storage.get('rememberUser').then((value) => {
      this.rememberUser = value;
    });
  }

  switchRememberOption() {
    this.storage.set('rememberUser', this.rememberUser);
  }

  login() {
    console.log(this.loginForm.value);
    if(this.rememberUser) {
      this.storage.set('nombre', this.loginForm.get('nombre')?.value);
      this.storage.set('pass', this.loginForm.get('pass')?.value);
    } else {
      this.storage.remove('nombre');
      this.storage.remove('pass');
    }
    console.log(this.loginForm.value.nombre);

    getDataFromApi() {
      const nombre = this.nombre;
      const pass = this.pass;

      this.mydb.getUsuarios(nombre, pass).subscribe(data => {
        console.log(data);
      });
    };

    this.mydb.getUsuarios(this.loginForm.value.nombre, this.loginForm.value.pass).subscribe (
      (res) => {
        if (res.tipoUsuario === 1) {
          this.authService.authenticate();
          let id: number = res.id_usuario;
          let nombre: string = res.pnombre + ' ' + res.appaterno;
          this.router.navigate(['/home'], {
            state: { nombre: nombre, id: id},
          });
        } else if (res.tipoUsuario === 2) {
          this.authService.authenticate();
          let id: number = res.id_usuario;
          let nombre: string = res.pnombre + ' ' + res.appaterno;
          this.router.navigate(['/docente'], {
            state: {nombre: nombre, id: id},
          });
        }

        this.error_msj = '';

      }, (error) => {
          if (error.status === 400) {
            this.error_msj = 'Datos incorrectos';
            setTimeout(() => {
              this.error_msj = '';
            }, 5000);
          }
        }
    );
  }


}
