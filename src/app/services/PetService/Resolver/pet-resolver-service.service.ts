import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Pet } from 'src/app/Models/pet';
import { PetService } from '../pet.service';

@Injectable({
  providedIn: 'root',
})
export class PetResolverServiceService implements Resolve<Pet> {
  auth_meta_json: string = localStorage.getItem('auth_meta');
  auth_meta_object: any = JSON.parse(this.auth_meta_json);

  constructor(private _petService: PetService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<Pet> {
    return this._petService.getPetByOwner(this.auth_meta_object.Id).pipe(
      catchError((error) => {
        return of('No data');
      })
    );
  }
}
