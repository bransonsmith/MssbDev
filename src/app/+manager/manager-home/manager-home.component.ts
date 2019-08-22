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

export class ManagerInfo {
  manager: Manager;
  teams: Team[];
  // stats: StatCollection;
}

@Component({
  selector: 'app-manager-home',
  templateUrl: './manager-home.component.html',
  styleUrls: ['./manager-home.component.css']
})
export class ManagerHomeComponent implements OnInit {

  title: string = 'Managers';

  managers: Manager[];
  managerInfo: ManagerInfo[];
  displayedColumns: string[] = ['name', 'winPct', 'wins', 'losses', 'draws'];

  dataSource = new MatTableDataSource(this.managerInfo);

  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(
    private teamService: TeamService,
    private statCollectionService: StatCollectionService,
    private managerService: ManagerService,
    private router: Router,
  ) { }

  ngOnInit() {

    this.managerInfo = [];

    this.managerService.getManagers().subscribe(
      gottenManagers =>  {
        this.managers = gottenManagers;

        this.managers.forEach(s => {
          this.teamService.getTeamsForManager(s.id).subscribe(
            (ts) => {
              const sInfo: ManagerInfo = { manager: s, teams: ts };
              this.managerInfo.push(sInfo);
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
