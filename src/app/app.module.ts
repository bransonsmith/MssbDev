import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './general-compnents/header/header.component';
import { HomeComponent } from './general-compnents/home/home.component';
import { PageNotFoundComponent } from './general-compnents/page-not-found/page-not-found.component';
import { FooterComponent } from './general-compnents/footer/footer.component';
import { RibbonComponent } from './general-compnents/ribbon/ribbon.component';


import {A11yModule} from '@angular/cdk/a11y';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './general-compnents/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import 'hammerjs';
import { RegisterComponent } from './register/register.component';
import { SortStatComponent } from './general-compnents/sort-stat/sort-stat.component';
import { DetailsComponent } from './general-compnents/details/details.component';
import { AnalyticBlockComponent } from './general-compnents/analytic-block/analytic-block.component';
import { CollectionsComponent } from './general-compnents/collections/collections.component';
import { CharacterComponent } from './+character/character/character.component';
import { MatchUpComponent } from './match-up/match-up.component';
import { CharacterRectComponent } from './+character/character-rect/character-rect.component';
import { TeamsHomeComponent } from './+team/teams-home/teams-home.component';
import { TriValComponent } from './general-compnents/tri-val/tri-val.component';
import { CharactersHomeComponent } from './+character/characters-home/characters-home.component';
import { TeamComponent } from './+team/team/team.component';
import { SeasonHomeComponent } from './+season/season-home/season-home.component';
import { ManagerHomeComponent } from './+manager/manager-home/manager-home.component';
import { ManagerComponent } from './+manager/manager/manager.component';
import { SeasonComponent } from './+season/season/season.component';

import { AgGridModule } from 'ag-grid-angular';
import { DraftComponent } from './+draft/draft/draft.component';
import { DraftRosterComponent } from './+draft/draft-roster/draft-roster.component';
import { DraftTileComponent } from './+draft/draft-tile/draft-tile.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    PageNotFoundComponent,
    FooterComponent,
    RibbonComponent,
    LoginComponent,
    RegisterComponent,
    SortStatComponent,
    DetailsComponent,
    AnalyticBlockComponent,
    CollectionsComponent,
    CharacterComponent,
    MatchUpComponent,
    CharacterRectComponent,
    TeamsHomeComponent,
    TriValComponent,
    CharactersHomeComponent,
    TeamComponent,
    SeasonHomeComponent,
    ManagerHomeComponent,
    ManagerComponent,
    SeasonComponent,
    DraftComponent,
    DraftRosterComponent,
    DraftTileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    AppRoutingModule,
    A11yModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    PortalModule,
    ScrollingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
