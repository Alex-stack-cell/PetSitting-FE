import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pet } from 'src/app/Models/pet';

@Component({
  selector: 'app-add-animal',
  templateUrl: './add-animal.component.html',
  styleUrls: ['./add-animal.component.css'],
})
export class AddAnimalComponent implements OnInit {
  auth_meta_json = localStorage.getItem('auth_meta');
  addAnimalForm: FormGroup;
  animalToAdd?: Pet;
  pets: string[] = ['Chien', 'Chat', 'Lapin', 'Gerbille', 'Tortue'];
  constructor(private _fb: FormBuilder) {
    this.addAnimalForm = _fb.group({
      nickName: [null],
      type: [null],
      breed: [null],
      birthDate: [null],
    });
  }

  ngOnInit(): void {}

  Submit() {}
}
