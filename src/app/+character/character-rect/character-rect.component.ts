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

  getShortenedCharacterName() {
    let shortenedName = this.character.name;
    shortenedName = this.replaceLongNameWords(shortenedName);

    return shortenedName.trim();
  }

  replaceLongNameWords(str: string): string {
    const    longNames: string[] = ['Blue', 'Brown', 'Dark', 'Gray', 'Green', 'Light', 'Koopa', 'Pink', 'Purple', 'Red', 'White', 'Yellow'];
    const replacements: string[] = ['B.',    'Br.',  'D.',   'G.',   'Gn.',   'Lt',      '',   'Pk.',   'P.',     'R.',    'W.',     'Y.'];

    for (let i = 0; i < longNames.length; i++) {
      const color = longNames[i];
      str = str.replace(color, replacements[i]);
    }
    return str;
  }
}
