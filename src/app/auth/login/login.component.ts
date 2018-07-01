import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {AuthService} from '../../services/auth.service';
import {SpinnerService} from '../../components/spinner/spinner.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  showSpinner = false;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              public spinner: SpinnerService
  ) {
    this.spinner.show('spinnerLogin');
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async login() {
    this.showSpinner = true;
    await this.delay(5000);
    const val = this.form.value;
    if (val.email && val.password) {
      this.authService.login(val.email, val.password);
    }
    this.showSpinner = false;
  }

  getValue() {
    this.authService.getValue()
      .subscribe((data) => console.log(data)
      );
  }


  ngOnInit() {
    this.addDynamicJS('https://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.3/TweenMax.min.js');
    this.addDynamicJS('/assets/js/morph.js');
    this.addDynamicJS('/assets/js/login.js');
  }

  private addDynamicJS(myScript: string): HTMLElement {
    const script = document.createElement('script');
    script.src = myScript;
    script.async = false;
    // script.defer = true;
    return document.body.appendChild(script);
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


}
