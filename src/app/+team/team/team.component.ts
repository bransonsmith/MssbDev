import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MatColumnDef, MatHeaderRowDef, MatPaginator, MatRowDef, MatSort, MatSortable, MatTable, MatSortHeader,
  MatTableDataSource
} from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Team } from '../../models/team';
import { StatCollection } from '../../models/stat-collection';
import { TeamService } from '../../services/team.service';
import { StatCollectionService } from '../../services/stat-collection.service';
import { Observable } from 'rxjs';
import { AnalyticBlock } from '../../models/analytic-block';
import { PlayerInstance } from 'src/app/models/player-instance';
import { PlayerInstanceService } from 'src/app/services/player-instance.service';
import { Manager } from 'src/app/models/manager';
import { Season } from 'src/app/models/season';
import { SeasonService } from 'src/app/services/season.service';
import { ManagerService } from 'src/app/services/manager.service';
import { CharacterService } from 'src/app/services/character.service';
import { Character } from 'src/app/models/character';

export class PlayerStats {
  player: Character;
  stats: StatCollection;
}

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  team: Team;
  manager: Manager;
  season: Season;
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

  analyticBlock1: AnalyticBlock = {
    name: 'HR per AB',
    rank: '1',
    outOf: '72',
    symbolImgPath: '../../assets/images/analytic-blocks/batting.png',
    value: 'tbd'
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private teamService: TeamService,
    private statCollectionService: StatCollectionService,
    private playerInstanceService: PlayerInstanceService,
    private managerService: ManagerService,
    private seasonService: SeasonService,
    private characterService: CharacterService,
  ) { }

  ngOnInit() {
    this.fetchTeam();
  }

  getColumnTotal(colName: string) {

    switch (colName) {
      case 'PA':
        return this.playerStats.map(ps => ps.stats.PA).reduce((acc, value) => acc + value, 0);
      case 'AB':
        return this.playerStats.map(ps => ps.stats.AB).reduce((acc, value) => acc + value, 0);
      case 'H':
        return this.playerStats.map(ps => ps.stats.H).reduce((acc, value) => acc + value, 0);
      case 'DB':
        return this.playerStats.map(ps => ps.stats.DB).reduce((acc, value) => acc + value, 0);
      case 'TB':
        return this.playerStats.map(ps => ps.stats.TB).reduce((acc, value) => acc + value, 0);
      case 'HR':
        return this.playerStats.map(ps => ps.stats.HR).reduce((acc, value) => acc + value, 0);
      case 'R':
        return this.playerStats.map(ps => ps.stats.R).reduce((acc, value) => acc + value, 0);
      case 'RBI':
        return this.playerStats.map(ps => ps.stats.RBI).reduce((acc, value) => acc + value, 0);
      case 'SO':
        return this.playerStats.map(ps => ps.stats.SO).reduce((acc, value) => acc + value, 0);
      case 'BBFC':
        return this.playerStats.map(ps => ps.stats.BBFC).reduce((acc, value) => acc + value, 0);
      case 'SB':
        return this.playerStats.map(ps => ps.stats.SB).reduce((acc, value) => acc + value, 0);
      case 'IP':
        return this.playerStats.map(ps => ps.stats.IP).reduce((acc, value) => acc + value, 0);
      case 'ER':
        return this.playerStats.map(ps => ps.stats.ER).reduce((acc, value) => acc + value, 0);
      case 'K':
        return this.playerStats.map(ps => ps.stats.K).reduce((acc, value) => acc + value, 0);
      case 'W':
        return this.playerStats.map(ps => ps.stats.W).reduce((acc, value) => acc + value, 0);
      case 'L':
        return this.playerStats.map(ps => ps.stats.L).reduce((acc, value) => acc + value, 0);
      case 'AVG':
        // tslint:disable: max-line-length
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

  formatDec(dec: number) {

    if (dec === 0) {
      return '.000';
    }

    let result = dec.toString();

    result = result.substr(0, 5);

    if (result.indexOf('.') < 0) {
      result += '.000';
      return result;
    }

    if (result.substr(result.indexOf('.')).length <= 3) {
      result += '0';
    }

    if (result.substr(result.indexOf('.')).length <= 3) {
      result += '0';
    }

    if (result.substr(result.indexOf('.')).length <= 3) {
      result += '0';
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

  fetchTeam() {

    this.route.params.subscribe(params => {
      const name = params['name'];
      this.stats = [];
      this.playerStats = [];
      console.log('Need to find team: ' + name);
      this.teamService.getTeam(name).subscribe(
        (t) => {
          this.team = t;
          this.playerInstanceService.getPlayerInstancesWithEntId(this.team.id).subscribe(
            (pinsts) => {
              pinsts.forEach(pi => {

                this.statCollectionService.getEntStatCollections(pi.id).subscribe(
                  (statCollections) => {
                    statCollections.forEach(sc => {
                      this.stats.push(sc);

                      // Get Char and push name + stats into playerStats
                      this.characterService.getCharacter(pi.CharacterId).subscribe(
                        (c) => {
                          const pStats: PlayerStats = { player: c, stats: sc };
                          this.playerStats.push(pStats);
                        }
                      );

                    });
                  }
                );
              });
              this.statCollectionService.getEntStatCollections(this.team.id).subscribe(
                (statCollections) => {
                  statCollections.forEach(sc => {
                    this.stats.push(sc);
                  });

                  this.dataSource = new MatTableDataSource(this.playerStats);
                  this.dataSource.sort = this.sort;
                }
              );
            }
          );

          this.managerService.getManager(t.managerId).subscribe(m => this.manager = m);
          this.seasonService.getSeason(t.seasonId).subscribe(s => this.season = s);

        }
      );
    });
  }
}
