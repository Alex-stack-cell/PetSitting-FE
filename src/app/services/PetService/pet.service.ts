import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pet } from 'src/app/Models/pet';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  private _getPet = 'http://localhost:5000/api/Pet/owner=';
  private _deletePet = 'http://localhost:5000/api/Pet/';
  private _addPet = 'http://localhost:5000/api/Pet/';

  constructor(private _http: HttpClient) {}

  getPetByOwner(id: number): Observable<any> {
    return this._http.get(this._getPet + id);
  }
  deletePet(id: number): Observable<Pet> {
    return this._http.delete(this._deletePet + id);
  }
  addNewPet(pet: Pet): Observable<Pet> {
    return this._http.post(this._addPet, pet);
  }
}
