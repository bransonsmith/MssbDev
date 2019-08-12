import { Component, OnInit } from '@angular/core';
import { KeyValue } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from '../models/login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    submitted = false;

    constructor(
      private formBuilder: FormBuilder,
      private router: Router
    ) { }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', [Validators.required]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        // display form values on success
        alert('Welcome Back ' + this.loginForm.value.username + '!\n\n');
        this.loginForm.reset();
        this.router.navigateByUrl('/home');
    }

    onReset() {
        this.submitted = false;
        this.loginForm.reset();
    }

}
