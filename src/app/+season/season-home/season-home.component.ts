import { Season } from 'src/app/models/season';
import { SEASONS } from '../../mock-data/mock-seasons';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { SeasonService } from '../../services/season.service';
import { Router } from '@angular/router';
import { Team } from 'src/app/models/team';
import { StatCollection } from 'src/app/models/stat-collection';
import { TeamService } from 'src/app/services/team.service';
import { StatCollectionService } from 'src/app/services/stat-collection.service';

export class SeasonInfo {
  season: Season;
  teams: Team[];
  // stats: StatCollection;
}

@Component({
  selector: 'app-season-home',
  templateUrl: './season-home.component.html',
  styleUrls: ['./season-home.component.css']
})
export class SeasonHomeComponent implements OnInit {

  title: string = 'Seasons';

  seasons: Season[];
  seasonInfo: SeasonInfo[];
  displayedColumns: string[] = ['name', 'winPct', 'wins', 'losses', 'draws'];

  dataSource = new MatTableDataSource(this.seasonInfo);

  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(
    private teamService: TeamService,
    private statCollectionService: StatCollectionService,
    private seasonService: SeasonService,
    private router: Router,
  ) { }

  ngOnInit() {

    this.seasonInfo = [];

    this.seasonService.getSeasons().subscribe(
      gottenSeasons =>  {
        this.seasons = gottenSeasons;

        this.seasons.forEach(s => {
          this.teamService.getTeamsForSeason(s.id).subscribe(
            (ts) => {
              const sInfo: SeasonInfo = { season: s, teams: ts };
              this.seasonInfo.push(sInfo);
            }
          );
        });

        this.dataSource = new MatTableDataSource(this.seasonInfo);
        this.dataSource.sort = this.sort;
      });
  }

  hdName() {

  }

  onNameClick(season: Season) {
    this.router.navigateByUrl('seasons/' + season.name);
  }

}
