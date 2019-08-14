import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Character } from '../../models/character';
import { CharacterService } from '../../services/character.service';
import { Observable } from 'rxjs';
import { AnalyticBlock } from '../../models/analytic-block';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {

  character: Character;
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
    private characterService: CharacterService,
  ) { }

  ngOnInit() {
    this.fetchCharacter();
  }

  fetchCharacter() {

    // this.sub = this.route.params.subscribe(params => {
    //   name = +params['name'];
    //   console.log('Need to find character: ' + name);
    //   this.character = this.characterService.getCharacterByName(name);
    // });

    this.route.params.subscribe(params => {
      const name = params['name'];
      console.log('Need to find character: ' + name);
      this.character = this.characterService.getCharacterByName(name);
    });

    // this.characterService.getCharacterByName(name).subscribe(
    //   (c) => {
    //     this.character = c;
    //   }
    // );

    // this.characterService.getCharacter(id).subscribe(
    //   (char) => {
    //     this.character = char;

    //     if (this.character === null) {
    //       console.log('Cant set character to null');
    //     } else {
    //       console.log('Set character: ' + this.character.id);
    //     }
    //   }
    // );
  }

}
