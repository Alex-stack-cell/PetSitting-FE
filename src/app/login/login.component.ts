import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  FormsModule,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  private _urlOwner: string = 'http://localhost:3000/owner';

  constructor(private _formBuilder: FormBuilder /*private _http: HttpClient*/) {
    this.loginForm = this._formBuilder.group({
      userEmail: [null, Validators.required],
      userPwd: [null, Validators.required],
    });
  }

  ngOnInit(): void {}

  SubmitForm() {}
}
