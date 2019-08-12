import { Injectable } from '@angular/core';
import { TILES } from '../mock-tiles';
import { Tile } from '../tile';

@Injectable({
  providedIn: 'root'
})
export class TileService {

  constructor() { }

  getTiles(): Tile[] {
    return TILES;
  }

  getTile(id: number): Tile {
    let tileToReturn = null;
    TILES.forEach(tile => {
      if (tile.number === id) {
        tileToReturn = tile;
        return;
      }
    });

    console.log('Got tile: ' + tileToReturn.number);
    return tileToReturn;
  }

}
