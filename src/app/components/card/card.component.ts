import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input()
  imgSrc: string;

  @Input()
  alt: string;

  @Input()
  cardIcon: string;

  @Input()
  cardTitle: string;

  @Input()
  cardContent: string;

  @Input()
  cardFooter: string;

  constructor() {}

  ngOnInit(): void {}
}
