import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {LoginComponent} from './auth/login/login.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {JwtModule} from '@auth0/angular-jwt';
import {InvoiceComponent} from './components/invoice/invoice.component';
import {AuthGuard} from './auth/guards/auth.guard';
import {SpinnerComponent} from './components/spinner/spinner.component';
import { InvoicePdfComponent } from './components/invoice-pdf/invoice-pdf.component';
import {PdfViewerModule} from 'ng2-pdf-viewer';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InvoiceComponent,
    SpinnerComponent,
    InvoicePdfComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PdfViewerModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: jwtTokenGetter,
        //   () => {
        //   return localStorage.getItem('auth_token');
        // },
        whitelistedDomains: [
          'zulassungsdienst-express.de',
          'localhost:4200',
          'localhost:10270'],
        blacklistedRoutes: [
          'localhost:4200/login',
        ]
      }
    }),

    RouterModule.forRoot([
      {path: 'login', component: LoginComponent},
      {path: 'invoice', component: InvoiceComponent, canActivate: [AuthGuard]}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

export function jwtTokenGetter() {
  return localStorage.getItem('auth_token');
}

