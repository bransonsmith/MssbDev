import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tile } from '../models/tile';
import { TileService } from '../services/tile.service';
import { Observable } from 'rxjs';
import { AnalyticBlock } from '../models/analytic-block';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  tile: Tile;
  seasons = [
    { num1: 2001, num2: 1, num3: .314, num4: .401, num5: .345, num6: .345, num7: .345, num8: .345, num9: .345 },
    { num1: 2002, num2: 5, num3: .365, num4: .475, num5: .324, num6: .345, num7: .345, num8: .345, num9: .345 },
    { num1: 2003, num2: 4, num3: .364, num4: .445, num5: .233, num6: .345, num7: .345, num8: .345, num9: .345 },
    { num1: 2004, num2: 3, num3: .374, num4: .385, num5: .432, num6: .345, num7: .345, num8: .345, num9: .345 },
    { num1: 2005, num2: 4, num3: .265, num4: .333, num5: .323, num6: .345, num7: .345, num8: .345, num9: .345 },
    { num1: 2006, num2: 2, num3: .395, num4: .340, num5: .231, num6: .345, num7: .345, num8: .345, num9: .345 },
  ];
  displayedColumns: string[] = ['num1', 'num2', 'num3', 'num4', 'num5'];
  dataSource = this.seasons;
  private sub: any;

  analyticBlock1: AnalyticBlock = {
    name: 'HR per AB',
    rank: '1',
    outOf: '72',
    symbolImgPath: '../../assets/images/analytic-blocks/batting.png',
    value: 'tbd'
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tileService: TileService,
  ) { }

  ngOnInit() {
    this.fetchTile();
  }

  fetchTile() {
    let id;
    this.sub = this.route.params.subscribe(params => {
      id = +params['id'];
    });

    this.tile = this.tileService.getTile(id);
    if (this.tile === null) {
      console.log('Cant set tile to null');
    } else {
      console.log('Set tile: ' + this.tile.number);
    }
  }

}
