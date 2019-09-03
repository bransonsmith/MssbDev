import { Manager } from 'src/app/models/manager';
import { MANAGERS } from '../../mock-data/mock-managers';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ManagerService } from '../../services/manager.service';
import { Router } from '@angular/router';
import { Team } from 'src/app/models/team';
import { StatCollection } from 'src/app/models/stat-collection';
import { TeamService } from 'src/app/services/team.service';
import { StatCollectionService } from 'src/app/services/stat-collection.service';
import { GridOptions } from 'ag-grid-community';

export class ManagerInfo {
  manager: Manager;
  teams: Team[];
  stats: StatCollection;
  wins: number;
  losses: number;
  draws: number;
  winPct: number;
}

@Component({
  selector: 'app-manager-home',
  templateUrl: './manager-home.component.html',
  styleUrls: ['./manager-home.component.css']
})
export class ManagerHomeComponent implements OnInit {

  title = 'Managers';

  managers: Manager[];
  managerInfo: ManagerInfo[];
  displayedColumns: string[] = ['name', 'winPct', 'wins', 'losses', 'draws'];

  dataSource = new MatTableDataSource(this.managerInfo);

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  gridOptions: GridOptions;


  columnDefs = [
    {headerName: 'name', field: 'manager.name'   , sortable: true, resizable: true },
    {headerName: 'W',   field: 'wins' , sortable: true, resizable: true, width: 60 },
    {headerName: 'L',   field: 'losses' , sortable: true, resizable: true, width: 60 },
    {headerName: 'D',   field: 'draws' , sortable: true, resizable: true, width: 60 },
    {headerName: 'WinPct',   field: 'winPct' , sortable: true, resizable: true, width: 60 },
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
    private managerService: ManagerService,
    private router: Router,
  ) {

    this.gridOptions = {
      rowData: this.managerInfo,
      columnDefs: this.columnDefs,

      onCellClicked(event) {
        console.log(event);
        if (event.colDef.field === 'manager.name') {
          router.navigateByUrl('managers/' + event.value);
        }
      }
    };

  }

  ngOnInit() {

    this.managerInfo = [];

    this.managerService.getManagers().subscribe(
      gottenManagers =>  {
        this.managers = gottenManagers;

        this.managers.forEach(m => {
          this.teamService.getTeamsForManager(m.id).subscribe(
            (ts) => {

              this.statCollectionService.getEntStatCollections(m.id).subscribe(
                (sc) => {

                  const mInfo: ManagerInfo = { manager: m, teams: ts, stats: sc[0], wins: 0, losses: 0, draws: 0, winPct: 0 };

                  ts.forEach(t => {
                    mInfo.wins += t.wins;
                    mInfo.losses += t.losses;
                    mInfo.draws += t.draws;
                  });
                  mInfo.winPct = +(((mInfo.wins + mInfo.draws / 2) / (mInfo.wins + mInfo.draws + mInfo.losses)).toFixed(3));

                  this.managerInfo.push(mInfo);
                }
              );

            }
          );
        });

        this.dataSource = new MatTableDataSource(this.managerInfo);
        this.dataSource.sort = this.sort;
      });
  }

  hdName() {

  }

  onNameClick(manager: Manager) {
    this.router.navigateByUrl('managers/' + manager.name);
  }

}
