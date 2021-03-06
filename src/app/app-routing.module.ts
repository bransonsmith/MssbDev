import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './general-compnents/page-not-found/page-not-found.component';
import { HomeComponent } from './general-compnents/home/home.component';
import { LoginComponent } from './general-compnents/login/login.component';
import { DetailsComponent } from './general-compnents/details/details.component';
import { CollectionsComponent } from './general-compnents/collections/collections.component';
import { CharacterComponent } from './+character/character/character.component';
import { MatchUpComponent } from './match-up/match-up.component';
import { TeamsHomeComponent } from './+team/teams-home/teams-home.component';
import { CharactersHomeComponent } from './+character/characters-home/characters-home.component';
import { TeamComponent } from './+team/team/team.component';
import { SeasonComponent } from './+season/season/season.component';
import { SeasonHomeComponent } from './+season/season-home/season-home.component';
import { ManagerHomeComponent } from './+manager/manager-home/manager-home.component';
import { ManagerComponent } from './+manager/manager/manager.component';
import { DraftComponent } from './+draft/draft/draft.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },

  { path: 'characters/:name', component: CharacterComponent },
  { path: 'managers/:name', component: ManagerComponent },
  { path: 'seasons/:name', component: SeasonComponent },
  { path: 'teams/:name', component: TeamComponent },

  { path: 'characters', component: CharactersHomeComponent },
  { path: 'managers', component: ManagerHomeComponent },
  { path: 'seasons', component: SeasonHomeComponent },
  { path: 'teams', component: TeamsHomeComponent },
  { path: 'draft', component: DraftComponent },

  { path: 'collections', component: CollectionsComponent },
  { path: 'matchUp', component: MatchUpComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
