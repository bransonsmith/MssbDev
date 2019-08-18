import { Team } from 'src/app/models/team';
import { TEAMS } from '../../mock-data/mock-teams';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { TeamService } from '../../services/team.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teams-home',
  templateUrl: './teams-home.component.html',
  styleUrls: ['./teams-home.component.css']
})
export class TeamsHomeComponent implements OnInit {

  title: string = 'Teams';

  teams: Team[];
  displayedColumns: string[] = ['name', 'winPct', 'wins', 'losses', 'draws'];

  dataSource = new MatTableDataSource(this.teams);

  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(
    private teamService: TeamService,
    private router: Router,
  ) { }

  ngOnInit() {

    this.teamService.getTeams().subscribe(
      gottenTeams =>  {
        this.teams = gottenTeams;
        this.dataSource = new MatTableDataSource(this.teams);
        this.dataSource.sort = this.sort;
      });
  }

  hdName() {

  }

  onNameClick(team: Team) {
    this.router.navigateByUrl('teams/' + team.name);
  }

}
