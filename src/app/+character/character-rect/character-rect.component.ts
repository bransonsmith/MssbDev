import { Component, OnInit, Input } from '@angular/core';
import { Character } from 'src/app/models/character';

@Component({
  selector: 'app-character-rect',
  templateUrl: './character-rect.component.html',
  styleUrls: ['./character-rect.component.css']
})
export class CharacterRectComponent implements OnInit {

  @Input() character: Character;

  isSelected: boolean;

  constructor() { }

  ngOnInit() {
    this.isSelected = false;
  }

  showCaptainSymbol(): boolean {
    return this.character.isCaptain && this.character.name !== 'Empty';
  }

  onRosterListItemClick() {
    this.isSelected = !this.isSelected;
  }

}
