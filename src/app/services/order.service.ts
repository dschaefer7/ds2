import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {HttpClient} from '@angular/common/http';
import {Order} from '../model/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  API_URL: string;
  order: Order;

  constructor(private auth: AuthService, private http: HttpClient) {
    this.API_URL = auth.API_URL;
  }


  createOrder(orderData) {
    return this.http.post(this.API_URL + '/order', orderData);
  }


}
