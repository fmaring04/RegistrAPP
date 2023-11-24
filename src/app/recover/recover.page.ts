import { Component, OnInit } from '@angular/core';
import { MydbService } from '../service/mydb.service';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.page.html',
  styleUrls: ['./recover.page.scss'],
})
export class RecoverPage implements OnInit {

  constructor(private mydb: MydbService) { }

  ngOnInit() {
  }

 

}
