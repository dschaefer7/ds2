import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  API_URL: string;
  order: any;

  constructor(private auth: AuthService, private http: HttpClient) {
    this.API_URL = auth.API_URL;
  }


  createOrder(orderData) {
    return this.http.post(this.API_URL + '/order', orderData);
  }




}
