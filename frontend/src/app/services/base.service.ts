import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  constructor(private http: HttpClient) { }
  
  create(uri: string, payload: any){
    return this.http.post(`${environment.apiUrl}/${uri}`, payload);
  }

  read(uri: string){
    return this.http.get(`${environment.apiUrl}/${uri}`);
  }

  update(uri: string, payload: any){
    return this.http.patch(`${environment.apiUrl}/${uri}`, payload);
  }

  delete(uri: string){
    return this.http.delete(`${environment.apiUrl}/${uri}`);
  }
}
