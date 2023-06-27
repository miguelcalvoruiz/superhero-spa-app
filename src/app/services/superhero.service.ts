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

  addSuperhero(superhero: Superhero): Observable<Superhero> {
    return this.http.post<Superhero>(this.apiUrl, superhero);
  }

  deleteSuperhero(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  editSuperhero(superhero: Superhero): Observable<Superhero> {
    console.log(superhero.id);
    
    const url = `${this.apiUrl}/${superhero.id}`;
    return this.http.put<Superhero>(url, superhero);
  }
}
