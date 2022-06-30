import { Component, OnInit } from '@angular/core';
import { footer } from '../Models/Footer/footer';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  footerOne: footer[];
  footerTwo: footer[];

  constructor() {}

  ngOnInit(): void {
    this.footerOne = [
      {
        sectionTitle: 'Aide',
        section: [
          { title: 'Comment ca marche ?', link: '#' },
          { title: 'Help desk', link: '#' },
          { title: 'FAQ', link: '#' },
        ],
      },
      {
        sectionTitle: 'À propos',
        section: [
          { title: 'À propos', link: '#' },
          { title: 'Blog', link: '#' },
        ],
      },
    ];

    this.footerTwo = [
      {
        copyright: '© 2022 PetSitting, Inc. All rights reserved.',
        socialIcons: [
          { icon: 'fa fa-facebook', link: '#' },
          { icon: 'fa fa-instagram', link: '#' },
          { icon: 'fa fa-twitter', link: '#' },
        ],
      },
    ];
  }
}
