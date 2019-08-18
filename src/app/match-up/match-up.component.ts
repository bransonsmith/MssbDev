import { Component, OnInit } from '@angular/core';
import { Character } from '../models/character';
import { SortStat } from '../models/sort-stat';
import { isPrimitive } from 'util';
import { ActivatedRoute, Router } from '@angular/router';
import { CHARACTERS } from '../mock-data/mock-characters';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatGridTile } from '@angular/material/grid-list';
import { Team } from '../models/team';
import { TEAMS } from '../mock-data/mock-teams';

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
  teams: Team[] = TEAMS;

  leftRoster: Character[] = this.getEmptyRoster();
  rightRoster: Character[] = this.getEmptyRoster();

  sortedStat: string;

  selectedIndex: number;
  selectedSection: string;

  defaultSelecedIndex = -1;
  defaultSelecedSection = '';

  dataSource = this.unpickedCharacters;
  columnsToDisplay = ['name'];
  selectedRight = 'Team';
  selectedLeft = 'Team';
  // expandedElement: PeriodicElement | null;

  constructor() { }

  ngOnInit() {
    this.selectedIndex = this.defaultSelecedIndex;
    this.selectedSection = this.defaultSelecedSection;
  }

  allEmpty(roster: Character[]) {

    roster.forEach(c => {
      if (c.name !== 'Empty') {
        return false;
      }
    });

    return true;
  }

  getOtherTeams() {
    const unpicked: Team[] = [];

    this.teams.forEach(t => {
      let rtName;
      if (this.selectedRight === null) {
        rtName = '';
      } else {
        rtName = this.selectedRight;
      }

      let lfName;
      if (this.selectedLeft === null) {
        lfName = '';
      } else {
        lfName = this.selectedLeft;
      }

      console.log('Left Name = ' + lfName);
      if (t.name !== rtName && t.name !== lfName) {
          unpicked.push(t);
      }
    });
    return unpicked;
  }

  fillWithTeamRoster(team: string, roster: Character[]) {
    console.log('Need to fill roster with players from ' + team);
  }

  isFirstSlotCaptain(roster: Character[]): boolean {
    if (roster === null || roster.length < 1) { return false; }
    const charToCheck: Character = roster[0];

    if (charToCheck === null) { return false; }
    if (charToCheck.name === 'Empty') { return false; }
    if (charToCheck.isCaptain) { return true; }
    return false;
  }

  moveCharacterToUnpicked(index: number, roster: Character[]) {
    const charToMove = this.cloneCharacter(roster[index]);
    roster[index] = {
      id: '', name: 'Empty', bat: 0,   lean: 0.0,   zone: 0,   agility: 0,   coverage: 0,
      reachOut: 0.0,   reachIn: 0.0,   run: 0,   field: 0,   dive: 0,   size: 0,   arm: 0,   jump: 0,
      chemistry: 0,   pitch: 0,   stamina: 0,   curve: 0.0,   velocity: 0,   chargeVelocity: 0,   changeUp: 0.0,
      description: '',   notes: '',   ability: '',   isCaptain: true,   captainAbilityOffense: '',
      captainAbilityDefense: '',   originGroup: '',   tags: ''
    };

    if (charToMove.name !== 'Empty') {
      this.unpickedCharacters.push(charToMove);
    }

  }

  clearRoster(roster: Character[]) {
    while (roster.length > 0) {
      const charFromRoster = this.cloneCharacter(roster.pop());
      if (charFromRoster.name !== 'Empty') {
        this.unpickedCharacters.push(charFromRoster);
      }
    }
    for (let i = 0; i < 9; i++) {
      roster.push(
        {
          id: '', name: 'Empty', bat: 0,   lean: 0.0,   zone: 0,   agility: 0,   coverage: 0,
          reachOut: 0.0,   reachIn: 0.0,   run: 0,   field: 0,   dive: 0,   size: 0,   arm: 0,   jump: 0,
          chemistry: 0,   pitch: 0,   stamina: 0,   curve: 0.0,   velocity: 0,   chargeVelocity: 0,   changeUp: 0.0,
          description: '',   notes: '',   ability: '',   isCaptain: true,   captainAbilityOffense: '',
          captainAbilityDefense: '',   originGroup: '',   tags: ''
        }
      );
    }
  }

  cloneCharacter(character: Character): Character {

    const clone = {
      id: character.id,
      name: character.name,
      bat: character.bat,
      field: character.field,
      run: character.run,
      pitch: character.pitch,
      lean: character.lean,
      zone: character.zone,
      agility: character.agility,
      coverage: character.coverage,
      reachOut: character.reachOut,
      reachIn: character.reachIn,
      dive: character.dive,
      size: character.size,
      arm: character.arm,
      jump: character.jump,
      chemistry: character.chemistry,
      stamina: character.stamina,
      curve: character.curve,
      velocity: character.velocity,
      chargeVelocity: character.chargeVelocity,
      changeUp: character.changeUp,
      isCaptain: character.isCaptain,
      captainAbilityOffense: character.captainAbilityOffense,
      captainAbilityDefense: character.captainAbilityDefense,
      description: character.description,
      notes: character.notes,
      ability: character.ability,
      originGroup: character.originGroup,
      tags: character.tags
    };

    return clone;
  }

  fillRandom(roster: Character[]) {

    let i = 0;
    roster.forEach(character => {
      if (character.name === 'Empty') {
        let charFromUnpicked: Character = null;
        let randomUnpickedIndex = 0;
        while (charFromUnpicked === null || charFromUnpicked.name === 'Empty') {
          randomUnpickedIndex = Math.floor(Math.random() * Math.floor(this.unpickedCharacters.length));
          charFromUnpicked = this.cloneCharacter(this.unpickedCharacters[randomUnpickedIndex]);
          if (i === 0 && !charFromUnpicked.isCaptain) {
            charFromUnpicked = null;
          }
        }

        const charFromRoster = this.cloneCharacter(character);
        if (charFromRoster.name !== 'Empty') {
          this.unpickedCharacters.push(charFromRoster);
        }
        roster[i] = this.cloneCharacter(charFromUnpicked);
        this.unpickedCharacters.splice(randomUnpickedIndex, 1);
      }

      i++;
    });
  }

  rosterContains(char: Character, roster: Character[]): boolean {
    if (char.name === 'Empty') { return true; }

    let contains = false;
    roster.forEach(c => {
      if (c.name === char.name) {
        contains = true;
        return true;
      }
    });

    return contains;
  }

  selected(index: number, section: string) {
    return (this.selectedIndex === index && this.selectedSection === section);
  }

  onRosterListItemClick(index: number, section: string) {

    if (this.noItemSelected()) {
      this.selectedIndex = index;
      this.selectedSection = section;
    } else {
      const selected1: Character = this.cloneCharacter(this.getSelectedCharacter1());
      const selected2: Character = this.cloneCharacter(this.getSelectedCharacter2(index, section));

      if (section === 'right') {

        this.rightRoster[index] = selected1;

      } else if (section === 'left') {

        this.leftRoster[index] = selected1;

      } else if (section === 'unpicked') {

        if (selected1.name !== 'Empty') {
          this.unpickedCharacters[index] = selected1;
        } else {
          this.unpickedCharacters.splice(index, 1);
        }

      }

      if (this.selectedSection === 'right') {

        this.rightRoster[this.selectedIndex] = selected2;

      } else if (this.selectedSection === 'left') {

        this.leftRoster[this.selectedIndex] = selected2;

      } else if (this.selectedSection === 'unpicked') {

        if (selected2.name !== 'Empty') {
          this.unpickedCharacters[this.selectedIndex] = selected2;
        } else {
            this.unpickedCharacters.splice(this.selectedIndex, 1);
        }
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
