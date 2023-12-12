import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'docente.page.html',
  styleUrls: ['docente.page.scss'],
})
export class DocentePage implements OnInit{

  qrCodeString= "this is a secret QRcode message";
  
  nom: string = '';
  id: number = 0;

  constructor(private router: Router, private activeRoute: ActivatedRoute) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if(state && state['nom']) {
      this.nom = state['nom'];
      this.id = state['id'];
      console.log(this.nom);
        console.log(this.id);
    }
  }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(() => {
      let state = this.router.getCurrentNavigation()?.extras.state;
      if (state) {
        this.nom = state['nom'];
        this.id = state['id'];
        console.log(this.nom);
        console.log(this.id);
      }
    })
  }

}

