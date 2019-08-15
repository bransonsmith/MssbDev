import { Component, OnInit, Input } from '@angular/core';
import { Character } from '../models/character';

@Component({
  selector: 'app-roster-list-item',
  templateUrl: './roster-list-item.component.html',
  styleUrls: ['./roster-list-item.component.css']
})
export class RosterListItemComponent implements OnInit {

  @Input() character: Character;

  isSelected: boolean;

  constructor() { }

  ngOnInit() {
    this.isSelected = false;
  }

  select() {
    this.isSelected = true;
  }

  unselect() {
    this.isSelected = false;
  }

  switchSelect() {
    this.isSelected = !this.isSelected;
  }

}
