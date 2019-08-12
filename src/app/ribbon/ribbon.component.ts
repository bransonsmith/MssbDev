import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ribbon',
  templateUrl: './ribbon.component.html',
  styleUrls: ['./ribbon.component.css']
})
export class RibbonComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

  }

  handleClick(event: Event) {
    this.router.navigateByUrl('login');
  }

  handleCollectionsClick(event: Event) {
    this.router.navigateByUrl('collections');
  }

  homeButtonClick(event: Event) {
    this.router.navigateByUrl('home');
  }

}
