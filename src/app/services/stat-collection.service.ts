import { Injectable } from '@angular/core';
import { StatCollection } from '../models/stat-collection';
import { STATCOLLECTIONS } from '../mock-data/mock-stat-collections';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatCollectionService {

  private url = 'https://localhost:44385/api/statCollection';

  constructor(
  ) { }


  getStatCollections(): Observable<StatCollection[]> {
    return of(STATCOLLECTIONS);
  }

  getEntStatCollections(entId: string): Observable<StatCollection[]> {
    return of(STATCOLLECTIONS.filter(statCollection => statCollection.EntId === entId));
  }
  // getStatCollections(): Observable<StatCollection[]> {
  //   return this.http.get<StatCollection[]>(this.url)
  //     .pipe(
  //       tap(_ => this.log('fetched statCollections')),
  //       catchError(this.handleError<StatCollection[]>('getStatCollections', []))
  //     );
  // }

  getStatCollection(entId: string): Observable<StatCollection> {
    return of(STATCOLLECTIONS.find(statCollection => statCollection.EntId === entId));
  }

  // getStatCollection(name: string): Observable<StatCollection> {
  //   const url = `${this.url}/name/${name}`;
  //   return this.http.get<StatCollection>(url).pipe(
  //     tap(_ => this.log(`fetched statCollection name=${name}`)),
  //     catchError(this.handleError<StatCollection>(`getStatCollection name=${name}`))
  //   );
  // }

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

  private formattedStatCollections(statCollectionList: StatCollection[]) {

    let str = '';
    statCollectionList.forEach(statCollection => {
      str += statCollection.id;
      str += ', ';
    });

    return str;
  }

}
