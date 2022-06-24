import { Component, OnInit } from '@angular/core';
import { User } from '../Models/Account/User';
import { Pet } from '../Models/pet';
import { PetService } from '../services/read/pet.service';
import { OwnerService } from '../services/signIn/owner.service';
import { PetSitterService } from '../services/signIn/pet-sitter.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  user?: User;
  isEdited: boolean = false;
  pets?: Pet[] = Array();
  birthDate?: string;
  scoreBoard: number[] = Array(5); // permet d'afficher les étoiles associés aux scores
  userScore: number = 0;
  nbEmptyStar: number[] = Array(5); // nombre d'étoile vide
  nbFullStar: number[] = Array(5); // nombre d'étoile pleine
  constructor(
    private _ownerService: OwnerService,
    private _petSitterService: PetSitterService,
    private _petService: PetService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    // Récupération des info contenu dans le token (décriptée)
    let auth_meta_json = localStorage.getItem('auth_meta');
    // let auth_tkn = localStorage.getItem('auth_tkn');
    // Si le contenu n'est pas vide accéder au information de l'utilisateur selon son profile
    if (auth_meta_json) {
      let auth_meta_object = JSON.parse(auth_meta_json);
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
        this._petService.getPetByOwner(auth_meta_object.Id).subscribe({
          next: (data) => {
            Object.assign(this.pets, data);
            this.pets.map((pet) => {
              this.formattingDate(pet.birthDate);
            });
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
        // let auth_meta_json = localStorage.getItem('auth_meta');
        // let auth_meta_object = JSON.parse(auth_meta_json);
        this._petService.deletePet(id).subscribe({
          next: () => {
            this.showSuccessAlert();
            window.location.reload();
            // this._petService.getPetByOwner(auth_meta_object.Id).subscribe({
            //   next: (data) => {
            //     Object.assign(this.pets, data);
            //   },
            // });
          },
          error: () => {
            this.errorAlertBox();
          },
        });
      }
    }
  }

  editPet(): boolean {
    if (this.isEdited) {
      this.isEdited = false;
    } else {
      this.isEdited = true;
    }
    console.log(this.isEdited);
    return this.isEdited;
  }

  showSuccessAlert(): void {
    Swal.fire('Vous avez bien supprimer le compte  🥳');
  }

  errorAlertBox() {
    Swal.fire(
      'Oops',
      'Une erreur est survenue lors de la supression. 💥',
      'error'
    );
  }
}
