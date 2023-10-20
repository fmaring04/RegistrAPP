import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
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

  constructor(private router:Router, private activeRouter:ActivatedRoute) { }

  enviarPerfil() {
    const navigationExtras: NavigationExtras = {
      state: { user: this.user}
    }
    this.router.navigate(['/home'], navigationExtras);
  }
  
  ngOnInit() {
  }

}
