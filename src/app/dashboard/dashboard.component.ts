import { Component, OnInit } from '@angular/core';
import { User } from '../Models/Account/User';
import { Pet } from '../Models/pet';
import { PetService } from '../services/PetService/pet.service';
import { OwnerService } from '../services/OwnerService/owner.service';
import { PetSitterService } from '../services/PetSitterService/pet-sitter.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  user?: User;
  isEdited: boolean = false;
  pets?: Pet[] = Array();
  petToEdit: Pet = new Pet();
  birthDate?: string;
  editForm?: FormGroup;
  scoreBoard: number[] = Array(5); // permet d'afficher les étoiles associés aux scores
  userScore: number = 0;
  nbEmptyStar: number[] = Array(5); // nombre d'étoile vide
  nbFullStar: number[] = Array(5); // nombre d'étoile pleine
  categories: string[] = ['Chien', 'Chat', 'Lapin', 'Gerbille', 'Tortue'];
  auth_meta_json?: string = localStorage.getItem('auth_meta');

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _ownerService: OwnerService,
    private _petSitterService: PetSitterService,
    private _petService: PetService,
    private _router: Router,
    private _fb: FormBuilder
  ) {
    this.editForm = _fb.group({
      nickName: [null],
      type: [null],
      breed: [null],
      birthDate: [null],
    });
    this.petToEdit.isEdit = false;
  }

  ngOnInit(): void {
    // Récupération des info contenu dans le token (décriptée)
    // let auth_meta_json = localStorage.getItem('auth_meta');
    // let auth_tkn = localStorage.getItem('auth_tkn');
    // Si le contenu n'est pas vide accéder au information de l'utilisateur selon son profile
    if (this.auth_meta_json) {
      let auth_meta_object = JSON.parse(this.auth_meta_json);
      let isOwner = auth_meta_object.Owner;
      // Si le compte est un propriétaire alors on appel le controlleur du Owner
      if (isOwner == true) {
        this._ownerService.getOwnerInfo(auth_meta_object.Id).subscribe({
          next: (data) => {
            this.user = data; // enregistrer les données du token
            this.user.Owner = isOwner;
            this.assigningStar();
            this.formattingDate(this.user.birthDate);
          },
        });

        // ne fonctionne pas
        // this._activatedRoute.data.subscribe((response: any) => {
        //   this.pets = response.pets;
        //   this.pets.forEach((pet) => {
        //     pet.isEdit = false;
        //   });
        // });

        this._petService.getPetByOwner(auth_meta_object.Id).subscribe({
          next: (data) => {
            Object.assign(this.pets, data);
            this.pets.forEach((pet) => {
              pet.isEdit = false;
            });
            console.log(this.pets);
          },
        });
      } else if (isOwner == false) {
        // Si le compte est un petsitter alors on appel le controlleur du PetSitter
        this._petSitterService.getPetSitterInfo(auth_meta_object.Id).subscribe({
          next: (data) => {
            this.user = data;
            this.user.Owner = isOwner;
            this.assigningStar();
            this.formattingDate(this.user.birthDate);
          },
        });
      }
    }
  }

  //Formatte la date en JJ/MM/AAAA
  formattingDate(userDate: Date | undefined) {
    if (userDate != undefined) this.birthDate = userDate.toString();
    this.birthDate =
      this.birthDate?.substring(8, 10) +
      '/' +
      this.birthDate?.substring(5, 7) +
      '/' +
      this.birthDate?.substring(0, 4);
  }

  assigningStar() {
    if (this.userScore != null) {
      this.nbFullStar.length = this.userScore;
      this.nbEmptyStar.length = this.scoreBoard.length - this.userScore;
    }
  }

  deletePet(nickname: string, id: number) {
    if (id != undefined && nickname != undefined) {
      if (
        confirm('Êtes-vous sur de vouloir supprimer le compte de ' + nickname)
      ) {
        this._petService.deletePet(id).subscribe({
          next: () => {
            this.showSuccessAlert();
          },
        });
      }
    }
  }

  editPet(pet: Pet): boolean {
    if (pet.isEdit) {
      this.submitModification(pet.id);
      pet.isEdit = false;
    } else {
      pet.isEdit = true;
    }
    return pet.isEdit;
  }

  submitModification(id: number | null): void {
    Object.assign(this.petToEdit, this.editForm.value);
    this.isEdited = false;
    this.petToEdit.iD_Owner = this.petToEdit.id = id;
    if (this.auth_meta_json) {
      let auth_meta_object = JSON.parse(this.auth_meta_json);
      this.petToEdit.iD_Owner = auth_meta_object.Id;
    }
    let response = this._petService.updatePet(
      this.petToEdit.id,
      this.petToEdit
    );
    if (response != null) {
      response.subscribe({
        next: (data) => {
          this.petToEdit = data;
        },
      });
    }
  }

  showSuccessAlert(): void {
    Swal.fire('Vous avez bien supprimer le compte  🥳');
  }
}
