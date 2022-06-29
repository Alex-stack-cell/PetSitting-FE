import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input()
  src: string;

  @Input()
  alt: string;

  @Input()
  cardTitle: string;

  @Input()
  cardContent: string;

  constructor() {}

  ngOnInit(): void {}
}
