import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl(),
      'password': new FormControl()
    });
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService.loginUser(form.value.email, form.value.password);
  }
}
