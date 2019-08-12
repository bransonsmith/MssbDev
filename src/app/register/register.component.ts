import { Component, OnInit } from '@angular/core';
import { KeyValue } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from './_helpers/must-match.validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', [Validators.required, Validators.minLength(6)]],
          passwordConfirmation: ['', Validators.required]
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.value.password !== this.registerForm.value.passwordConfirmation) {
        alert('FAILED TO REGISTER. Password must match Password Confirmation\n\n');
        return;
      }

      if (this.registerForm.invalid) {
          return;
      }

      // display form values on success
      alert('Registered Successfully! Welcome to the club!\n\n');
      // alert('Registered Successfully! Welcome to the club!\n\n' + JSON.stringify(this.registerForm.value, null, 4));
      this.registerForm.reset();
      this.router.navigateByUrl('/home');
    }

  onReset() {
      this.submitted = false;
      this.registerForm.reset();
  }
}
