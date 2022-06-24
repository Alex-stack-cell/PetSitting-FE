import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Pet } from 'src/app/Models/pet';
import { PetService } from 'src/app/services/update/pet.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-animal',
  templateUrl: './add-animal.component.html',
  styleUrls: ['./add-animal.component.css'],
})
export class AddAnimalComponent implements OnInit {
  auth_meta_json = localStorage.getItem('auth_meta');
  auth_meta_obj = JSON.parse(this.auth_meta_json);
  addAnimalForm: FormGroup;
  animalToAdd?: Pet = new Pet();
  pets: string[] = ['Chien', 'Chat', 'Lapin', 'Gerbille', 'Tortue'];
  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _petService: PetService
  ) {
    this.addAnimalForm = _fb.group({
      nickName: [null],
      type: [null],
      breed: [null],
      birthDate: [null],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.addAnimalForm.invalid) {
      alert('Veuillez remplir le formulaire, svp.');
    }

    Object.assign(this.animalToAdd, this.addAnimalForm.value);
    this.animalToAdd.iD_Owner = this.auth_meta_obj.Id;
    let response = this._petService.addNewPet(this.animalToAdd);

    if (response != null) {
      response.subscribe({
        next: (data) => {
          this.animalToAdd = data;
          this.showSuccessAlert(this.animalToAdd.nickName);
          this._router.navigate(['/dashboard']);
        },
        error: () => {
          this.errorAlertBox();
        },
      });
    }
  }

  showSuccessAlert(nickName: string): void {
    Swal.fire('Votre nouveau compagnon à bien été enregistré🥳');
  }

  errorAlertBox() {
    Swal.fire(
      'Oops',
      'Une erreur est survenue lors de la modification 💥',
      'error'
    );
  }
}
