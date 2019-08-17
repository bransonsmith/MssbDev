import { Injectable } from '@angular/core';
import { Team } from '../models/team';
import { TEAMS } from '../mock-data/mock-teams';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private url = 'https://localhost:44385/api/team';

  constructor(
    private http: HttpClient
  ) { }


  getTeams(): Observable<Team[]> {
    return of(TEAMS);
  }

  // getTeams(): Observable<Team[]> {
  //   return this.http.get<Team[]>(this.url)
  //     .pipe(
  //       tap(_ => this.log('fetched teams')),
  //       catchError(this.handleError<Team[]>('getTeams', []))
  //     );
  // }

  getTeam(name: string): Observable<Team> {
    return of(TEAMS.find(team => team.name === name));
  }

  // getTeam(name: string): Observable<Team> {
  //   const url = `${this.url}/name/${name}`;
  //   return this.http.get<Team>(url).pipe(
  //     tap(_ => this.log(`fetched team name=${name}`)),
  //     catchError(this.handleError<Team>(`getTeam name=${name}`))
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

  private formattedTeams(teamList: Team[]) {

    let str = '';
    teamList.forEach(team => {
      str += team.name;
      str += ', ';
    });

    return str;
  }

}
