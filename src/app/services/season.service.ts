import { Injectable } from '@angular/core';
import { Season } from '../models/season';
import { SEASONS } from '../mock-data/mock-seasons';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeasonService {

  constructor() { }

  getSeasons(): Observable<Season[]> {
    return of(SEASONS);
  }

  getSeasonByName(name: string): Observable<Season> {
    return of(SEASONS.find(season => season.name === name));
  }

  getSeason(id: string): Observable<Season> {
    return of(SEASONS.find(season => season.id === id));
  }
}