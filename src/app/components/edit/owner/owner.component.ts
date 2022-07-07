import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/Models/Account/User';
import { OwnerService } from 'src/app/services/OwnerService/owner.service';
import { BaseUserForm } from 'src/app/components/Forms/baseUserForm';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css'],
})
export class OwnerComponent implements OnInit {
  auth_meta_json = localStorage.getItem('auth_meta');
  editForm: FormGroup;
  ownerToEdit: User = new User();
  constructor(
    private _fb: FormBuilder,
    private _ownerService: OwnerService,
    private _router: Router
  ) {
    this.editForm = _fb.group({ ...BaseUserForm });

    this._ownerService
      .getOwnerInfo(JSON.parse(this.auth_meta_json).Id)
      .subscribe((data) => {
        this.editForm.patchValue(data);
        Object.assign(this.ownerToEdit, data);
      });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.editForm.invalid) {
      alert('Veuillez remplir le formulaire, svp.');
    }
    Object.assign(this.ownerToEdit, this.editForm.value);

    let response = this._ownerService.updateOwner(
      this.ownerToEdit,
      this.ownerToEdit.id
    );
    if (response != null) {
      response.subscribe({
        next: (data) => {
          this.ownerToEdit = data;
          this.showSuccessAlert();
          this._router.navigate(['/dashboard']);
        },
        error: () => {
          this.errorAlertBox();
        },
      });
    }
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

  showSuccessAlert(): void {
    Swal.fire(
      'Bravo',
      'Vous avez bien modifié votre compte  🥳. Veuillez regarder votre boite mail ou vos spams',
      'success'
    );
  }

  errorAlertBox() {
    Swal.fire(
      'Oops',
      'Une erreur est survenue lors de la modification 💥',
      'error'
    );
  }
}
