import { Component, OnInit } from '@angular/core';
import { Character } from '../models/character';
import { SortStat } from '../models/sort-stat';
import { isPrimitive } from 'util';
import { ActivatedRoute, Router } from '@angular/router';
import { CHARACTERS } from '../mock-data/mock-characters';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-match-up',
  templateUrl: './match-up.component.html',
  styleUrls: ['./match-up.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class MatchUpComponent implements OnInit {

  unpickedCharacters: Character[] = CHARACTERS;

  leftRoster: Character[] = this.getEmptyRoster();
  rightRoster: Character[] = this.getEmptyRoster();

  sortedStat: string;

  dataSource = this.unpickedCharacters;
  columnsToDisplay = ['name'];
  // expandedElement: PeriodicElement | null;

  constructor() { }

  ngOnInit() {
  }

  getRatingTotal(character: Character) {
    const ratingTotalStat: SortStat = {
      value: String(character.bat + character.run + character.field + character.pitch),
      isPrimary: this.sortedStat === "Total",
      name: "Total"
    };

    return ratingTotalStat;
  }

  getNumber(character: Character) {
    if (character.id == null) {
      return "  ";
    }
    return character.id;
  }

  getBatStat(character: Character) {
    const batStat: SortStat = {
      value: String(character.bat),
      isPrimary: this.sortedStat === "Batting",
      name: "Batting"
    };

    return batStat;
  }

  getRunStat(character: Character) {
    const batStat: SortStat = {
      value: String(character.run),
      isPrimary: this.sortedStat === "Running",
      name: "Running"
    };

    return batStat;
  }

  getFieldStat(character: Character) {
    const batStat: SortStat = {
      value: String(character.field),
      isPrimary: this.sortedStat === "Fielding",
      name: "Fielding"
    };

    return batStat;
  }

  getPitchStat(character: Character) {
    const batStat: SortStat = {
      value: String(character.pitch),
      isPrimary: this.sortedStat === "Pitching",
      name: "Pitching"
    };

    return batStat;
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  getEmptyRoster(): Character[] {

      let emptyRoster: Character[] = [];

      for (let i = 0; i < 9; i++) {
        emptyRoster.push(
          {
            id: '', name: 'Empty', bat: 0,   lean: 0.0,   zone: 0,   agility: 0,   coverage: 0,
            reachOut: 0.0,   reachIn: 0.0,   run: 0,   field: 0,   dive: 0,   size: 0,   arm: 0,   jump: 0,
            chemistry: 0,   pitch: 0,   stamina: 0,   curve: 0.0,   velocity: 0,   chargeVelocity: 0,   changeUp: 0.0,
            description: '',   notes: '',   ability: '',   isCaptain: false,   captainAbilityOffense: '',
            captainAbilityDefense: '',   originGroup: '',   tags: ''
          }
        );
      }

      return emptyRoster;
  }

}
