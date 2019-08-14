import { Component, OnInit, Input } from '@angular/core';
import { AnalyticBlock } from '../models/analytic-block';

@Component({
  selector: 'app-analytic-block',
  templateUrl: './analytic-block.component.html',
  styleUrls: ['./analytic-block.component.css']
})
export class AnalyticBlockComponent implements OnInit {

  @Input() analyticBlock: AnalyticBlock;

  constructor() { }

  ngOnInit() {
  }

}
