import { Component, OnInit } from '@angular/core';
import { Character } from '../models/character';
import { SortStat } from '../models/sort-stat';
import { isPrimitive } from 'util';
import { ActivatedRoute, Router } from '@angular/router';
import { CHARACTERS } from '../mock-data/mock-characters';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatGridTile } from '@angular/material/grid-list';

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

  selectedIndex: number;
  selectedSection: string;

  const defaultSelecedIndex = -1;
  const defaultSelecedSection = '';

  dataSource = this.unpickedCharacters;
  columnsToDisplay = ['name'];
  // expandedElement: PeriodicElement | null;

  constructor() { }

  ngOnInit() {
    this.selectedIndex = this.defaultSelecedIndex;
    this.selectedSection = this.defaultSelecedSection;
  }

  selected(index: number, section: string) {
    return (this.selectedIndex === index && this.selectedSection === section);
  }

  onRosterListItemClick(index: number, section: string) {

    if (this.noItemSelected()) {
      this.selectedIndex = index;
      this.selectedSection = section;
    } else {
      const selected1: Character = this.getSelectedCharacter1();
      const selected2: Character = this.getSelectedCharacter2(index, section);

      if (section === 'right') {

        this.rightRoster[index] = selected1;

      } else if (section === 'left') {

        this.leftRoster[index] = selected1;

      } else if (section === 'unpicked') {

        this.unpickedCharacters[index] = selected1;

      }

      if (this.selectedSection === 'right') {

        this.rightRoster[this.selectedIndex] = selected2;

      } else if (this.selectedSection === 'left') {

        this.leftRoster[this.selectedIndex] = selected2;

      } else if (this.selectedSection === 'unpicked') {

        this.unpickedCharacters[this.selectedIndex] = selected2;

      }

      this.selectedIndex = this.defaultSelecedIndex;
      this.selectedSection = this.defaultSelecedSection;
    }


  }

  getSelectedCharacter1(): Character {
    if (this.selectedSection === 'right') {
      return this.rightRoster[this.selectedIndex];
    } else if (this.selectedSection === 'left') {
      return this.leftRoster[this.selectedIndex];
    } else if (this.selectedSection === 'unpicked') {
      return this.unpickedCharacters[this.selectedIndex];
    } else {
      return null;
    }
  }

  getSelectedCharacter2(index: number, section: string): Character {
    if (section === 'right') {
      return this.rightRoster[index];
    } else if (section === 'left') {
      return this.leftRoster[index];
    } else if (section === 'unpicked') {
      return this.unpickedCharacters[index];
    } else {
      return null;
    }
  }

  noItemSelected() {
    return (this.selectedIndex === this.defaultSelecedIndex && this.selectedSection === this.defaultSelecedSection);
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
            description: '',   notes: '',   ability: '',   isCaptain: true,   captainAbilityOffense: '',
            captainAbilityDefense: '',   originGroup: '',   tags: ''
          }
        );
      }

      return emptyRoster;
  }

}
