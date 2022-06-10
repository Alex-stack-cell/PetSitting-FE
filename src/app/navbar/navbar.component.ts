import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Link } from '../Models/link';
import { AuthService } from '../services/auth-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  menu: Link[] = [
    { name: 'PetSitting', url: '/' },
    { name: 'Chercher un pet sitter', url: '' },
    { name: 'Chercher un pet sitting', url: '' },
    { name: 'Comment ca marche ?', url: '' },
    { name: 'Connexion', url: '/login' },
    { name: "S'inscrire", url: '' },
    { name: 'Déconnection', url: '' },
  ];
  constructor(public auth: AuthService, private _router: Router) {}

  ngOnInit(): void {}

  logout(): void {
    this.auth.logout();
    this._router.navigate(['/']);
  }
}
