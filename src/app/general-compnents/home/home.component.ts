import { Component, OnInit } from '@angular/core';
import { Character } from '../../models/character';
import { SortStat } from '../../models/sort-stat';
import { isPrimitive } from 'util';
import { ActivatedRoute, Router } from '@angular/router';
import { CHARACTERS } from '../../mock-data/mock-characters';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  characters: Character[] = CHARACTERS;

  sortedStat: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  onCharacterClick(character: Character) {

    console.log('Clicked on character: ' + character.id + ' ' + character.name);
    this.router.navigateByUrl('characters/' + character.name);
  }

  getRatingTotal(character: Character) {
    const ratingTotalStat: SortStat = {
      value: String(character.bat + character.run + character.field + character.pitch),
      isPrimary: this.sortedStat === "Total",
      name: "Total"
    };

    return ratingTotalStat;
  }

  getNumber(character: Character) {
    if (character.id == null) {
      return "  ";
    }
    return character.id;
  }

  getBatStat(character: Character) {
    const batStat: SortStat = {
      value: String(character.bat),
      isPrimary: this.sortedStat === "Batting",
      name: "Batting"
    };

    return batStat;
  }

  getRunStat(character: Character) {
    const batStat: SortStat = {
      value: String(character.run),
      isPrimary: this.sortedStat === "Running",
      name: "Running"
    };

    return batStat;
  }

  getFieldStat(character: Character) {
    const batStat: SortStat = {
      value: String(character.field),
      isPrimary: this.sortedStat === "Fielding",
      name: "Fielding"
    };

    return batStat;
  }

  getPitchStat(character: Character) {
    const batStat: SortStat = {
      value: String(character.pitch),
      isPrimary: this.sortedStat === "Pitching",
      name: "Pitching"
    };

    return batStat;
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  sortByRatingTotal() {
    if (this.sortedStat === "Total") {
      this.characters.reverse();
      return;
    }

    this.characters.sort( (t1, t2) => {
      const num1 = t1.bat + t1.run + t1.field + t1.pitch;
      const num2 = t2.bat + t2.run + t2.field + t2.pitch;
      this.sortedStat = "Total";
      if (num1 < num2) { return 1; }
      if (num1 > num2) { return -1; }
      return 0;
    });
  }

  sortByRandom() {
    let newCharacters: Character[] = [];

    this.characters.forEach(character => {
      let newIndex = this.getRandomInt(newCharacters.length);
      newCharacters.splice(newIndex, 0, character);
    });
    this.sortedStat = null;
    this.characters = newCharacters;
  }

  sortByBatting() {

    if (this.sortedStat === "Batting") {
      this.characters.reverse();
      return;
    }

    this.characters.sort( (t1, t2) => {
      const num1 = t1.bat;
      const num2 = t2.bat;
      this.sortedStat = "Batting";
      if (num1 < num2) { return 1; }
      if (num1 > num2) { return -1; }
      return 0;
    });
  }

  sortByRunning() {

    if (this.sortedStat === "Running") {
      this.characters.reverse();
      return;
    }

    this.characters.sort( (t1, t2) => {
      const num1 = t1.run;
      const num2 = t2.run;
      this.sortedStat = "Running";
      if (num1 < num2) { return 1; }
      if (num1 > num2) { return -1; }
      return 0;
    });
  }

  sortByFielding() {

    if (this.sortedStat === "Fielding") {
      this.characters.reverse();
      return;
    }

    this.characters.sort( (t1, t2) => {
      const num1 = t1.field;
      const num2 = t2.field;
      this.sortedStat = "Fielding";
      if (num1 < num2) { return 1; }
      if (num1 > num2) { return -1; }
      return 0;
    });
  }

  sortByPitching() {

    if (this.sortedStat === "Pitching") {
      this.characters.reverse();
      return;
    }

    this.characters.sort( (t1, t2) => {
      const num1 = t1.pitch;
      const num2 = t2.pitch;
      this.sortedStat = "Pitching";
      if (num1 < num2) { return 1; }
      if (num1 > num2) { return -1; }
      return 0;
    });
  }

  sortByNumber() {

    if (this.sortedStat === "Number") {
      this.characters.reverse();
      return;
    }

    this.characters.sort( (t1, t2) => {
      const num1 = t1.id;
      const num2 = t2.id;
      this.sortedStat = "Number";
      if (num1 > num2) { return 1; }
      if (num1 < num2) { return -1; }
      return 0;
    });
  }

  sortByName() {

    if (this.sortedStat === "Name") {
      this.characters.reverse();
      return;
    }

    this.characters.sort( (t1, t2) => {
      const name1 = t1.name.toLowerCase();
      const name2 = t2.name.toLowerCase();
      this.sortedStat = "Name";
      if (name1 < name2) { return 1; }
      if (name1 > name2) { return -1; }
      return 0;
    });
  }

}
