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

  /**
   * Obtiene todos los superhéroes.
   * @returns Observable que emite un array de objetos Superhero.
   */
  getAllSuperheros(): Observable<Superhero[]> {
    return this.http.get<Superhero[]>(this.apiUrl);
  }

  /**
   * Agrega un nuevo superhéroe.
   * @param superhero Objeto Superhero que se desea agregar.
   * @returns Observable que emite el objeto Superhero agregado.
   */
  addSuperhero(superhero: Superhero): Observable<Superhero> {
    return this.http.post<Superhero>(this.apiUrl, superhero);
  }

  /**
   * Elimina un superhéroe por su ID.
   * @param id ID del superhéroe que se desea eliminar.
   */
  deleteSuperhero(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  /**
   * Edita un superhéroe.
   * @param superhero Objeto Superhero actualizado.
   * @returns Observable que emite el objeto Superhero actualizado.
   */
  editSuperhero(superhero: Superhero): Observable<Superhero> {
    const url = `${this.apiUrl}/${superhero.id}`;
    return this.http.put<Superhero>(url, superhero);
  }
}
