import { Player, NewsArticle, Match, LeaguePosition } from './types';

export const PLAYERS: Player[] = [
  { id: 1, name: "Liam Dower Nilsson", position: "C", number: 19, gp: 32, g: 12, a: 18, tp: 30, pim: 12, plusMinus: 8, corsi: 55.4, toi: "18:30", image: "https://picsum.photos/200/200?random=1" },
  { id: 2, name: "Fredric Weigel", position: "C", number: 10, gp: 30, g: 5, a: 22, tp: 27, pim: 34, plusMinus: 4, corsi: 52.1, toi: "19:45", image: "https://picsum.photos/200/200?random=2" },
  { id: 3, name: "Myles Powell", position: "RW", number: 12, gp: 31, g: 15, a: 10, tp: 25, pim: 6, plusMinus: 12, corsi: 58.2, toi: "17:15", image: "https://picsum.photos/200/200?random=3" },
  { id: 4, name: "Linus Cronholm", position: "D", number: 24, gp: 32, g: 3, a: 14, tp: 17, pim: 20, plusMinus: 15, corsi: 49.8, toi: "21:10", image: "https://picsum.photos/200/200?random=4" },
  { id: 5, name: "Gustav Possler", position: "LW", number: 41, gp: 28, g: 9, a: 11, tp: 20, pim: 8, plusMinus: 2, corsi: 51.5, toi: "15:20", image: "https://picsum.photos/200/200?random=5" },
  { id: 6, name: "Joona Voutilainen", position: "G", number: 30, gp: 25, g: 0, a: 1, tp: 1, pim: 0, plusMinus: 0, corsi: 0, toi: "60:00", image: "https://picsum.photos/200/200?random=6" },
];

export const NEWS: NewsArticle[] = [
  { 
    id: 1, 
    title: "Krossade rivalen i derbyt", 
    summary: "Björklöven dominerade fullständigt mot MODO och vann med 5-1 inför ett kokande Winpos Arena.", 
    content: "Det var aldrig något snack om saken. Redan efter första perioden stod det 3-0 på tavlan...",
    date: "2023-11-20", 
    category: "Herr", 
    type: "Matchrapport",
    image: "https://picsum.photos/600/400?random=10"
  },
  { 
    id: 2, 
    title: "Nyförvärv klart för nästa säsong", 
    summary: "Sportchefen bekräftar att man gjort klart med en toppback från SHL.", 
    content: "Vi är oerhört glada att kunna presentera...",
    date: "2023-11-19", 
    category: "Herr", 
    type: "Transfer",
    image: "https://picsum.photos/600/400?random=11"
  },
  { 
    id: 3, 
    title: "Damlaget klättrar i tabellen", 
    summary: "Efter helgens dubbla segrar har damlaget nu häng på toppen.", 
    content: "Det krävdes förlängning men två poäng bärgades...",
    date: "2023-11-18", 
    category: "Dam", 
    type: "Matchrapport",
    image: "https://picsum.photos/600/400?random=12"
  },
  { 
    id: 4, 
    title: "Intervju: 'Publiken betyder allt'", 
    summary: "Lagkaptenen hyllar stödet från Green Devils.", 
    content: "Att åka in på isen till det dånande jublet...",
    date: "2023-11-17", 
    category: "Klubb", 
    type: "Intervju",
    image: "https://picsum.photos/600/400?random=13"
  }
];

export const MATCHES: Match[] = [
  { id: 1, homeTeam: "IF Björklöven", awayTeam: "Djurgårdens IF", date: "2023-11-24", time: "19:00", isUpcoming: true, venue: "Winpos Arena" },
  { id: 2, homeTeam: "Mora IK", awayTeam: "IF Björklöven", homeScore: 2, awayScore: 3, date: "2023-11-22", time: "19:00", isUpcoming: false, venue: "Smidjegrav Arena" }
];

export const LEAGUE_TABLE: LeaguePosition[] = [
  { rank: 1, team: "IF Björklöven", gp: 18, diff: 24, points: 39, trend: 'same' },
  { rank: 2, team: "Brynäs IF", gp: 18, diff: 20, points: 37, trend: 'up' },
  { rank: 3, team: "Södertälje SK", gp: 18, diff: 8, points: 31, trend: 'down' },
  { rank: 4, team: "Djurgårdens IF", gp: 18, diff: 5, points: 30, trend: 'up' },
  { rank: 5, team: "AIK", gp: 18, diff: -2, points: 28, trend: 'same' },
];