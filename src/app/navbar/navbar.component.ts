import { Component, OnInit } from '@angular/core';
import { Link } from '../Models/link';

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
    { name: 'Connection', url: '/login' },
    { name: "S'inscrire", url: '' },
  ];
  constructor() {}

  ngOnInit(): void {}
}
