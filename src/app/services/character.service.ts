import { Injectable } from '@angular/core';
import { Character } from '../models/character';
import { CHARACTERS } from '../mock-data/mock-characters';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(
  ) { }

  private url = 'https://localhost:44385/api/character';

  // getCharacters(): Observable<Character[]> {
  //   return this.http.get<Character[]>(this.url)
  //     .pipe(
  //       tap(_ => this.log('fetched teams')),
  //       catchError(this.handleError<Character[]>('getCharacters', []))
  //     );
  // }

  // getCharacter(id: string): Observable<Character> {
  //   const url = `${this.url}/${id}`;
  //   return this.http.get<Character>(url).pipe(
  //     tap(_ => this.log(`fetched Character id=${id}`)),
  //     catchError(this.handleError<Character>(`getCharacter id=${id}`))
  //   );
  // }

  // getCharacterByName(name: string): Observable<Character> {
  //   const url = `https://localhost:44385/api/character/name/${name}`;
  //   return this.http.get<Character>(url).pipe(
  //     tap(_ => this.log(`fetched Character name=${name}`)),
  //     catchError(this.handleError<Character>(`getCharacter name=${name}`))
  //   );
  // }

  getCharacter(id: string): Character {
    return CHARACTERS.find(character => character.id === id);
  }

  getCharacters(): Observable<Character[]> {
    return of(CHARACTERS);
  }

  getCharacterByName(name: string): Character {
    let charToReturn = null;
    CHARACTERS.forEach(c => {
      if (c.name === name) {
        charToReturn = c;
        return charToReturn;
      }
    });

    return charToReturn;
  }

  private log(message: string) {
    console.log(message);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private formattedCharacters(characterList: Character[]) {

    let str = '';
    characterList.forEach(character => {
      str += character.name;
      str += ', ';
    });

    return str;
  }

}
