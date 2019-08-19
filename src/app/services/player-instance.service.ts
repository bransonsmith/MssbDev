import { Injectable } from '@angular/core';
import { PlayerInstance } from '../models/player-instance';
import { Observable, of } from 'rxjs';
import { PLAYERINSTANCES } from '../mock-data/mock-player-instances';

@Injectable({
  providedIn: 'root'
})
export class PlayerInstanceService {

  constructor(
  ) { }

  getPlayerInstances(): Observable<PlayerInstance[]> {
    return of(PLAYERINSTANCES);
  }

  getPlayerInstance(id: string): Observable<PlayerInstance> {
    return of(PLAYERINSTANCES.find(playerInstance => playerInstance.id === id));
  }

  getPlayerInstancesWithEntId(entId: string): Observable<PlayerInstance[]> {
    return of(PLAYERINSTANCES.filter(playerInstance => playerInstance.CharacterId === entId || playerInstance.TeamId === entId));
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

  private formattedPlayerInstances(playerInstanceList: PlayerInstance[]) {

    let str = '';
    playerInstanceList.forEach(playerInstance => {
      str += playerInstance.id;
      str += ', ';
    });

    return str;
  }
}
