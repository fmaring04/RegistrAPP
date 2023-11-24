import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { MydbService } from '../service/mydb.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  
})
export class LoginPage implements OnInit {


  constructor(private router:Router, private activeRouter:ActivatedRoute, private mydb:MydbService) { }

  
  ngOnInit() {

  }


}
