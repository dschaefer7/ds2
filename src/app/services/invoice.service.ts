import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  API_URL: string;

  constructor(private auth: AuthService, private http: HttpClient) {
    this.API_URL = auth.API_URL;
  }


  createInvoice(orderData) {
    return this.http.post(this.API_URL + '/invoice', null);
  }




}
