import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DraftRoster } from 'src/app/models/draft-roster';
import { Character } from 'src/app/models/character';
import { CharacterService } from 'src/app/services/character.service';
import { EMPTY_CHARACTER } from 'src/app/mock-data/empty-character';

@Component({
  selector: 'app-draft',
  templateUrl: './draft.component.html',
  styleUrls: ['./draft.component.css']
})
export class DraftComponent implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  draftNotStarted: boolean;
  draftRosters: DraftRoster[];
  howManyOptions: number[] = [2, 3, 4, 5, 6, 7, 8];

  currentPicker: DraftRoster;
  unpickedCharacters: Character[];
  currentCharacter: Character;
  seconds: number = 30;
  selectedIndex: number;

  constructor(
    private formBuilder: FormBuilder,
    private characterService: CharacterService) {}

  ngOnInit() {


    this.draftNotStarted = true;
    this.initDraftRosters();
    this.characterService.getCharacters().subscribe(
      (cs) => {
        this.unpickedCharacters = cs;
        this.selectedIndex = this.getRandomInt(this.unpickedCharacters.length);
        this.currentCharacter = this.unpickedCharacters[this.selectedIndex];
      }
    );

    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl1: ['', Validators.required],
      secondCtrl2: ['', Validators.required],
      secondCtrl3: ['', Validators.required],
      secondCtrl4: ['', Validators.required],
      secondCtrl5: ['', Validators.required],
      secondCtrl6: ['', Validators.required],
      secondCtrl7: ['', Validators.required],
      secondCtrl8: ['', Validators.required],
    });
  }

  getListOf(num: number): number[] {
    const list = [];
    for (let index = 1; index <= num; index++) {
      const element = num;
      list.push(element);
    }
    return list;
  }

  onRosterListItemClick(i: number) {
    this.unpickedCharacters[this.selectedIndex] = this.cloneCharacter(this.unpickedCharacters[this.selectedIndex]);
    this.selectedIndex = i;
    this.currentCharacter = this.unpickedCharacters[this.selectedIndex];
  }

  beginDraft(names: FormGroup) {
    console.log(names);
    this.draftRosters = [];
    if (names.value.secondCtrl1 !== '') {
      this.draftRosters.push({name: names.value.secondCtrl1, characters: []});
    }
    if (names.value.secondCtrl2 !== '') {
      this.draftRosters.push({name: names.value.secondCtrl2, characters: []});
    }
    if (names.value.secondCtrl3 !== '') {
      this.draftRosters.push({name: names.value.secondCtrl3, characters: []});
    }
    if (names.value.secondCtrl4 !== '') {
      this.draftRosters.push({name: names.value.secondCtrl4, characters: []});
    }
    if (names.value.secondCtrl5 !== '') {
      this.draftRosters.push({name: names.value.secondCtrl5, characters: []});
    }
    if (names.value.secondCtrl6 !== '') {
      this.draftRosters.push({name: names.value.secondCtrl6, characters: []});
    }
    if (names.value.secondCtrl7 !== '') {
      this.draftRosters.push({name: names.value.secondCtrl7, characters: []});
    }
    if (names.value.secondCtrl8 !== '') {
      this.draftRosters.push({name: names.value.secondCtrl8, characters: []});
    }

    this.shuffle(this.draftRosters);
    this.currentPicker = this.draftRosters[0];
    this.draftNotStarted = false;
  }

  initDraftRosters() {
    this.draftRosters = [];
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  pick() {
    this.flushEmpties(this.currentPicker);
    this.currentPicker.characters.push(this.currentCharacter);
    this.unpickedCharacters.splice(this.unpickedCharacters.indexOf(this.currentCharacter), 1);
    this.fillEmpties(this.currentPicker);

    this.updateCurrentPicker();
    this.selectedIndex = this.getRandomInt(this.unpickedCharacters.length);
    this.currentCharacter = this.unpickedCharacters[this.selectedIndex];
  }

  flushEmpties(dr: DraftRoster) {
    const temp: Character[] = [];
    dr.characters.forEach(c => {
        if (c.name !== 'Empty') {
          temp.push(c);
        }
    });
    dr.characters = temp;
  }

  fillEmpties(dr: DraftRoster) {
      while (dr.characters.length < 9) {
        dr.characters.push(EMPTY_CHARACTER);
      }
  }

  updateCurrentPicker() {
    for (let x = 0; x < this.draftRosters.length; x++) {
      const rosterX = this.draftRosters[x];
      if (rosterX.name === this.currentPicker.name) {
        if (x === this.draftRosters.length - 1) {
          this.draftRosters.reverse();
        } else {
          this.currentPicker = this.draftRosters[x + 1];
        }
        return;
      }
    }
  }

  shuffle(list: DraftRoster[]) {
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

      [list[i], list[j]] = [list[j], list[i]];
    }
  }

  reverseOrder(list: DraftRoster[]) {
    list.reverse();
  }

  cloneCharacter(character: Character): Character {

    const clone = {
      id: character.id,
      name: character.name,
      bat: character.bat,
      field: character.field,
      run: character.run,
      pitch: character.pitch,
      lean: character.lean,
      zone: character.zone,
      agility: character.agility,
      coverage: character.coverage,
      reachOut: character.reachOut,
      reachIn: character.reachIn,
      dive: character.dive,
      size: character.size,
      arm: character.arm,
      jump: character.jump,
      chemistry: character.chemistry,
      stamina: character.stamina,
      curve: character.curve,
      velocity: character.velocity,
      chargeVelocity: character.chargeVelocity,
      changeUp: character.changeUp,
      isCaptain: character.isCaptain,
      captainAbilityOffense: character.captainAbilityOffense,
      captainAbilityDefense: character.captainAbilityDefense,
      description: character.description,
      notes: character.notes,
      ability: character.ability,
      originGroup: character.originGroup,
      tags: character.tags
    };

    return clone;
  }
}
