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
import { GridOptions } from 'ag-grid-community';

export class SeasonInfo {
  season: Season;
  teams: Team[];
  stats: StatCollection;
}

@Component({
  selector: 'app-season-home',
  templateUrl: './season-home.component.html',
  styleUrls: ['./season-home.component.css']
})
export class SeasonHomeComponent implements OnInit {

  title = 'Seasons';

  seasons: Season[];
  seasonInfo: SeasonInfo[];
  displayedColumns: string[] = ['name', 'winPct', 'wins', 'losses', 'draws'];

  dataSource = new MatTableDataSource(this.seasonInfo);

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  gridOptions: GridOptions;

  columnDefs = [
    {headerName: 'name', field: 'season.name'   , sortable: true, resizable: true },
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

  constructor(
    private teamService: TeamService,
    private statCollectionService: StatCollectionService,
    private seasonService: SeasonService,
    private router: Router,
  ) {
    this.gridOptions = {
      rowData: this.seasonInfo,
      columnDefs: this.columnDefs,

      onCellClicked(event) {
        console.log(event);
        if (event.colDef.field === 'season.name') {
          router.navigateByUrl('seasons/' + event.data.season.name);
        }
      }
    };
   }

  ngOnInit() {

    this.seasonInfo = [];

    this.seasonService.getSeasons().subscribe(
      gottenSeasons =>  {
        this.seasons = gottenSeasons;

        this.seasons.forEach(s => {

          this.statCollectionService.getEntStatCollections(s.id).subscribe(
            (seaStats) => {
              this.teamService.getTeamsForSeason(s.id).subscribe(
                (ts) => {
                  const sInfo: SeasonInfo = { season: s, teams: ts, stats: seaStats[0] };
                  this.seasonInfo.push(sInfo);
                }
              );
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
