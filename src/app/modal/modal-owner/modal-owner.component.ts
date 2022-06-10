import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';

import { Owner } from 'src/app/Models/owner';

import Swal from 'sweetalert2';

import { OwnerSignUpService } from '../../services/owner-signUp.service';

@Component({
  selector: 'app-modal-owner',
  templateUrl: './modal-owner.component.html',
  styleUrls: ['./modal-owner.component.css'],
})
export class ModalOwnerComponent implements OnInit {
  displaySpinner?: boolean;
  ownerToAdd: Owner = new Owner(0, '', '', '', new Date(), '', null);
  ownerForm: FormGroup;
  constructor(
    private _formBuilder: FormBuilder,
    private _ownerService: OwnerSignUpService
  ) {
    this.ownerForm = this._formBuilder.group({
      ownerLastName: [null],
      ownerFirstName: [null],
      ownerBirthDate: [null, this.adultValidator()],
      ownerEmail: [
        null,
        [
          Validators.pattern(
            /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
          ),
        ],
      ],
      ownerPasswd: [
        null,
        [
          Validators.pattern(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
          ),
        ],
      ],
    });
  }

  ngOnInit(): void {}

  adultValidator(): ValidatorFn | null {
    return (control: AbstractControl) => {
      if (control.value) {
        let birthdate = new Date(control.value);
        let today = new Date();
        if (today.getFullYear() - birthdate.getFullYear() < 18) {
          return { mineur: true };
        } else {
          return null;
        }
      } else return null;
    };
  }

  onSubmit() {
    if (this.ownerForm.invalid) {
      alert('Veuillez remplir le formulaire, svp.');
    }

    this.ownerToAdd.lastName = this.ownerForm.value.ownerLastName;
    this.ownerToAdd.firstName = this.ownerForm.value.ownerFirstName;
    this.ownerToAdd.birthDate = this.ownerForm.value.ownerBirthDate;
    this.ownerToAdd.email = this.ownerForm.value.ownerEmail;
    this.ownerToAdd.passwd = this.ownerForm.value.ownerPasswd;

    this.displaySpinner = false;
    this.isSpinnerDisplayed();
    setTimeout(() => this.isSpinnerDisplayed(), 3000);

    this._ownerService.add(this.ownerToAdd).subscribe({
      next: () => {
        setTimeout(() => this.showSuccessAlert(), 3000);
      },
      error: () => {
        this.errorAlertBox();
      },
    });
    this.ownerForm.reset();
  }

  isSpinnerDisplayed(): boolean {
    if (this.displaySpinner) {
      this.displaySpinner = false;
    } else {
      this.displaySpinner = true;
    }

    return this.displaySpinner;
  }

  showSuccessAlert(): void {
    Swal.fire('Wouhou', 'Vous êtes enregistré 🥳', 'success');
  }

  errorAlertBox() {
    Swal.fire('Oops', 'Une erreur est survenue 💥', 'error');
  }
}
