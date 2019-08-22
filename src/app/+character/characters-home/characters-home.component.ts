import { Component, OnInit, ViewChild } from '@angular/core';
import { Character } from '../../models/character';
import { SortStat } from '../../models/sort-stat';
import { ActivatedRoute, Router } from '@angular/router';
import { CHARACTERS } from '../../mock-data/mock-characters';
import { CharacterService } from 'src/app/services/character.service';
import {
  MatColumnDef, MatHeaderRowDef, MatPaginator, MatRowDef, MatSort, MatSortable, MatTable, MatSortHeader,
  MatTableDataSource
} from '@angular/material';
import { Team } from '../../models/team';
import { StatCollection } from '../../models/stat-collection';
import { TeamService } from '../../services/team.service';
import { StatCollectionService } from '../../services/stat-collection.service';
import { Observable } from 'rxjs';
import { AnalyticBlock } from '../../models/analytic-block';
import { PlayerInstance } from 'src/app/models/player-instance';
import { PlayerInstanceService } from 'src/app/services/player-instance.service';

export class PlayerStats {
  player: Character;
  stats: StatCollection;
}

@Component({
  selector: 'app-characters-home',
  templateUrl: './characters-home.component.html',
  styleUrls: ['./characters-home.component.css']
})
export class CharactersHomeComponent implements OnInit {

  characters: Character[];

  sortedStat: string;

  playerInstances: PlayerInstance[];
  stats: StatCollection[];
  playerStats: PlayerStats[];

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  // tslint:disable-next-line:max-line-length
  // displayedColumns: string[] = ['Player', 'PA', 'AB', 'H', 'DB', 'TB', 'HR', 'R', 'RBI', 'SO', 'BBFC', 'SB', 'IP', 'ER', 'K', 'W', 'L', 'AVG', 'OBP', 'SLUG', 'OPS', 'ERA', 'K5'];
  // tslint:disable-next-line:max-line-length
   displayedColumns: string[] = ['Player', 'PA', 'AB', 'H', 'DB', 'TB', 'HR', 'R', 'RBI', 'SO', 'AVG', 'OBP', 'SLUG', 'OPS', 'BBFC', 'IP', 'ER', 'K', 'ERA', 'K5'];

  dataSource =  new MatTableDataSource([]);

  private sub: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private characterService: CharacterService,
    private statCollectionService: StatCollectionService,
    private playerInstanceService: PlayerInstanceService,
  ) { }

  ngOnInit() {
    this.fetchCharacterData();


  }

  fetchCharacterData() {
    this.characters = [];
    this.playerStats = [];
    this.stats = [];
    this.characterService.getCharacters().subscribe(
      (cs) => {
        cs.forEach(c => {
          this.characters.push(this.cloneCharacter(c));

          this.statCollectionService.getEntStatCollections(c.id).subscribe(
            (statCollections) => {
              statCollections.forEach(sc => {

                this.stats.push(sc);
                const pStats: PlayerStats = { player: c, stats: sc };
                this.playerStats.push(pStats);

              });
            }
          );
        });

        this.dataSource = new MatTableDataSource(this.playerStats);
        this.dataSource.sort = this.sort;
      }
    );
  }

  onCharacterClick(character: Character) {

    this.router.navigateByUrl('characters/' + character.name);
  }

  getRatingTotal(character: Character) {
    const ratingTotalStat: SortStat = {
      value: String(character.bat + character.run + character.field + character.pitch),
      isPrimary: this.sortedStat === 'Total',
      name: 'Total'
    };

    return ratingTotalStat;
  }

  getNumber(character: Character) {
    if (character.id == null) {
      return '  ';
    }
    return character.id;
  }

  getBatStat(character: Character) {
    const batStat: SortStat = {
      value: String(character.bat),
      isPrimary: this.sortedStat === 'Batting',
      name: 'Batting'
    };

    return batStat;
  }

  getRunStat(character: Character) {
    const batStat: SortStat = {
      value: String(character.run),
      isPrimary: this.sortedStat === 'Running',
      name: 'Running'
    };

    return batStat;
  }

  getFieldStat(character: Character) {
    const batStat: SortStat = {
      value: String(character.field),
      isPrimary: this.sortedStat === 'Fielding',
      name: 'Fielding'
    };

    return batStat;
  }

  getPitchStat(character: Character) {
    const batStat: SortStat = {
      value: String(character.pitch),
      isPrimary: this.sortedStat === 'Pitching',
      name: 'Pitching'
    };

    return batStat;
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  sortByRatingTotal() {
    if (this.sortedStat === 'Total') {
      this.characters.reverse();
      return;
    }

    this.characters.sort( (t1, t2) => {
      const num1 = t1.bat + t1.run + t1.field + t1.pitch;
      const num2 = t2.bat + t2.run + t2.field + t2.pitch;
      this.sortedStat = 'Total';
      if (num1 < num2) { return 1; }
      if (num1 > num2) { return -1; }
      return 0;
    });
  }

  sortByRandom() {
    const newCharacters: Character[] = [];

    this.characters.forEach(character => {
      const newIndex = this.getRandomInt(newCharacters.length);
      newCharacters.splice(newIndex, 0, character);
    });
    this.sortedStat = null;
    this.characters = newCharacters;
  }

  sortByBatting() {

    if (this.sortedStat === 'Batting') {
      this.characters.reverse();
      return;
    }

    this.characters.sort( (t1, t2) => {
      const num1 = t1.bat;
      const num2 = t2.bat;
      this.sortedStat = 'Batting';
      if (num1 < num2) { return 1; }
      if (num1 > num2) { return -1; }
      return 0;
    });
  }

  sortByRunning() {

    if (this.sortedStat === 'Running') {
      this.characters.reverse();
      return;
    }

    this.characters.sort( (t1, t2) => {
      const num1 = t1.run;
      const num2 = t2.run;
      this.sortedStat = 'Running';
      if (num1 < num2) { return 1; }
      if (num1 > num2) { return -1; }
      return 0;
    });
  }

  sortByFielding() {

    if (this.sortedStat === 'Fielding') {
      this.characters.reverse();
      return;
    }

    this.characters.sort( (t1, t2) => {
      const num1 = t1.field;
      const num2 = t2.field;
      this.sortedStat = 'Fielding';
      if (num1 < num2) { return 1; }
      if (num1 > num2) { return -1; }
      return 0;
    });
  }

  sortByPitching() {

    if (this.sortedStat === 'Pitching') {
      this.characters.reverse();
      return;
    }

    this.characters.sort( (t1, t2) => {
      const num1 = t1.pitch;
      const num2 = t2.pitch;
      this.sortedStat = 'Pitching';
      if (num1 < num2) { return 1; }
      if (num1 > num2) { return -1; }
      return 0;
    });
  }

  sortByNumber() {

    if (this.sortedStat === 'Number') {
      this.characters.reverse();
      return;
    }

    this.characters.sort( (t1, t2) => {
      const num1 = t1.id;
      const num2 = t2.id;
      this.sortedStat = 'Number';
      if (num1 > num2) { return 1; }
      if (num1 < num2) { return -1; }
      return 0;
    });
  }

  sortByName() {

    if (this.sortedStat === 'Name') {
      this.characters.reverse();
      return;
    }

    this.characters.sort( (t1, t2) => {
      const name1 = t1.name.toLowerCase();
      const name2 = t2.name.toLowerCase();
      this.sortedStat = 'Name';
      if (name1 < name2) { return 1; }
      if (name1 > name2) { return -1; }
      return 0;
    });
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

  getColumnAvg(colName: string) {

    switch (colName) {
      // tslint:disable: max-line-length
      case 'PA':
        return this.formatDec((this.playerStats.map(ps => ps.stats.PA).reduce((acc, value) => acc + value, 0)) / (this.playerStats.length), 0);
      case 'AB':
        return this.formatDec((this.playerStats.map(ps => ps.stats.AB).reduce((acc, value) => acc + value, 0)) / (this.playerStats.length), 0);
      case 'H':
        return this.formatDec((this.playerStats.map(ps => ps.stats.H).reduce((acc, value) => acc + value, 0)) / (this.playerStats.length), 0);
      case 'DB':
        return this.formatDec((this.playerStats.map(ps => ps.stats.DB).reduce((acc, value) => acc + value, 0)) / (this.playerStats.length), 0);
      case 'TB':
        return this.formatDec((this.playerStats.map(ps => ps.stats.TB).reduce((acc, value) => acc + value, 0)) / (this.playerStats.length), 0);
      case 'HR':
        return this.formatDec((this.playerStats.map(ps => ps.stats.HR).reduce((acc, value) => acc + value, 0)) / (this.playerStats.length), 0);
      case 'R':
        return this.formatDec((this.playerStats.map(ps => ps.stats.R).reduce((acc, value) => acc + value, 0)) / (this.playerStats.length), 0);
      case 'RBI':
        return this.formatDec((this.playerStats.map(ps => ps.stats.RBI).reduce((acc, value) => acc + value, 0)) / (this.playerStats.length), 0);
      case 'SO':
        return this.formatDec((this.playerStats.map(ps => ps.stats.SO).reduce((acc, value) => acc + value, 0)) / (this.playerStats.length), 0);
      case 'BBFC':
        return this.formatDec((this.playerStats.map(ps => ps.stats.BBFC).reduce((acc, value) => acc + value, 0) / (this.playerStats.length)), 0);
      case 'SB':
        return this.formatDec((this.playerStats.map(ps => ps.stats.SB).reduce((acc, value) => acc + value, 0)) / (this.playerStats.length), 0);
      case 'IP':
        return this.formatDec((this.playerStats.map(ps => ps.stats.IP).reduce((acc, value) => acc + value, 0)) / (this.playerStats.length), 0);
      case 'ER':
        return this.formatDec((this.playerStats.map(ps => ps.stats.ER).reduce((acc, value) => acc + value, 0)) / (this.playerStats.length), 0);
      case 'K':
        return this.formatDec((this.playerStats.map(ps => ps.stats.K).reduce((acc, value) => acc + value, 0)) / (this.playerStats.length), 0);
      case 'W':
        return this.formatDec((this.playerStats.map(ps => ps.stats.W).reduce((acc, value) => acc + value, 0)) / (this.playerStats.length), 0);
      case 'L':
        return this.formatDec((this.playerStats.map(ps => ps.stats.L).reduce((acc, value) => acc + value, 0)) / (this.playerStats.length), 0);
      case 'AVG':
        return this.formatDec((this.playerStats.map(ps => ps.stats.AVG).reduce((acc, value) => acc + value, 0) / this.playerStats.length));
      case 'OBP':
        return this.formatDec((this.playerStats.map(ps => ps.stats.OBP).reduce((acc, value) => acc + value, 0) / this.playerStats.length));
      case 'SLUG':
        return this.formatDec((this.playerStats.map(ps => ps.stats.SLUG).reduce((acc, value) => acc + value, 0) / this.playerStats.length));
      case 'OPS':
        return this.formatDec((this.playerStats.map(ps => ps.stats.OPS).reduce((acc, value) => acc + value, 0) / this.playerStats.length));
      case 'ERA':
        return this.formatDec((this.playerStats.map(ps => ps.stats.ERA).reduce((acc, value) => acc + value, 0) / this.playerStats.length));
      case 'K5':
        return this.formatDec((this.playerStats.map(ps => ps.stats.K5).reduce((acc, value) => acc + value, 0) / this.playerStats.length));
      default:
        return 0;
    }

  }

  formatDec(dec: number, prec: number = 4) {

    if (dec === 0) {
      return '.000';
    }

    let result = dec.toString();

    result = result.substr(0, 5);

    if (result.indexOf('.') < 0) {
      result += '.000';
      return result;
    }

    if (result.substr(result.indexOf('.')).length <= prec) {
      result += '0';
    }

    if (result.substr(result.indexOf('.')).length <= prec) {
      result += '0';
    }

    if (result.substr(result.indexOf('.')).length <= prec) {
      result += '0';
    }

    while (result.substr(result.indexOf('.')).length > prec) {
      result = result.substr(0, result.length - 1);
      return result;
    }

    return this.noZero(result);
  }

  noZero(num: string): string {
    if (num.substr(0, 1) === '0') {
      return (num.substr(1));
    }
    return num;
  }

  getShortenedCharacterName(character: Character) {
    let shortenedName = character.name;
    shortenedName = this.replaceLongNameWords(shortenedName);

    return shortenedName.trim();
  }

  replaceLongNameWords(str: string): string {
    const    longNames: string[] = ['Blue', 'Brown', 'Dark', 'Gray', 'Green', 'Light', 'Koopa', 'Pink', 'Purple', 'Red', 'White', 'Yellow'];
    const replacements: string[] = ['B.',    'Br.',  'D.',   'G.',   'Gn.',   'Lt',      '',   'Pk.',   'P.',     'R.',    'W.',     'Y.'];

    for (let i = 0; i < longNames.length; i++) {
      const color = longNames[i];
      str = str.replace(color, replacements[i]);
    }
    return str;
  }

  onNameClick(character: Character) {
    this.router.navigateByUrl('characters/' + character.name);
  }
}
