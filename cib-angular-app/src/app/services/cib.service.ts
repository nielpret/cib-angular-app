import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CibService {
  
  constructor(private http: HttpClient) { }
  accounts() {
    return this.http.get(environment.api_url + "/accounts",{});
  }
}
