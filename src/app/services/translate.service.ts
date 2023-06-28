import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  private data: any;

  constructor(private http: HttpClient) { }

  /**
   * Obtiene los datos de traducción del archivo JSON correspondiente al idioma del navegador.
   * @returns Promesa que se resuelve cuando se han cargado los datos de traducción correctamente.
   * Rechaza la promesa si ocurre algún error en la carga de los datos.
   */
  public getData() {
    return new Promise((resolve, reject) => {
      this.http.get('assets/translations/' + navigator.language + '.json').subscribe(data => {
        this.data = data;
        resolve(true);
      }, error => {
        console.error('Error al recuperar las traducciones: ' + error);
        reject(true);
      })
    })
  }

  /**
   * Obtiene la traducción correspondiente a una palabra o frase.
   * @param word Palabra o frase a traducir.
   * @returns Traducción correspondiente o una cadena vacía si no se encuentra la traducción.
   */
  public getTranslate(word: string){
    return this.data[word];
  }
}
