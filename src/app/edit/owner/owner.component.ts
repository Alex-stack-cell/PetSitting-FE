import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Owner } from 'src/app/Models/owner';
import { OwnerService } from 'src/app/services/update/owner.service';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css'],
})
export class OwnerComponent implements OnInit {
  auth_meta_json = localStorage.getItem('auth_meta');
  editForm: FormGroup;
  ownerToEdit: Owner = new Owner(0, '', '', '', new Date(), '', null);
  constructor(private _fb: FormBuilder, private _ownerService: OwnerService) {
    this.editForm = _fb.group(
      {
        ownerLastName: [null],
        ownerFirstName: [null],
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
        confirmOwnerPasswd: [null],
      },
      { validator: this.checkPassword } // validation de la cohérence des mdp fournis
    );
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.editForm.invalid) {
      alert('Veuillez remplir le formulaire, svp.');
    }

    if (this.auth_meta_json) {
      let auth_meta_object = JSON.parse(this.auth_meta_json);
      this.ownerToEdit.id = auth_meta_object.Id;
      this.ownerToEdit.lastName = this.editForm.value.ownerLastName;
      this.ownerToEdit.firstName = this.editForm.value.ownerFirstName;
      this.ownerToEdit.email = this.editForm.value.ownerEmail;
      this.ownerToEdit.passwd = this.editForm.value.ownerPasswd;
    }

    console.log(this.ownerToEdit);
  }

  // Vérifie la cohérence du mdp modifié
  checkPassword(fg: FormGroup) {
    if (
      fg.get('ownerPasswd')?.value != '' &&
      fg.get('confirmOwnerPasswd')?.value != ''
    ) {
      if (
        fg.get('ownerPasswd')?.value !== fg.get('confirmOwnerPasswd')?.value
      ) {
        return { password: true };
      } else return null;
    } else {
      return null;
    }
  }
}
