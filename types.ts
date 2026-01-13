export enum ViewState {
  DASHBOARD = 'DASHBOARD',
  NEWS = 'NEWS',
  STATS = 'STATS',
  ABOUT = 'ABOUT'
}

export interface Player {
  id: number;
  name: string;
  position: string;
  number: number;
  gp: number; // Games Played
  g: number;  // Goals
  a: number;  // Assists
  tp: number; // Total Points
  pim: number; // Penalty Minutes
  plusMinus: number;
  image: string;
  corsi: number; // Advanced stat
  toi: string; // Time on Ice (avg)
}

export interface NewsArticle {
  id: number;
  title: string;
  summary: string;
  content: string;
  image: string;
  date: string;
  category: 'Herr' | 'Dam' | 'J20' | 'Klubb';
  type: 'Matchrapport' | 'Intervju' | 'Transfer' | 'Övrigt';
}

export interface Match {
  id: number;
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  date: string;
  time: string;
  isUpcoming: boolean;
  venue: string;
}

export interface LeaguePosition {
  rank: number;
  team: string;
  gp: number;
  diff: number;
  points: number;
  trend: 'up' | 'down' | 'same';
}