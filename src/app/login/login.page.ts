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
  remember: boolean = false;

  constructor(
    private router: Router,
    private activeRouter: ActivatedRoute,
    private Http: HttpClient,
    private mydb: MydbService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private storage: Storage
  ) {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      pass: ['', [Validators.required, Validators.minLength(4)]],
    });
    console.log(this.loginForm.value);
  }

  get invaledName() {
    return (
      this.loginForm.get('nombre')?.invalid &&
      this.loginForm.get('nombre')?.touched
    );
  }

  get invaledPass() {
    return (
      this.loginForm.get('pass')?.invalid && this.loginForm.get('pass')?.touched
    );
  }

  async ngOnInit() {
    await this.storage.create();

    this.storage.get('nombre').then((value) => {
      this.nombre = value;
    });

    this.storage.get('pass').then((value) => {
      this.pass = value;
    });

    this.storage.get('rememberUser').then((value) => {
      this.remember = value;
    });
  }

  switchRememberOption() {
    this.storage.set('rememberUser', this.remember);
  }

  login() {
    if (this.remember) {
      this.storage.set('nombre', this.loginForm.get('nombre')?.value);
      this.storage.set('pass', this.loginForm.get('pass')?.value);
    } else {
      this.storage.remove('nombre');
      this.storage.remove('pass');
    }

    this.mydb.getUsers(this.loginForm.value.nombre).subscribe(
      (res) => {
        if (res.tipoUsuario == 1) {
          this.authService.authenticate();
          let id: number = res.id_usuario;
          let nom: string = res.pnombre + ' ' + res.appaterno;
          this.router.navigate(['/home'], {
            state: { nom: nom, id: id },
          });
        } else if (res.tipoUsuario == 2) {
          this.authService.authenticate();
          let id: number = res.id_usuario;
          let nom: string = res.pnombre + ' ' + res.appaterno;
          this.router.navigate(['/docente'], {
            state: { nom: nom, id: id },
          });
        }

        this.error_msj = '';
      },
      (error) => {
        if (error.status === 400) {
          this.error_msj = 'Usuario invalido';
          setTimeout(() => {
            this.error_msj = '';
          }, 6000);
        } else if (error.status === 500) {
          this.error_msj = 'Error en el servidor';
          setTimeout(() => {
            this.error_msj = '';
          }, 6000);
        }
      }
    );
    // this.getUsers();
    /* this.mydb.getUsers().subscribe(
      data => {
        console.log(data);

      }
    ); */

    /*     if(this.usuarios.nom_usuario === this.nombre && this.usuarios.contraseña === this.pass) {
      if(this.usuarios.tipoUsuario === 1){
        this.router.navigate(['/home'], {
          state: {nombre: this.usuarios.pnombre + ' ' + this.usuarios.appaterno},
        });
      } else if (this.usuarios.tipoUsuario === 2) {
        this.router.navigate(['/docente'], {
          state: {nombre: this.usuarios.pnombre + ' ' + this.usuarios.appaterno},
        });
      };
    } else {
      console.log('error');
    }; */
  }
}
