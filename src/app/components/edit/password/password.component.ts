import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UpdatePasswordForm } from 'src/app/Models/Forms/UpdatePasswordForm';
import { OwnerService } from 'src/app/services/OwnerService/owner.service';
import { PetService } from 'src/app/services/PetService/pet.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css'],
})
export class PasswordComponent implements OnInit {
  passwordForm: FormGroup;
  passwordMatch: boolean = false;
  auth_meta_obj: Object = JSON.parse(localStorage.getItem('auth_meta'));
  constructor(private _fb: FormBuilder) {
    this.passwordForm = this._fb.group({ ...UpdatePasswordForm });
  }

  ngOnInit(): void {
    console.log(this.auth_meta_obj['Owner']);
  }

  SubmitForm() {
    if (this.passwordForm.valid && this.confirmPassword()) {
      console.log(this.passwordForm.value);
    }
  }

  confirmPassword(): boolean {
    if (
      this.passwordForm.value['newPassword'] ==
      this.passwordForm.value['confirmNewPassword']
    ) {
      this.passwordMatch = true;
    } else {
      this.passwordMatch = false;
    }
    return this.passwordMatch;
  }
}
