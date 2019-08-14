import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Tile } from '../models/tile';
import { TILES } from '../mock-data/mock-tiles';
import { TileService } from '../services/tile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css']
})
export class CollectionsComponent implements OnInit {

  title: string = 'Collections';

  tiles: Tile[];
  displayedColumns: string[] = ['name', 'number', 'info', 'bat', 'run'];

  dataSource = new MatTableDataSource(this.tiles);

  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(
    private tileService: TileService,
    private router: Router,
  ) { }

  ngOnInit() {

    let gottenTiles = this.tileService.getTiles();
    this.tiles = gottenTiles;
    this.dataSource = new MatTableDataSource(this.tiles);
    this.dataSource.sort = this.sort;
  }

  hdName() {

  }

  onNameClick(tile: Tile) {
    this.router.navigateByUrl('specifics/' + tile.number);
  }

}
