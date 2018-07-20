import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Order} from '../model/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  API_URL: string;
  order: Order;
  form: any;

  constructor(private auth: AuthService, private http: HttpClient) {
    this.API_URL = auth.API_URL;
  }


  createOrder(orderData) {
    return this.http.post(this.API_URL + '/order', orderData);
  }

  getAllOrders() {
    return this.http.get(this.API_URL + '/order');
  }

  getOrderById(orderId) {
    return this.http.get(this.API_URL + '/order/' + orderId);
  }

  deleteOrder(orderId) {
    const headers = new HttpHeaders({'X-HTTP-Method-Override': 'DELETE'});
    return this.http.post(this.API_URL + '/order/' + orderId, null,{ headers: headers});
  }

  editOrder(orderData) {
    console.log('orderData->', orderData);
    const headers = new HttpHeaders({'X-HTTP-Method-Override': 'PUT'});
    return this.http.post(this.API_URL + '/order', orderData,{ headers: headers} );
  }


}
