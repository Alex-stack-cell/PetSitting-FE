import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/Models/Card/card';
import { CardComponent } from '../card/card.component';
@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
})
export class CardsComponent implements OnInit {
  cards: Card[];
  constructor() {}

  ngOnInit(): void {
    this.cards = [
      {
        imgSrc:
          'https://images.unsplash.com/photo-1415369629372-26f2fe60c467?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        alt: 'better for owner',
        cardIcon: '',
        cardTitle: 'Pour les propriétaires',
        cardContent:
          "Partez l'esprit tranquille en laissant vos animaux sous surveillance à la maison.",
        cardFooter: '',
      },
      {
        imgSrc:
          'https://images.unsplash.com/photo-1505628346881-b72b27e84530?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cGV0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        alt: 'better for pets',
        cardIcon: '',
        cardTitle: 'Pour les animaux',
        cardContent:
          "Vos animaux bénéficieront du confort de votre maison tout en profitant de l'attention de nos pet-sitters.",
        cardFooter: '',
      },
      {
        imgSrc:
          'https://images.unsplash.com/photo-1494947665470-20322015e3a8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        alt: 'better for sitter',
        cardIcon: '',
        cardTitle: 'Pour les pet-sitters',
        cardContent:
          "En tant que pet-sitters vous aurez l'opportunité de voyager.",
        cardFooter: '',
      },
    ];
  }
}
