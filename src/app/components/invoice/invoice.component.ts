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
  orders;
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
    if (this.orderService.form) {
      console.log('edit order-->', this.order);
      this.orderService.editOrder(this.order)
        .subscribe((result: any) => {
          this.orderService.order = {orderId: this.order.OrderId};
          this.showSpinner = false;
          // this.order['OrderId'] = form.orderId;
          this.orderService.form = this.order;
          this.callInvoicePdf.emit();
        });
    } else {
      console.log('create order-->', this.order);
      this.orderService.createOrder(form)
        .subscribe((order: any) => {
          this.orderService.order = {orderId: order.orderId};

          this.showSpinner = false;
          this.order['OrderId'] = order.orderId;
          this.orderService.form = this.order;

          this.callInvoicePdf.emit();
        });
    }
  }


  showAllOrders() {
    this.showSpinner = true;
    this.showOrderForm = false;
    this.orderService.getAllOrders()
      .subscribe((orders: any) => {
        this.orders = orders;
        console.log(orders);

        this.showSpinner = false;
      });
  }


  deleteOrder(orderId) {
    this.orderService.deleteOrder(orderId)
      .subscribe((order: any) => {
        this.orders.splice(this.orders.findIndex(function (i) {
          return i.OrderId === orderId;
        }), 1);

        console.log('deletedOrder', order);
      });
  }

  loadOrderToEdit(OrderId: any) {
    this.orderService.getOrderById(OrderId)
      .subscribe((orderFromDb: any) => {
        this.order = orderFromDb;
        this.showOrderForm = true;
        console.log('loadOrderToEdit', orderFromDb);
      });
  }

  makeInvoice(form) {
    console.log('invoice click----------------', form);
    this.orderService.editOrder(this.order)
      .subscribe((result: any) => {
        this.orderService.order = {orderId: this.order.OrderId};
        this.orderService.order['invoice'] = true;
        this.showSpinner = false;
        // this.order['OrderId'] = form.orderId;
        this.orderService.form = this.order;
        this.callInvoicePdf.emit();
      });
  }
}
