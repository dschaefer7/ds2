import {Component} from '@angular/core';
import {AuthService} from './services/auth.service';
import {SpinnerService} from './components/spinner/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  showSpinner = false;

  private isShowInvoiceFormular = true;
  isShowInfoicePdf = false;

  constructor(private auth: AuthService, public spinner: SpinnerService) {
  }


  isAuthentificated() {
    return this.auth.isAuthenticated;
    // if (this.auth.isAuthenticated) {
    //   this.showInvoiceFormular = true;
    //   this.showInfoicePdf = false;
    //   return true;
    // } else {
    //   this.showInvoiceFormular = false;
    //   this.showInfoicePdf = false;
    //   return false;
    // }
  }

  onCallInvoicePdf() {
    this.isShowInvoiceFormular = false;
    this.isShowInfoicePdf = true;
    console.log(this.showInvoiceFormular);
    console.log(this.isShowInfoicePdf);
  }

  showInvoiceFormular(){
    return this.auth.isAuthenticated && this.isShowInvoiceFormular;
  }

  showInvoicePdf(){
    return this.auth.isAuthenticated && this.isShowInfoicePdf;
  }

}
