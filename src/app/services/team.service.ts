import { Injectable } from '@angular/core';
import { Team } from '../models/team';
import { TEAMS } from '../mock-data/mock-teams';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private url = 'https://localhost:44385/api/team';

  constructor(
  ) { }

  getTeams(): Observable<Team[]> {
    return of(TEAMS);
  }

  getTeam(name: string): Observable<Team> {
    return of(TEAMS.find(team => team.name === name));
  }

  getTeamsForSeason(id: string): Observable<Team[]> {
    return of(TEAMS.filter(team => team.seasonId === id));
  }

  getTeamsForManager(id: string): Observable<Team[]> {
    return of(TEAMS.filter(team => team.managerId === id));
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

}
