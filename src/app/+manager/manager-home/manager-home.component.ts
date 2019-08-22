import { Manager } from 'src/app/models/manager';
import { MANAGERS } from '../../mock-data/mock-managers';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ManagerService } from '../../services/manager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager-home',
  templateUrl: './manager-home.component.html',
  styleUrls: ['./manager-home.component.css']
})
export class ManagerHomeComponent implements OnInit {

  title: string = 'Managers';

  managers: Manager[];
  displayedColumns: string[] = ['name', 'winPct', 'wins', 'losses', 'draws'];

  dataSource = new MatTableDataSource(this.managers);

  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(
    private managerService: ManagerService,
    private router: Router,
  ) { }

  ngOnInit() {

    this.managerService.getManagers().subscribe(
      gottenManagers =>  {
        this.managers = gottenManagers;
        this.dataSource = new MatTableDataSource(this.managers);
        this.dataSource.sort = this.sort;
      });
  }

  hdName() {

  }

  onNameClick(manager: Manager) {
    this.router.navigateByUrl('managers/' + manager.name);
  }

}
