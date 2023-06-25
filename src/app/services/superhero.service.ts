import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Superhero } from '../models/superhero';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuperheroService {

  private apiUrl = 'http://localhost:3000/superheroes';

  constructor(private http: HttpClient) { }

  getAllSuperheros(): Observable<Superhero[]> {
    return this.http.get<Superhero[]>(this.apiUrl);
  }
}
