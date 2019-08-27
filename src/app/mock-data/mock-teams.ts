import { Team } from '../models/team';

export const TEAMS: Team[] = [
  // tslint:disable:max-line-length
  { id: '5c886f7659e2dd2620cf4465', name: 'Reptilian Bombers',   winPct: '.600',  wins: 3, losses: 2, draws: 0, pointsFor: 7,  pointsAgainst: 6,  seasonId: '5c886f2c59e2dd2620cf4463', managerId: '5c886f5959e2dd2620cf4464'},
  { id: '5c8c5c5690ccc8221c5c93a7', name: 'Tubzzzz Squad 2016',  winPct: '.500',  wins: 1, losses: 1, draws: 0, pointsFor: 2,  pointsAgainst: 3,  seasonId: '5c886f2c59e2dd2620cf4463', managerId: '5c8c5b1d90ccc8221c5c93a1'},
  { id: '5c8c5c8490ccc8221c5c93a8', name: 'Trenton\'s Tyrants',  winPct: '.333',  wins: 1, losses: 2, draws: 0, pointsFor: 2,  pointsAgainst: 3,  seasonId: '5c886f2c59e2dd2620cf4463', managerId: '5c8c5b1790ccc8221c5c93a0'},
  { id: '5c8c5c9f90ccc8221c5c93a9', name: 'Webbs Warriors',      winPct: '.833',  wins: 2, losses: 0, draws: 1, pointsFor: 4,  pointsAgainst: 1,  seasonId: '5c886f2c59e2dd2620cf4463', managerId: '5c8c5b3390ccc8221c5c93a4'},
  { id: '5c8c5cd690ccc8221c5c93aa', name: 'DK Mamauxgers 2016',  winPct: '.300',  wins: 1, losses: 3, draws: 1, pointsFor: 3,  pointsAgainst: 5,  seasonId: '5c886f2c59e2dd2620cf4463', managerId: '5c8c5b1090ccc8221c5c939f'},
  
  { id: '5cefdd6c99522515c8487877', name: 'Bransons Team 2015',  winPct: '.636',  wins: 7, losses: 4, draws: 0, pointsFor: 29, pointsAgainst: 15, seasonId: '5cefdd2d99522515c8487876', managerId: '5c886f5959e2dd2620cf4464'},
  { id: '5cefdd9b99522515c8487878', name: 'Tubzzzz Squad 2015',  winPct: '.591',  wins: 6, losses: 4, draws: 1, pointsFor: 22, pointsAgainst: 9,  seasonId: '5cefdd2d99522515c8487876', managerId: '5c8c5b1d90ccc8221c5c93a1'},
  { id: '5cefddb299522515c8487879', name: 'Trents Team 2015',    winPct: '.682',  wins: 7, losses: 3, draws: 1, pointsFor: 32, pointsAgainst: 12, seasonId: '5cefdd2d99522515c8487876', managerId: '5c8c5b1790ccc8221c5c93a0'},
  { id: '5cefddbf99522515c848787a', name: 'Webbs Team 2015',     winPct: '.455',  wins: 3, losses: 4, draws: 4, pointsFor: 8 , pointsAgainst: 14, seasonId: '5cefdd2d99522515c8487876', managerId: '5c8c5b3390ccc8221c5c93a4'},
  { id: '5cefddcd99522515c848787b', name: 'Mamauxgers 2015',     winPct: '.364',  wins: 3, losses: 6, draws: 2, pointsFor: 20, pointsAgainst: 20, seasonId: '5cefdd2d99522515c8487876', managerId: '5c8c5b1090ccc8221c5c939f'},
  { id: '5cefddf299522515c848787c', name: 'T Cows 2015',         winPct: '.500',  wins: 5, losses: 5, draws: 1, pointsFor: 16, pointsAgainst: 19, seasonId: '5cefdd2d99522515c8487876', managerId: '5c8c5b2290ccc8221c5c93a2'},
  { id: '5cefde2799522515c848787e', name: 'Mighty Maxs 2015',    winPct: '.071',  wins: 0, losses: 6, draws: 1, pointsFor: 2 , pointsAgainst: 40, seasonId: '5cefdd2d99522515c8487876', managerId: '5c8c5b3990ccc8221c5c93a5'}, 
  { id: '5cefde0699522515c848787d', name: 'Cran Apples 2015',    winPct: '.000',  wins: 0, losses: 0, draws: 0, pointsFor: 0 , pointsAgainst: 0,  seasonId: '5cefdd2d99522515c8487876', managerId: '5c8c5b2a90ccc8221c5c93a3'},
  
  // { id: '5cf62012e5f4792cd4291c34', name: 'Baby Brothers 2014',  winPct: '.250',  wins: 5, losses: 15, draws: 0, pointsFor: 0,  pointsAgainst: 0, seasonId: '5cf61fe3e5f4792cd4291c33', managerId: '5c8c5b3990ccc8221c5c93a5'},
  // { id: '5cf62028e5f4792cd4291c35', name: 'Crantastic 9 2014',   winPct: '.000',  wins: 0, losses: 20, draws: 0, pointsFor: 0,  pointsAgainst: 0, seasonId: '5cf61fe3e5f4792cd4291c33', managerId: '5c8c5b2a90ccc8221c5c93a3'},
  // { id: '5cf62038e5f4792cd4291c36', name: 'DK Mamauxgers 2014',  winPct: '.550',  wins: 11, losses: 9, draws: 9, pointsFor: 0,  pointsAgainst: 0, seasonId: '5cf61fe3e5f4792cd4291c33', managerId: '5c8c5b1090ccc8221c5c939f'},
  // { id: '5cf6204be5f4792cd4291c37', name: 'Poon Pounders 2014',  winPct: '.650',  wins: 13, losses: 7, draws: 7, pointsFor: 0,  pointsAgainst: 0, seasonId: '5cf61fe3e5f4792cd4291c33', managerId: '5c8c5b1790ccc8221c5c93a0'},
  // { id: '5cf6205ae5f4792cd4291c38', name: 'Tubzzzz Squad 2014',  winPct: '.600',  wins: 12, losses: 7, draws: 8, pointsFor: 0,  pointsAgainst: 0, seasonId: '5cf61fe3e5f4792cd4291c33', managerId: '5c8c5b1d90ccc8221c5c93a1'},
  // { id: '5cf6206fe5f4792cd4291c39', name: 'Infinite Bloop 2014', winPct: '.950',  wins: 19, losses: 1, draws: 1, pointsFor: 0,  pointsAgainst: 0, seasonId: '5cf61fe3e5f4792cd4291c33', managerId: '5c886f5959e2dd2620cf4464'},
];
