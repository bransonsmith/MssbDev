import { Component, OnInit, Input } from '@angular/core';
import { SortStat } from '../../models/sort-stat';

@Component({
  selector: 'app-sort-stat',
  templateUrl: './sort-stat.component.html',
  styleUrls: ['./sort-stat.component.css']
})
export class SortStatComponent implements OnInit {

  @Input() sortStat: SortStat;

  isStatPrimary() {
    return this.sortStat.isPrimary;
  }

  isNotPrimary() {
    return !this.isStatPrimary();
  }

  constructor() { }

  ngOnInit() {
  }

}
