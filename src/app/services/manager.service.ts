import { Injectable } from '@angular/core';
import { Manager } from '../models/manager';
import { MANAGERS } from '../mock-data/mock-managers';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor() { }

  getManagers(): Observable<Manager[]> {
    return of(MANAGERS);
  }

  getManagerByName(name: string): Observable<Manager> {
    return of(MANAGERS.find(manager => manager.name === name));
  }

  getManager(id: string): Observable<Manager> {
    return of(MANAGERS.find(manager => manager.id === id));
  }
}
