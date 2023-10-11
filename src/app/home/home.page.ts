import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  
  public user = {
    usuario: "",
    pass: ""
  }

  constructor(private router: Router, private activeRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(() => {
      let state = this.router.getCurrentNavigation()?.extras.state;
      if (state) {
        this.user.usuario = state['user'].usuario;
        this.user.pass = state['user'].pass;
        console.log(this.user);
      }
    })
  }

}
