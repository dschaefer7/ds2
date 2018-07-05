import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {OrderService} from '../../services/order.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent {

  @Output() callInvoicePdf = new EventEmitter();

  constructor(private orderService: OrderService) {
  }


  submit(form) {
    this.orderService.createOrder(form)
      .subscribe((order: any) => {
        //this.orderService.orderId = order.orderId;
         this.orderService.order = {orderId: order.orderId};
         console.log(this.orderService.order);
        this.callInvoicePdf.emit();
      });
    console.log(form);
  }

}
