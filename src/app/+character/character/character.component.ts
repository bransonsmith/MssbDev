import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Character } from '../../models/character';
import { StatCollection } from '../../models/stat-collection';
import { CharacterService } from '../../services/character.service';
import { StatCollectionService } from '../../services/stat-collection.service';
import { Observable } from 'rxjs';
import { AnalyticBlock } from '../../models/analytic-block';
import { PlayerInstance } from 'src/app/models/player-instance';
import { PlayerInstanceService } from 'src/app/services/player-instance.service';
import { Season } from 'src/app/models/season';
import { Team } from 'src/app/models/team';
import { Manager } from 'src/app/models/manager';
import { TeamService } from 'src/app/services/team.service';
import { SeasonService } from 'src/app/services/season.service';
import { ManagerService } from 'src/app/services/manager.service';
import { GridOptions } from 'ag-grid-community';

export class CharacterStatInfo {

  character: Character;
  stats: StatCollection;
  teamName: string;
}

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {

  character: Character;
  playerInstances: PlayerInstance[];
  stats: StatCollection[];

  charStatInfos: CharacterStatInfo[];
  gridOptions: GridOptions;

  // displayedColumns: string[] = ['PA', 'AB', 'H', 'DB', 'TB', 'HR', 'R', 'RBI', 'SO', 'BBFC', 'SB', 'IP', 'ER', 'K', 'W', 'L', 'AVG', 'OBP', 'SLUG', 'OPS', 'ERA', 'K5'];
  // displayedColumns: string[] = ['PA', 'AB', 'H', 'DB', 'TB',];

  columnDefs = [
    {headerName: 'Team',    field: 'teamName'   , sortable: true, resizable: true },
    {headerName: 'PA',  field: 'stats.PA'	, sortable: true, resizable: true, width: 60 },
    {headerName: 'AB',  field: 'stats.AB'	, sortable: true, resizable: true, width: 60 },
    {headerName: 'H',  field: 'stats.H'	, sortable: true, resizable: true, width: 60 },
    {headerName: 'DB',  field: 'stats.DB'	, sortable: true, resizable: true, width: 60 },
    {headerName: 'TB',  field: 'stats.TB'	, sortable: true, resizable: true, width: 60 },
    {headerName: 'HR',  field: 'stats.HR'	, sortable: true, resizable: true, width: 60 },
    {headerName: 'R',  field: 'stats.R'	, sortable: true, resizable: true, width: 60 },
    {headerName: 'RBI',  field: 'stats.RBI'	, sortable: true, resizable: true, width: 60 },
    {headerName: 'SO',  field: 'stats.SO'	, sortable: true, resizable: true, width: 60 },
    {headerName: 'BBFC',  field: 'stats.BBFC'	, sortable: true, resizable: true, width: 60 },
    {headerName: 'SB',  field: 'stats.SB'	, sortable: true, resizable: true, width: 60 },
    {headerName: 'IP',  field: 'stats.IP'	, sortable: true, resizable: true, width: 60 },
    {headerName: 'ER',  field: 'stats.ER'	, sortable: true, resizable: true, width: 60 },
    {headerName: 'K',  field: 'stats.K'	, sortable: true, resizable: true, width: 60 },
    {headerName: 'W',  field: 'stats.W'	, sortable: true, resizable: true, width: 60 },
    {headerName: 'L',  field: 'stats.L'	, sortable: true, resizable: true, width: 60 },
    {headerName: 'AVG',  field: 'stats.AVG'	, sortable: true, resizable: true, width: 60 },
    {headerName: 'OBP',  field: 'stats.OBP'	, sortable: true, resizable: true, width: 60 },
    {headerName: 'SLUG',  field: 'stats.SLUG'	, sortable: true, resizable: true, width: 60 },
    {headerName: 'OPS',  field: 'stats.OPS'	, sortable: true, resizable: true, width: 60 },
    {headerName: 'ERA',  field: 'stats.ERA'	, sortable: true, resizable: true, width: 60 },
    {headerName: 'K5',  field: 'stats.K5'	, sortable: true, resizable: true, width: 60 },
  ];

  dataSource;

  private sub: any;

  analyticBlock1: AnalyticBlock = {
    name: 'Key Stat',
    rank: '1',
    outOf: 'TBD',
    symbolImgPath: '../../assets/images/analytic-blocks/batting.png',
    value: 'tbd'
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private characterService: CharacterService,
    private statCollectionService: StatCollectionService,
    private playerInstanceService: PlayerInstanceService,
    private teamService: TeamService,
    private seasonService: SeasonService,
    private managerService: ManagerService,

  ) {

    this.gridOptions = {
      rowData: this.charStatInfos,
      columnDefs: this.columnDefs,

      onCellClicked(event) {
        if (event.colDef.field === 'teamName') {
          router.navigateByUrl('teams/' + event.value);
        }
      }
    };
  }

  ngOnInit() {
    this.fetchCharacter();
  }

  fetchCharacter() {

    // this.sub = this.route.params.subscribe(params => {
    //   name = +params['name'];
    //   console.log('Need to find character: ' + name);
    //   this.character = this.characterService.getCharacterByName(name);
    // });
    this.charStatInfos = [];
    this.route.params.subscribe(params => {
      const name = params['name'];
      this.stats = [];
      console.log('Need to find character: ' + name);
      this.character = this.characterService.getCharacterByName(name);
      this.playerInstanceService.getPlayerInstancesWithEntId(this.character.id).subscribe(
        (pinsts) => {
          pinsts.forEach(pi => {

            this.statCollectionService.getEntStatCollections(pi.id).subscribe(
              (statCollections) => {
                statCollections.forEach(sc => {
                  this.stats.push(sc);

                  this.teamService.getTeamById(pi.TeamId).subscribe(
                    (t) => {

                        let tName = '';
                        try {
                          tName = t.name;
                        } catch (error) {

                        }

                        const statInfo: CharacterStatInfo = {
                          character: this.character,
                          stats: sc,
                          teamName: tName
                        };
                        this.charStatInfos.push(statInfo);

                    }
                  ) ;
                });
              }
            );
          });
          this.statCollectionService.getEntStatCollections(this.character.id).subscribe(
            (statCollections) => {
              statCollections.forEach(sc => {
                this.stats.push(sc);
                const charTotal: CharacterStatInfo = {
                  character: this.character,
                  stats: sc,
                  teamName: 'Total'
                };

                this.charStatInfos.push(charTotal);
              });

              this.dataSource = this.stats;
            }
          );
        }
      );
    });
  }
}
