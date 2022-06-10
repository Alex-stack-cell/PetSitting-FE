import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';

import { PetSitter } from 'src/app/Models/petSitter';

import { PetSitterSigneUpService } from 'src/app/services/pet-sitter-signe-up.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-pet-sitter',
  templateUrl: './modal-pet-sitter.component.html',
  styleUrls: ['./modal-pet-sitter.component.css'],
})
export class ModalPetSitterComponent implements OnInit {
  displaySpinner?: boolean;
  pets: string[] = ['Chien', 'Chat', 'Lapin', 'Gerbille', 'Tortue'];
  petSitterForm: FormGroup;
  petSitterToAdd: PetSitter = new PetSitter(
    0,
    '',
    '',
    '',
    new Date(),
    '',
    null,
    null
  );

  constructor(
    private _formBuilder: FormBuilder,
    private _petSitterService: PetSitterSigneUpService
  ) {
    this.petSitterForm = _formBuilder.group({
      petSitterLastName: [null],
      petSitterFirstName: [null],
      petSitterBirthDate: [null, this.adultValidator()],
      petSitterEmail: [
        null,
        [
          Validators.pattern(
            /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
          ),
        ],
      ],
      petSitterPasswd: [
        null,
        [
          Validators.pattern(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
          ),
        ],
      ],
      petPreference: [null],
    });
  }

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

  ngOnInit(): void {}

  onSubmit() {
    if (this.petSitterForm.invalid) {
      alert('Veuillez remplir le formulaire, svp.');
    }

    this.petSitterToAdd.lastName = this.petSitterForm.value.petSitterLastName;
    this.petSitterToAdd.firstName = this.petSitterForm.value.petSitterFirstName;
    this.petSitterToAdd.birthDate = this.petSitterForm.value.petSitterBirthDate;
    this.petSitterToAdd.email = this.petSitterForm.value.petSitterEmail;
    this.petSitterToAdd.passwd = this.petSitterForm.value.petSitterPasswd;
    this.petSitterToAdd.petPreference = this.petSitterForm.value.petPreference;

    this.displaySpinner = false;
    this.isSpinnerDisplayed();
    setTimeout(() => this.isSpinnerDisplayed(), 3000);

    this._petSitterService.add(this.petSitterToAdd).subscribe({
      next: () => {
        setTimeout(() => this.showSuccessAlert(), 3000);
      },
      error: () => {
        this.errorAlertBox();
      },
    });
    this.petSitterForm.reset();
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
