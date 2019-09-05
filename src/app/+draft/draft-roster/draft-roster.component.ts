import { Component, OnInit, Input } from '@angular/core';
import { DraftRoster } from 'src/app/models/draft-roster';
import { Character } from 'src/app/models/character';
import { CharacterService } from 'src/app/services/character.service';
import { EMPTY_CHARACTER } from 'src/app/mock-data/empty-character';

@Component({
  selector: 'app-draft-roster',
  templateUrl: './draft-roster.component.html',
  styleUrls: ['./draft-roster.component.css']
})
export class DraftRosterComponent implements OnInit {

  @Input() draftRoster: DraftRoster;

  constructor(
    private characterService: CharacterService
  ) { }

  ngOnInit() {
    if (this.draftRoster.characters == null) {
      this.draftRoster.characters = [];
    }
    if (this.draftRoster.name == null) {
      this.draftRoster.name = 'none';
    }
    this.draftRoster.characters.forEach(character => {
      try {
        const c = this.characterService.getCharacterByName(character.name);
        this.draftRoster.characters.push(c);
      } catch (error) {
        this.draftRoster.characters.push(EMPTY_CHARACTER);
      }
    });
    while (this.draftRoster.characters.length < 9) {
      this.draftRoster.characters.push(EMPTY_CHARACTER);
    }
  }


}
