import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tri-val',
  templateUrl: './tri-val.component.html',
  styleUrls: ['./tri-val.component.css']
})
export class TriValComponent implements OnInit {

  @Input() value: number;

  constructor() { }

  ngOnInit() {
  }

}
