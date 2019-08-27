import { Team } from 'src/app/models/team';
import { TEAMS } from '../../mock-data/mock-teams';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { TeamService } from '../../services/team.service';
import { ManagerService } from '../../services/manager.service';
import { SeasonService } from '../../services/season.service';
import { StatCollectionService } from '../../services/stat-collection.service';
import { Router } from '@angular/router';
import { Manager } from 'src/app/models/manager';
import { Season } from 'src/app/models/season';
import { StatCollection } from 'src/app/models/stat-collection';

export class TeamInfo {

  team: Team;
  manager: Manager;
  season: Season;
  stats: StatCollection;

}

@Component({
  selector: 'app-teams-home',
  templateUrl: './teams-home.component.html',
  styleUrls: ['./teams-home.component.css']
})
export class TeamsHomeComponent implements OnInit {

  title: string = 'Teams';


  teamInfo: TeamInfo[];
  teams: Team[];
  displayedColumns: string[] = ['name', 'winPct', 'wins', 'losses', 'draws', 'manager', 'season', 'AVG', 'OBP', 'ERA', 'K5'];

  dataSource = new MatTableDataSource(this.teamInfo);

  @ViewChild(MatSort, {static: true}) sort: MatSort;


  columnDefs = [
    {headerName: 'name',    field: 'team.name'   , sortable: true, resizable: true },
    {headerName: 'W%',  field: 'team.winPct'     , sortable: true, resizable: true, width: 60 },
    {headerName: 'W',    field: 'team.wins'      , sortable: true, resizable: true, width: 60  },
    {headerName: 'L',  field: 'team.losses'      , sortable: true, resizable: true, width: 60  },
    {headerName: 'T',   field: 'team.draws'      , sortable: true, resizable: true, width: 60  },
    {headerName: 'manager', field: 'manager.name', sortable: true, resizable: true },
    {headerName: 'season',  field: 'season.name' , sortable: true, resizable: true },
    {headerName: 'AVG',     field: 'stats.AVG'   , sortable: true, resizable: true, width: 60},
    {headerName: 'OBP',     field: 'stats.OBP'   , sortable: true, resizable: true, width: 60},
    {headerName: 'ERA',     field: 'stats.ERA'   , sortable: true, resizable: true, width: 60},
    {headerName: 'K5',      field: 'stats.K5'    , sortable: true, resizable: true, width: 60}
  ];


  constructor(
    private teamService: TeamService,
    private managerService: ManagerService,
    private seasonService: SeasonService,
    private statCollectionService: StatCollectionService,
    private router: Router,
  ) { }

  ngOnInit() {

    this.teamInfo = [];

    this.teamService.getTeams().subscribe(
      gottenTeams =>  {
        this.teams = gottenTeams;

        gottenTeams.forEach(t => {
          this.managerService.getManager(t.managerId).subscribe(
            (m) => {

              this.seasonService.getSeason(t.seasonId).subscribe(
                (s) => {

                  this.statCollectionService.getEntStatCollections(t.id).subscribe(
                    (sc) => {

                      let tInfo: TeamInfo = {
                        team: t,
                        manager: m,
                        season: s,
                        stats: sc[0]
                      };
                      this.teamInfo.push(tInfo);

                    }
                  );
                }
              );
            }
          );

        });

        this.dataSource = new MatTableDataSource(this.teamInfo);
        this.dataSource.sort = this.sort;
      });
  }

  hdName() {

  }

  onNameClick(team: Team) {
    this.router.navigateByUrl('teams/' + team.name);
  }

}
