import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/Account/User';
import { BaseUserForm } from 'src/app/components/Forms/baseUserForm';
import { PetSitterService } from 'src/app/services/PetSitterService/pet-sitter.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pet-sitter',
  templateUrl: './pet-sitter.component.html',
  styleUrls: ['./pet-sitter.component.css'],
})
export class PetSitterComponent implements OnInit {
  auth_meta_json = localStorage.getItem('auth_meta');
  editForm: FormGroup;
  petSitterToEdit: User = new User();
  pets: string[] = ['Chien', 'Chat', 'Lapin', 'Gerbille', 'Tortue'];

  constructor(
    private _fb: FormBuilder,
    private _petSitterService: PetSitterService,
    private _router: Router
  ) {
    this.editForm = _fb.group({ ...BaseUserForm, petPreference: [null] });

    this._petSitterService
      .getPetSitterInfo(JSON.parse(this.auth_meta_json).Id)
      .subscribe((data) => {
        this.editForm.patchValue(data);
        Object.assign(this.petSitterToEdit, data);
      });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.editForm.invalid) {
      alert('Veuillez remplir le formulaire, svp.');
    }
    Object.assign(this.petSitterToEdit, this.editForm.value);

    let response = this._petSitterService.updatePetSitterInfo(
      this.petSitterToEdit,
      this.petSitterToEdit.id
    );
    if (response != null) {
      response.subscribe({
        next: (data) => {
          this.petSitterToEdit = data;
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
      fg.get('petSitterPasswd')?.value != '' &&
      fg.get('confirmPetSitterPasswd')?.value != ''
    ) {
      if (
        fg.get('petSitterPasswd')?.value !==
        fg.get('confirmPetSitterPasswd')?.value
      ) {
        return { password: true };
      } else return null;
    } else {
      return null;
    }
  }

  showSuccessAlert(): void {
    Swal.fire('Bravo', 'Vous avez bien modifié votre compte  🥳', 'success');
  }

  errorAlertBox() {
    Swal.fire(
      'Oops',
      'Une erreur est survenue lors de la modification 💥',
      'error'
    );
  }
}
