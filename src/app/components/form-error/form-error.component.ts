import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { InfoIconComponent } from '../info-icon/info-icon.component';
@Component({
  selector: 'app-form-error',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.css'],
})
export class FormErrorComponent implements OnInit {
  @Input()
  control: AbstractControl;

  @Input()
  patternMessage: string;

  @Input()
  requiredMessage: string;

  constructor() {}

  ngOnInit(): void {}
}
