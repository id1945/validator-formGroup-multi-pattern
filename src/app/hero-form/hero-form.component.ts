import { Component, OnInit } from '@angular/core';

import {
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})
export class HeroFormComponent implements OnInit {

  model = {
    name: '',
    address: '',
    email: '',
    phone: '',
    sex: ''
  };


  formGroup: FormGroup;
  isSubmit = false;

  constructor() { }

  //Check duplicate user
  validName(fc: FormControl) {
    if (fc.value.toLowerCase() === 'abc123' || fc.value.toLowerCase() === '123abc') {
      return ({ validName: true });
    } else {
      return (null);
    }
  }

  //Group Pattern Validator
  regexValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const valid = regex.test(control.value);
      return valid ? null : error;
    };
  }

  validate() {
    this.formGroup = new FormGroup({
      name: new FormControl('name', Validators.compose([
        this.validName,
        Validators.maxLength(25),
        Validators.minLength(5),
        Validators.pattern('^[0-6]+$'),
        Validators.required,
        this.regexValidator(new RegExp('^[1-4]+$'), { 'pattern2': 'false' }),
        this.regexValidator(new RegExp('^[1-3]+$'), { 'pattern3': 'false' })
      ])),
      address: new FormControl('address', Validators.required),
      email: new FormControl('email', Validators.required),
      phone: new FormControl('phone', Validators.required),
      sex: new FormControl('sex', Validators.required)
    });
  }
  get name() { return this.formGroup.controls.name; }
  get address() { return this.formGroup.controls.address; }
  get email() { return this.formGroup.controls.email; }
  get phone() { return this.formGroup.controls.phone; }
  get sex() { return this.formGroup.controls.sex; }

  ngOnInit() {
    this.validate();
  }

  onSubmit() {
    this.isSubmit = true;
    console.log(this.formGroup);
    if (this.formGroup.valid) {
      console.log('api');
    } else {
      console.log('please check again!');
    }
  }

}
