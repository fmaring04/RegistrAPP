import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { MydbService } from '../service/mydb.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  
})
export class LoginPage implements OnInit {

  user = {
    usuario: "",
    pass: ""
  }

  constructor(private router:Router, private activeRouter:ActivatedRoute, private mydb:MydbService) { }

  enviarPerfil() {
    const navigationExtras: NavigationExtras = {
      state: { user: this.user}
    }

    localStorage.setItem('usuario', this.user.usuario);

    this.router.navigate(['/home'], navigationExtras);
  }
  
  ngOnInit() {
  }


}
