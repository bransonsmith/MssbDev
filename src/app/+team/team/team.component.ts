import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Team } from '../../models/team';
import { StatCollection } from '../../models/stat-collection';
import { TeamService } from '../../services/team.service';
import { StatCollectionService } from '../../services/stat-collection.service';
import { Observable } from 'rxjs';
import { AnalyticBlock } from '../../models/analytic-block';
import { PlayerInstance } from 'src/app/models/player-instance';
import { PlayerInstanceService } from 'src/app/services/player-instance.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  team: Team;
  playerInstances: PlayerInstance[];
  stats: StatCollection[];

  displayedColumns: string[] = ['PA', 'AB', 'H', 'DB', 'TB', 'HR', 'R', 'RBI', 'SO', 'BBFC', 'SB', 'IP', 'ER', 'K', 'W', 'L', 'AVG', 'OBP', 'SLUG', 'OPS', 'ERA', 'K5'];
  // displayedColumns: string[] = ['PA', 'AB', 'H', 'DB', 'TB',];
  dataSource;

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
    private teamService: TeamService,
    private statCollectionService: StatCollectionService,
    private playerInstanceService: PlayerInstanceService,
  ) { }

  ngOnInit() {
    this.fetchTeam();
  }

  fetchTeam() {

    // this.sub = this.route.params.subscribe(params => {
    //   name = +params['name'];
    //   console.log('Need to find team: ' + name);
    //   this.team = this.teamService.getTeamByName(name);
    // });

    this.route.params.subscribe(params => {
      const name = params['name'];
      this.stats = [];
      console.log('Need to find team: ' + name);
      this.teamService.getTeam(name).subscribe(
        (t) => {
          this.team = t;
          this.playerInstanceService.getPlayerInstancesWithEntId(this.team.id).subscribe(
            (pinsts) => {
              pinsts.forEach(pi => {

                this.statCollectionService.getEntStatCollections(pi.id).subscribe(
                  (statCollections) => {
                    statCollections.forEach(sc => {
                      this.stats.push(sc);
                    });
                  }
                );
              });
              this.statCollectionService.getEntStatCollections(this.team.id).subscribe(
                (statCollections) => {
                  statCollections.forEach(sc => {
                    this.stats.push(sc);
                  });
                  this.dataSource = this.stats;
                }
              );
            }
          );
        }
      );
    });
  }
}
