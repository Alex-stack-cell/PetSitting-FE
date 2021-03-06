import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UpdatePasswordForm } from 'src/app/Models/Forms/UpdatePasswordForm';
import { OwnerService } from 'src/app/services/OwnerService/owner.service';
import { PetService } from 'src/app/services/PetService/pet.service';
import { PasswdUpdated } from 'src/app/Models/PasswdUpdated';
import { PetSitterService } from 'src/app/services/PetSitterService/pet-sitter.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css'],
})
export class PasswordComponent implements OnInit {
  passwordToUpdate: PasswdUpdated = new PasswdUpdated();
  passwordForm: FormGroup;
  isPasswordValid: boolean = false;
  passwordMatch: boolean = false;
  auth_meta_obj: Object = JSON.parse(localStorage.getItem('auth_meta'));
  constructor(
    private _fb: FormBuilder,
    private _ownerService: OwnerService,
    private _petSitterService: PetSitterService,
    private _router: Router
  ) {
    this.passwordForm = this._fb.group({ ...UpdatePasswordForm });
  }

  ngOnInit(): void {}

  SubmitForm() {
    if (this.passwordForm.valid) {
      console.log('Test');
      let tkn = JSON.parse(localStorage.getItem('auth_meta'));
      Object.assign(this.passwordToUpdate, this.passwordForm.value);
      this.passwordToUpdate.id = tkn['Id'];

      if (tkn['Owner']) {
        this._ownerService.updatePasswd(this.passwordToUpdate).subscribe({
          next: () => {
            this.showSuccessAlert();
            this._router.navigateByUrl('/dashboard');
          },
          error: () => {
            this.errorAlertBox();
          },
        });
      } else if (tkn['Owner'] == false) {
        console.log('test');

        this._petSitterService.updatePasswd(this.passwordToUpdate).subscribe({
          next: () => {
            this.showSuccessAlert();
            this._router.navigateByUrl('/dashboard');
          },
          error: () => {
            this.errorAlertBox();
          },
        });
      }
    }
  }

  validatePassword(): boolean {
    if (
      this.passwordForm.value['currentPassword'] !=
      this.passwordForm.value['newPassword']
    ) {
      this.isPasswordValid = true;
    } else {
      this.isPasswordValid = false;
    }
    return this.isPasswordValid;
  }

  confirmPassword(): boolean {
    if (
      this.passwordForm.value['newPassword'] ==
      this.passwordForm.value['confirmNewPassword']
    ) {
      this.passwordMatch = true;
    } else {
      this.passwordMatch = false;
    }
    return this.passwordMatch;
  }

  showSuccessAlert(): void {
    Swal.fire(
      'Bravo',
      'Votre mot de passe a bien ??t?? modifi??. Veuillez regarder votre boite mail ou vos spams',
      'success'
    );
  }

  errorAlertBox() {
    Swal.fire(
      'Oops',
      'Une erreur est survenue lors de la modification ????',
      'error'
    );
  }
}
