import { Component, OnInit } from '@angular/core';
import { User } from '../../Models/Account/User';
import { Pet } from '../../Models/pet';
import { PetService } from '../../services/PetService/pet.service';
import { OwnerService } from '../../services/OwnerService/owner.service';
import { PetSitterService } from '../../services/PetSitterService/pet-sitter.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  user?: User;
  pets?: Pet[] = Array();
  petToEdit: Pet = new Pet();
  scoreBoard: number[] = Array(5); // permet d'afficher les étoiles associés aux scores
  userScore: number = 0;
  nbEmptyStar: number[] = Array(5); // nombre d'étoile vide
  nbFullStar: number[] = Array(5); // nombre d'étoile pleine
  categories: string[] = ['Chien', 'Chat', 'Lapin', 'Gerbille', 'Tortue'];
  auth_meta_json?: string = localStorage.getItem('auth_meta');
  auth_meta_object?: object = {};

  constructor(
    private _ownerService: OwnerService,
    private _petSitterService: PetSitterService,
    private _petService: PetService // private _fb: FormBuilder
  ) {
    this.petToEdit.isEdit = false;
  }

  ngOnInit(): void {
    // Récupération des info contenu dans le token (décriptée)
    // Si le contenu n'est pas vide accéder au information de l'utilisateur selon son profile
    if (this.auth_meta_json) {
      this.auth_meta_object = JSON.parse(this.auth_meta_json);
      let isOwner = this.auth_meta_object['Owner'];
      // Si le compte est un propriétaire alors on appel le controlleur du Owner
      if (isOwner == true) {
        this.petToEdit.iD_Owner = this.auth_meta_object['Id'];
        this._ownerService.getOwnerInfo(this.auth_meta_object['Id']).subscribe({
          next: (data) => {
            this.user = data; // enregistrer les données du token
            this.user.Owner = isOwner;
            this.assigningStar();
          },
        });

        this._petService.getPetByOwner(this.auth_meta_object['Id']).subscribe({
          next: (data) => {
            Object.assign(this.pets, data);
            this.pets.forEach((pet) => {
              pet.isEdit = false;
            });
          },
        });
      } else if (isOwner == false) {
        // Si le compte est un petsitter alors on appel le controlleur du PetSitter
        this._petSitterService
          .getPetSitterInfo(this.auth_meta_object['Id'])
          .subscribe({
            next: (data) => {
              this.user = data;
              this.user.Owner = isOwner;
              this.assigningStar();
            },
          });
      }
    }
  }

  assigningStar() {
    if (this.userScore != null) {
      this.nbFullStar.length = this.userScore;
      this.nbEmptyStar.length = this.scoreBoard.length - this.userScore;
    }
  }

  deletePet(nickname: string, id: number) {
    if (id != null && nickname != undefined) {
      if (
        confirm('Êtes-vous sur de vouloir supprimer le compte de ' + nickname)
      ) {
        this._petService.deletePet(id).subscribe({
          next: () => {
            this.showSuccessAlert();
            this.ngOnInit();
            // window.location.reload();
          },
        });
      }
    }
  }

  cancel(pet: Pet): boolean {
    pet.isEdit = false;
    return pet.isEdit;
  }

  editPet(pet: Pet): boolean {
    if (pet.isEdit) {
      this.petToEdit.id = pet.id;
      Object.assign(this.petToEdit, pet);
    } else {
      pet.isEdit = true;
    }
    return pet.isEdit;
  }

  savePet(pet: Pet): void {
    if (pet.isEdit) {
      let response = this._petService.updatePet(pet.id, pet);
      if (response != null) {
        response.subscribe({
          next: () => {},
          error: () => {
            this.showErrorAlert();
            this.ngOnInit();
          },
        });
      }
      pet.isEdit = false;
    }
  }

  showSuccessAlert(): void {
    Swal.fire('Vous avez bien supprimer le compte  🥳');
  }

  showErrorAlert(): void {
    Swal.fire('Oops', "Erreur lors de l'envoie", 'error');
  }
}
