import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {OrderService} from '../../services/order.service';
import {SpinnerService} from '../spinner/spinner.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent {

  @Output() callInvoicePdf = new EventEmitter();

  public order: any = {};
  orders$;
  showOrderForm = true;
  showSpinner = false;

  constructor(private orderService: OrderService,
              public spinner: SpinnerService) {
    console.log('---', orderService.form);
    if (orderService.form) {
      this.order = orderService.form;
    }
  }


  submit(form) {
    this.showSpinner = true;
    this.orderService.createOrder(form)
      .subscribe((order: any) => {
        this.orderService.order = {orderId: order.orderId};
        this.callInvoicePdf.emit();
        this.showSpinner = false;
      });
    this.orderService.form = this.order;
    console.log(form);
    // console.log(form);
  }

  showAllOrders() {
    this.showOrderForm = false;
    this.orders$ = this.orderService.getAllOrders();
    //   .subscribe((orders: any) => {
    //   this.orders = orders;
    // });
  }
}
