import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Owner } from '../Models/owner';
import { Router } from '@angular/router';
import { AuthService } from '../services/AuthService/auth-service.service';
import { UserLogin } from '../Models/userLogin';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  userLogin: UserLogin = new UserLogin('', '');
  owner?: Owner;

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router
  ) {
    this.loginForm = this._formBuilder.group({
      userEmail: [null, Validators.required],
      userPwd: [null, Validators.required],
    });
  }

  ngOnInit(): void {}

  login(): void {
    if (this.loginForm.invalid) {
      alert('Veuillez remplir le formulaire, svp.');
    }
    const values = this.loginForm.value;

    if (values.userEmail && values.userPwd) {
      this.userLogin.email = values.userEmail;
      this.userLogin.passwd = values.userPwd;
      this._authService.login(this.userLogin).subscribe({
        next: () => {
          console.log(this._authService.getUserName());
          this.showSuccessAlert();
          this._router.navigateByUrl('/');
        },
        error: (error) => {
          this.errorAlertBox();
        },
      });
    }
    this.loginForm.reset;
  }

  showSuccessAlert(): void {
    if (this._authService.getUserName() != undefined) {
      Swal.fire(
        'Bienvenue',
        'Vous êtes connecté ' + this._authService.getUserName() + ' 🥳',
        'success'
      );
    }
    Swal.fire('Bienvenue', 'Vous êtes connecté 🥳', 'success');
  }

  errorAlertBox() {
    Swal.fire('Oops', 'Une erreur est survenue 💥', 'error');
  }
}
