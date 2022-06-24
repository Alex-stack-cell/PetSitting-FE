import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pet } from 'src/app/Models/pet';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  private _getUrl = 'http://localhost:5000/api/Pet/owner=';
  private _deleteUrl = 'http://localhost:5000/api/Pet/';
  constructor(private _http: HttpClient) {}

  getPetByOwner(id: number): Observable<any> {
    return this._http.get(this._getUrl + id);
  }
  deletePet(id: number): Observable<Pet> {
    return this._http.delete(this._deleteUrl + id);
  }
}
