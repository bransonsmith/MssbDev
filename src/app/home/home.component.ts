import { Component, OnInit } from '@angular/core';
import { Tile } from '../tile';
import { SortStat } from '../sort-stat/sort-stat';
import { isPrimitive } from 'util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  tiles: Tile[] = [
    {name: 'Apple',     bat:  3, run: 10, pitch:  7, field: 8, number:  1, info: 'Crisp fruit; varies in color.'},
    {name: 'Banana',    bat:  3, run: 10, pitch:  7, field: 8, number:  2, info: 'Soft, yellow, and long.'},
    {name: 'Orange',    bat:  3, run: 10, pitch:  7, field: 8, number:  3, info: 'Orange ball with tart fruit inside tough skin.'},
    {name: 'Peach',     bat:  3, run:  9, pitch:  7, field: 8, number:  4, info: 'Soft sunshine colored fruit. Sour and sweet.'},
    {name: 'Lime',      bat:  3, run:  9, pitch:  7, field: 8, number:  5, info: 'Sour, green, and fresh citrus fruit.'},
    {name: 'Mango',     bat:  3, run:  9, pitch: 10, field: 8, number:  6, info: 'Sweet orange fruit.'},
    {name: 'Pineapple', bat:  3, run:  9, pitch: 10, field: 8, number:  7, info: 'Large fruit, golden fruit inside. '},
    {name: 'Grape',     bat:  4, run:  9, pitch: 10, field: 8, number:  8, info: 'Tiny, soft, and comes in many varieties.'},
    {name: 'Banana',    bat:  4, run:  9, pitch: 10, field: 5, number: 12, info: 'Soft, yellow, and long.'},
    {name: 'Orange',    bat:  4, run:  9, pitch:  5, field: 5, number: 13, info: 'Orange ball with tart fruit inside tough skin.'},
    {name: 'Peach',     bat:  4, run:  9, pitch:  5, field: 5, number: 14, info: 'Soft sunshine colored fruit. Sour and sweet.'},
    {name: 'Lime',      bat:  4, run:  8, pitch:  5, field: 5, number: 15, info: 'Sour, green, and fresh citrus fruit.'},
    {name: 'Mango',     bat:  4, run:  8, pitch:  9, field: 4, number: 16, info: 'Sweet orange fruit.'},
    {name: 'Pineapple', bat:  4, run:  8, pitch:  9, field: 4, number: 17, info: 'Large fruit with golden fruit inside. '},
    {name: 'Grape',     bat:  4, run:  8, pitch:  9, field: 4, number: 18, info: 'Tiny, soft, and comes in many varieties.'},
    {name: 'Apple',     bat:  4, run:  8, pitch:  5, field: 4, number: 21, info: 'Crisp fruit; varies in color.'},
    {name: 'Banana',    bat:  4, run:  8, pitch:  5, field: 4, number: 22, info: 'Soft, yellow, and long.'},
    {name: 'Orange',    bat:  4, run:  7, pitch:  5, field: 4, number: 23, info: 'Orange ball with tart fruit inside tough skin.'},
    {name: 'Peach',     bat:  5, run:  7, pitch:  4, field: 4, number: 24, info: 'Soft sunshine colored fruit. Sour and sweet.'},
    {name: 'Lime',      bat:  5, run:  7, pitch:  4, field: 5, number: 25, info: 'Sour, green, and fresh citrus fruit.'},
    {name: 'Mango',     bat:  5, run:  7, pitch:  4, field: 5, number: 26, info: 'Sweet orange fruit.'},
    {name: 'Pineapple', bat:  5, run:  7, pitch:  4, field: 9, number: 27, info: 'Large fruit with  golden fruit inside. '},
    {name: 'Grape',     bat:  5, run:  7, pitch:  4, field: 9, number: 28, info: 'Tiny, soft, and comes in many varieties.'},
    {name: 'Banana',    bat:  5, run:  6, pitch:  4, field: 9, number: 32, info: 'Soft, yellow, and long.'},
    {name: 'Orange',    bat:  6, run:  6, pitch:  4, field: 9, number: 33, info: 'Orange ball with tart fruit inside tough skin.'},
    {name: 'Peach',     bat:  6, run:  6, pitch:  4, field: 9, number: 34, info: 'Soft sunshine colored fruit. Sour and sweet.'},
    {name: 'Lime',      bat:  6, run:  6, pitch:  4, field: 9, number: 35, info: 'Sour, green, and fresh citrus fruit.'},
    {name: 'Mango',     bat:  6, run:  6, pitch:  4, field: 5, number: 36, info: 'Sweet orange fruit.'},
    {name: 'Pineapple', bat:  6, run:  6, pitch:  4, field: 5, number: 37, info: 'Large fruit with  golden fruit inside. '},
    {name: 'Grape',     bat:  6, run:  6, pitch:  5, field: 6, number: 38, info: 'Tiny, soft, and comes in many varieties.'},
    {name: 'Apple',     bat:  6, run:  6, pitch:  7, field: 6, number: 41, info: 'Crisp fruit; varies in color.'},
    {name: 'Banana',    bat:  6, run:  6, pitch:  7, field: 6, number: 42, info: 'Soft, yellow, and long.'},
    {name: 'Orange',    bat:  6, run:  6, pitch:  7, field: 6, number: 43, info: 'Orange ball with tart fruit inside tough skin.'},
    {name: 'Peach',     bat:  6, run:  6, pitch:  7, field: 6, number: 44, info: 'Soft sunshine colored fruit. Sour and sweet.'},
    {name: 'Lime',      bat:  7, run:  6, pitch:  7, field: 6, number: 45, info: 'Sour, green, and fresh citrus fruit.'},
    {name: 'Mango',     bat:  7, run:  6, pitch:  7, field: 7, number: 46, info: 'Sweet orange fruit.'},
    {name: 'Pineapple', bat:  7, run:  6, pitch:  7, field: 7, number: 47, info: 'Large fruit with  golden fruit inside. '},
    {name: 'Grape',     bat:  7, run:  6, pitch:  7, field: 7, number: 48, info: 'Tiny, soft, and comes in many varieties.'},
    {name: 'Banana',    bat:  7, run:  6, pitch:  5, field: 7, number: 52, info: 'Soft, yellow, and long.'},
    {name: 'Orange',    bat:  7, run:  6, pitch:  3, field: 7, number: 53, info: 'Orange ball with tart fruit inside tough skin.'},
    {name: 'Peach',     bat:  7, run:  6, pitch:  3, field: 7, number: 54, info: 'Soft sunshine colored fruit. Sour and sweet.'},
    {name: 'Lime',      bat:  7, run:  6, pitch:  3, field: 7, number: 55, info: 'Sour, green, and fresh citrus fruit.'},
    {name: 'Mango',     bat:  7, run:  5, pitch:  3, field: 7, number: 56, info: 'Sweet orange fruit.'},
    {name: 'Pineapple', bat:  7, run:  5, pitch:  3, field: 7, number: 57, info: 'Large fruit with  golden fruit inside. '},
    {name: 'Grape',     bat:  7, run:  5, pitch:  3, field: 7, number: 58, info: 'Tiny, soft, and comes in many varieties.'},
    {name: 'Apple',     bat:  7, run:  5, pitch:  3, field: 3, number: 61, info: 'Crisp fruit; varies in color.'},
    {name: 'Banana',    bat:  7, run:  5, pitch:  3, field: 3, number: 62, info: 'Soft, yellow, and long.'},
    {name: 'Orange',    bat:  8, run:  5, pitch:  3, field: 3, number: 63, info: 'Orange ball with tart fruit inside tough skin.'},
    {name: 'Peach',     bat:  8, run:  5, pitch:  3, field: 3, number: 64, info: 'Soft sunshine colored fruit. Sour and sweet.'},
    {name: 'Lime',      bat:  8, run:  4, pitch:  3, field: 3, number: 65, info: 'Sour, green, and fresh citrus fruit.'},
    {name: 'Mango',     bat:  8, run:  4, pitch:  3, field: 3, number: 66, info: 'Sweet orange fruit.'},
    {name: 'Pineapple', bat:  8, run:  4, pitch:  3, field: 3, number: 67, info: 'Large fruit with  golden fruit inside. '},
    {name: 'Grape',     bat:  8, run:  4, pitch:  5, field: 5, number: 68, info: 'Tiny, soft, and comes in many varieties.'},
    {name: 'Banana',    bat:  8, run:  4, pitch:  5, field: 5, number: 72, info: 'Soft, yellow, and long.'},
    {name: 'Orange',    bat:  8, run:  4, pitch:  5, field: 5, number: 73, info: 'Orange ball with tart fruit inside tough skin.'},
    {name: 'Peach',     bat:  8, run:  3, pitch:  5, field: 8, number: 74, info: 'Soft sunshine colored fruit. Sour and sweet.'},
    {name: 'Lime',      bat:  9, run:  3, pitch:  5, field: 8, number: 75, info: 'Sour, green, and fresh citrus fruit.'},
    {name: 'Mango',     bat:  9, run:  2, pitch:  5, field: 8, number: 76, info: 'Sweet orange fruit.'},
    {name: 'Pineapple', bat:  9, run:  2, pitch:  5, field: 8, number: 77, info: 'Large fruit with  golden fruit inside. '},
    {name: 'Grape',     bat: 10, run:  2, pitch:  5, field: 8, number: 78, info: 'Tiny, soft, and comes in many varieties.'},
  ];

  sortedStat: string;

  constructor() { }

  ngOnInit() {
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
