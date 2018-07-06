import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {OrderService} from '../../services/order.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent {

  @Output() callInvoicePdf = new EventEmitter();

  order: any = {};

  constructor(private orderService: OrderService) {

    console.log('---',orderService.form);

    if (orderService.form) {
      this.order = orderService.order;
    }
  }


  submit(form) {
    this.orderService.createOrder(form)
      .subscribe((order: any) => {
        this.orderService.order = {orderId: order.orderId};
        this.callInvoicePdf.emit();
      });
    this.orderService.form = this.order;
    console.log(this.order);
    // console.log(form);
  }

}
