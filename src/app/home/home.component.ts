import { Component, OnInit } from '@angular/core';
import { Tile } from '../tile';
import { SortStat } from '../sort-stat/sort-stat';
import { isPrimitive } from 'util';
import { ActivatedRoute, Router } from '@angular/router';
import { TILES } from '../mock-tiles';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  tiles: Tile[] = TILES;

  sortedStat: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  onTileClick(tile: Tile) {

    console.log('Clicked on tile: ' + tile.number + ' ' + tile.name);
    this.router.navigateByUrl('specifics/' + tile.number);
  }

  getNumber(tile: Tile) {
    if (tile.number == null) {
      return "  ";
    }
    if (tile.number < 10) {
      return " " + tile.number;
    }
    return tile.number;
  }

  getBatStat(tile: Tile) {
    const batStat: SortStat = {
      value: String(tile.bat),
      isPrimary: this.sortedStat === "Batting",
      name: "Batting"
    };

    return batStat;
  }

  getRunStat(tile: Tile) {
    const batStat: SortStat = {
      value: String(tile.run),
      isPrimary: this.sortedStat === "Running",
      name: "Running"
    };

    return batStat;
  }

  getFieldStat(tile: Tile) {
    const batStat: SortStat = {
      value: String(tile.field),
      isPrimary: this.sortedStat === "Fielding",
      name: "Fielding"
    };

    return batStat;
  }

  getPitchStat(tile: Tile) {
    const batStat: SortStat = {
      value: String(tile.pitch),
      isPrimary: this.sortedStat === "Pitching",
      name: "Pitching"
    };

    return batStat;
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  sortByRandom() {
    let newTiles: Tile[] = [];

    this.tiles.forEach(tile => {
      let newIndex = this.getRandomInt(newTiles.length);
      newTiles.splice(newIndex, 0, tile);
    });
    this.sortedStat = null;
    this.tiles = newTiles;
  }

  sortByBatting() {

    if (this.sortedStat === "Batting") {
      this.tiles.reverse();
      return;
    }

    this.tiles.sort( (t1, t2) => {
      const num1 = t1.bat;
      const num2 = t2.bat;
      this.sortedStat = "Batting";
      if (num1 < num2) { return 1; }
      if (num1 > num2) { return -1; }
      return 0;
    });
  }

  sortByRunning() {

    if (this.sortedStat === "Running") {
      this.tiles.reverse();
      return;
    }

    this.tiles.sort( (t1, t2) => {
      const num1 = t1.run;
      const num2 = t2.run;
      this.sortedStat = "Running";
      if (num1 < num2) { return 1; }
      if (num1 > num2) { return -1; }
      return 0;
    });
  }

  sortByFielding() {

    if (this.sortedStat === "Fielding") {
      this.tiles.reverse();
      return;
    }

    this.tiles.sort( (t1, t2) => {
      const num1 = t1.field;
      const num2 = t2.field;
      this.sortedStat = "Fielding";
      if (num1 < num2) { return 1; }
      if (num1 > num2) { return -1; }
      return 0;
    });
  }

  sortByPitching() {

    if (this.sortedStat === "Pitching") {
      this.tiles.reverse();
      return;
    }

    this.tiles.sort( (t1, t2) => {
      const num1 = t1.pitch;
      const num2 = t2.pitch;
      this.sortedStat = "Pitching";
      if (num1 < num2) { return 1; }
      if (num1 > num2) { return -1; }
      return 0;
    });
  }

  sortByNumber() {

    if (this.sortedStat === "Number") {
      this.tiles.reverse();
      return;
    }

    this.tiles.sort( (t1, t2) => {
      const num1 = t1.number;
      const num2 = t2.number;
      this.sortedStat = "Number";
      if (num1 > num2) { return 1; }
      if (num1 < num2) { return -1; }
      return 0;
    });
  }

  sortByName() {

    if (this.sortedStat === "Name") {
      this.tiles.reverse();
      return;
    }

    this.tiles.sort( (t1, t2) => {
      const name1 = t1.name.toLowerCase();
      const name2 = t2.name.toLowerCase();
      this.sortedStat = "Name";
      if (name1 < name2) { return 1; }
      if (name1 > name2) { return -1; }
      return 0;
    });
  }

}
