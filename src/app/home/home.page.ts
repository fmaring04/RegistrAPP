import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  
  nombre: string = '';
  id: number = 0;

  constructor(private router: Router, private activeRoute: ActivatedRoute) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if(state && state['nombre']) {
      this.nombre = state['nombre'];
      this.id = state['id'];
    }
  }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(() => {
      let state = this.router.getCurrentNavigation()?.extras.state;
      if (state) {
        this.nombre = state['nombre'].nombre;
        this.id = state['id'].id;
        console.log(this.nombre);
        console.log(this.id);
      }
    })
  }

}
