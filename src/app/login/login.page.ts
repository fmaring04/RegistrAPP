import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { MydbService } from '../service/mydb.service';
import { HttpClient } from '@angular/common/http';


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

  constructor(private router:Router, private activeRouter:ActivatedRoute, private mydb:MydbService, private Http: HttpClient) { }

  enviarPerfil() {
    const navigationExtras: NavigationExtras = {
      state: { user: this.user}
    }

    localStorage.setItem('usuario', this.user.usuario);

    this.router.navigate(['/home'], navigationExtras);
  }
  
  ngOnInit() {
    this.Http.get('https://qvdj7glb-8000.brs.devtunnels.ms/')
    .subscribe(res => {
      console.log(res);    
    })
  }


}
