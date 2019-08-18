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

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'characters/:name', component: CharacterComponent },
  { path: 'teams', component: TeamsHomeComponent },
  { path: 'characters', component: CharactersHomeComponent },
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
