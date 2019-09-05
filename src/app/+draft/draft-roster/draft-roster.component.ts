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
  characters: Character[];

  constructor(
    private characterService: CharacterService
  ) { }

  ngOnInit() {
    this.characters = [];
    if (this.draftRoster.players == null) {
      this.draftRoster.players = [];
    }
    if (this.draftRoster.name == null) {
      this.draftRoster.name = 'none';
    }
    this.draftRoster.players.forEach(player => {
      try {
        const c = this.characterService.getCharacterByName(player);
        this.characters.push(c);
      } catch (error) {
        this.characters.push(EMPTY_CHARACTER);
      }
    });
    while (this.characters.length < 9) {
      this.characters.push(EMPTY_CHARACTER);
    }
  }


}
