import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
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
import { GridOptions } from 'ag-grid-community';

export class PlayerStats {
  player: Character;
  stats: StatCollection;
  shortName: string;
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
  playerRatings: Character[];
  gridOptions: GridOptions;
  gridOptionsRatings: GridOptions;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  @ViewChild('theContainer', null) theContainer;
  columnNum = 3;
  tileSize = 200;

  // tslint:disable-next-line:max-line-length
  // displayedColumns: string[] = ['Player', 'PA', 'AB', 'H', 'DB', 'TB', 'HR', 'R', 'RBI', 'SO', 'BBFC', 'SB', 'IP', 'ER', 'K', 'W', 'L', 'AVG', 'OBP', 'SLUG', 'OPS', 'ERA', 'K5'];
  // tslint:disable-next-line:max-line-length
   displayedColumns: string[] = ['Player', 'PA', 'AB', 'H', 'DB', 'TB', 'HR', 'R', 'RBI', 'SO', 'AVG', 'OBP', 'SLUG', 'OPS', 'BBFC', 'IP', 'ER', 'K', 'ERA', 'K5'];

   columnDefs = [
    {headerName: 'name', field: 'shortName'   , sortable: true, resizable: true },
    {headerName: 'PA',   field: 'stats.PA' , sortable: true, resizable: true, width: 60 },
    {headerName: 'AB',   field: 'stats.AB'   , sortable: true, resizable: true, width: 60  },
    {headerName: 'H',    field: 'stats.H' , sortable: true, resizable: true, width: 60  },
    {headerName: 'DB',   field: 'stats.DB'  , sortable: true, resizable: true, width: 60  },
    {headerName: 'TB',   field: 'stats.TB' , sortable: true, resizable: true, width: 60 },
    {headerName: 'HR',   field: 'stats.HR'   , sortable: true, resizable: true, width: 60  },
    {headerName: 'R',    field: 'stats.R' , sortable: true, resizable: true, width: 60  },
    {headerName: 'RBI',  field: 'stats.RBI'  , sortable: true, resizable: true, width: 60  },
    {headerName: 'SO',   field: 'stats.SO' , sortable: true, resizable: true, width: 60 },
    {headerName: 'AVG',  field: 'stats.AVG'   , sortable: true, resizable: true, width: 60  },
    {headerName: 'OBP',  field: 'stats.OBP' , sortable: true, resizable: true, width: 60  },
    {headerName: 'SLUG', field: 'stats.SLUG'  , sortable: true, resizable: true, width: 60  },
    {headerName: 'OPS',  field: 'stats.OPS' , sortable: true, resizable: true, width: 60 },
    {headerName: 'BBFC', field: 'stats.BBFC'   , sortable: true, resizable: true, width: 60  },
    {headerName: 'IP',   field: 'stats.IP' , sortable: true, resizable: true, width: 60  },
    {headerName: 'ER',   field: 'stats.ER'  , sortable: true, resizable: true, width: 60  },
    {headerName: 'K',    field: 'stats.K' , sortable: true, resizable: true, width: 60  },
    {headerName: 'ERA',  field: 'stats.ERA'  , sortable: true, resizable: true, width: 60  },
    {headerName: 'K5',   field: 'stats.K5'  , sortable: true, resizable: true, width: 60  },
  ];

  columnDefsRatings = [
    {headerName: 'name',   field: 'name' , sortable: true, resizable: true },
    {headerName: 'bat',   field: 'bat' , sortable: true, resizable: true, width: 60 },
    {headerName: 'field',   field: 'field' , sortable: true, resizable: true, width: 60 },
    {headerName: 'run',   field: 'run' , sortable: true, resizable: true, width: 60 },
    {headerName: 'pitch',   field: 'pitch' , sortable: true, resizable: true, width: 60 },
    {headerName: 'lean',   field: 'lean' , sortable: true, resizable: true, width: 60 },
    {headerName: 'zone',   field: 'zone' , sortable: true, resizable: true, width: 60 },
    {headerName: 'agility',   field: 'agility' , sortable: true, resizable: true, width: 60 },
    {headerName: 'coverage',   field: 'coverage' , sortable: true, resizable: true, width: 60 },
    {headerName: 'reachOut',   field: 'reachOut' , sortable: true, resizable: true, width: 60 },
    {headerName: 'reachIn',   field: 'reachIn' , sortable: true, resizable: true, width: 60 },
    {headerName: 'dive',   field: 'dive' , sortable: true, resizable: true, width: 60 },
    {headerName: 'size',   field: 'size' , sortable: true, resizable: true, width: 60 },
    {headerName: 'arm',   field: 'arm' , sortable: true, resizable: true, width: 60 },
    {headerName: 'jump',   field: 'jump' , sortable: true, resizable: true, width: 60 },
    {headerName: 'chemistry',   field: 'chemistry' , sortable: true, resizable: true, width: 60 },
    {headerName: 'stamina',   field: 'stamina' , sortable: true, resizable: true, width: 60 },
    {headerName: 'curve',   field: 'curve' , sortable: true, resizable: true, width: 60 },
    {headerName: 'velocity',   field: 'velocity' , sortable: true, resizable: true, width: 60 },
    {headerName: 'chargeVelocity',   field: 'chargeVelocity' , sortable: true, resizable: true, width: 60 },
    {headerName: 'changeUp',   field: 'changeUp' , sortable: true, resizable: true, width: 60 },
    {headerName: 'isCaptain',   field: 'isCaptain' , sortable: true, resizable: true, width: 60 },
  ];

  dataSource =  new MatTableDataSource([]);

  private sub: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private characterService: CharacterService,
    private statCollectionService: StatCollectionService,
    private playerInstanceService: PlayerInstanceService,
  ) {

    this.gridOptions = {
      rowData: this.playerStats,
      columnDefs: this.columnDefs,

      onCellClicked(event) {
        console.log(event);
        if (event.colDef.field === 'shortName') {
          router.navigateByUrl('characters/' + event.data.player.name);
        }
      }
    };
    this.gridOptionsRatings = {
      rowData: this.playerRatings,
      columnDefs: this.columnDefsRatings,

      onCellClicked(event) {
        if (event.colDef.field === 'name') {
          router.navigateByUrl('characters/' + event.value);
        }
      }
    };
  }

  ngOnInit() {
    this.fetchCharacterData();

  }

  colNumSet() {
    return this.columnNum > 0;
  }

  setColNum() {
    const width = this.theContainer.nativeElement.offsetWidth;
    this.columnNum = Math.trunc(width / this.tileSize);
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewInit() {
    this.setColNum();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setColNum();
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

                const sn = this.getShortenedCharacterName(c);

                const pStats: PlayerStats = { player: c, stats: sc, shortName: sn };
                this.playerStats.push(pStats);

              });
            }
          );
        });
        this.playerRatings = this.characters;
        this.setColNum();
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
