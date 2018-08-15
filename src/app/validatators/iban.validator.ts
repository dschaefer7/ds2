import {Directive, forwardRef} from '@angular/core';
import {NG_VALIDATORS, AbstractControl, ValidatorFn, Validator, FormControl} from '@angular/forms';

import * as IBAN from 'iban';
// declare var IBAN: any;


// validation function
function validateIBANFactory(): ValidatorFn {
  return (c: AbstractControl) => {
    const isValid = IBAN.isValid(c.value);
     console.log("isValid",isValid);
     console.log(c);
    if (isValid) {
      return null;
    } else {
      return {
        Iban: {
          valid: false
        }
      };
    }

  };
}

@Directive({
  selector: '[iban][ngModel]',
  providers: [
    {provide: NG_VALIDATORS, useExisting: IbanValidator, multi: true}
  ]
})
export class IbanValidator implements Validator {
  validator: ValidatorFn;

  constructor() {
    this.validator = validateIBANFactory();
  }

  validate(c: FormControl) {
    return this.validator(c);
  }

}
