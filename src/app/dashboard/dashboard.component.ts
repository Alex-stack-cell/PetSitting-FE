import { Component, OnInit } from '@angular/core';
import { Owner } from '../Models/owner';
import { UserLogin } from '../Models/userLogin';
import { OwnerService } from '../services/signIn/owner.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  owner?: Owner;
  birthDate?: string;
  score: number[] = []; // permet d'afficher les étoiles des scores
  constructor(private _ownerService: OwnerService) {}

  ngOnInit(): void {
    // Récupération des info contenu dans le token (décriptée)
    let auth_meta_json = localStorage.getItem('auth_meta');
    // Si le contenu n'est pas vide accéder au information de l'utilisateur selon son profile
    if (auth_meta_json) {
      let auth_meta_object = JSON.parse(auth_meta_json);
      let isOwner = auth_meta_object.Owner;

      // Si le compte est un propriétaire alors on appel utilise le controlleur du Owner
      if (isOwner == 'True') {
        this._ownerService.getInfo(auth_meta_object.Id).subscribe({
          next: (data) => {
            this.owner = data[0]; // enregistrer les données du token
            let limit = this.owner?.score; // permet de définir la taille du tableau pour boucler n fois afin d'afficher les icones

            if (limit) {
              for (let i = 0; i < limit; i++) {
                this.score.push(i);
              }
            }

            this.formattingDate();
          },
        });
      }
    }
  }

  //Formatte la date en JJ/MM/AAAA
  formattingDate() {
    if (this.owner?.birthDate)
      this.birthDate = this.owner?.birthDate.toString();

    this.birthDate =
      this.birthDate?.substring(8, 10) +
      '/' +
      this.birthDate?.substring(5, 7) +
      '/' +
      this.birthDate?.substring(0, 4);
  }
}
