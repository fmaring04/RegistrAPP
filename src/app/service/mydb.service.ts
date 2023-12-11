import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MydbService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' : '*'
    })
  }

  private apiURL = 'https://qvdj7glb-8000.brs.devtunnels.ms/api';

  constructor(private http: HttpClient) { }

  getUsers(nom_usuario: string = ''):Observable<any> {
    return this.http.get(this.apiURL+'/detalle_usuarios/'+ nom_usuario);
  }
  
  updatePass(data: any):Observable<any> {
    return this.http.put(this.apiURL+'/usuarios/', data);
  }

  getAsistencia(data: any):Observable<any> {
    return this.http.get(this.apiURL+'/asistencia/', data);
  }

  postAsistencia(data: any):Observable<any> {
    return this.http.post(this.apiURL+'/asistencia/', data);
  }
  

}
