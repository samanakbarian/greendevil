import React, { createContext, useContext, useEffect, useState } from 'react';
import { MATCHES, NEWS, PLAYERS, LEAGUE_TABLE } from '../constants';
import { fetchRealData } from '../services/api';
import { Match, NewsArticle, Player, LeaguePosition } from '../types';

interface DataContextType {
  matches: Match[];
  news: NewsArticle[];
  players: Player[];
  leagueTable: LeaguePosition[];
  loading: boolean;
  lastUpdated: Date | null;
  refresh: () => void;
}

const DataContext = createContext<DataContextType>({
  matches: MATCHES,
  news: NEWS,
  players: PLAYERS,
  leagueTable: LEAGUE_TABLE,
  loading: false,
  lastUpdated: null,
  refresh: () => {},
});

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    matches: MATCHES,
    news: NEWS,
    players: PLAYERS,
    leagueTable: LEAGUE_TABLE,
  });
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const refresh = async () => {
    setLoading(true);
    const realData = await fetchRealData();
    
    if (realData) {
      // Transform API data to match our types
      
      // Update Matches
      const nextMatch: Match = {
        id: 1, // ID doesn't matter much for display
        homeTeam: realData.nextMatch.isHome ? "IF Björklöven" : realData.nextMatch.opponent,
        awayTeam: realData.nextMatch.isHome ? realData.nextMatch.opponent : "IF Björklöven",
        date: realData.nextMatch.date,
        time: realData.nextMatch.time,
        venue: realData.nextMatch.venue,
        isUpcoming: true
      };

      // Update News
      const newNews: NewsArticle[] = realData.news.map((n: any, idx: number) => ({
        id: 100 + idx,
        title: n.title,
        summary: n.summary,
        content: n.summary, // Fallback content
        image: `https://picsum.photos/600/400?random=${100 + idx}`, // Placeholder
        date: n.date,
        category: n.category as any || 'Herr',
        type: 'Övrigt'
      }));

      // Update Table
      const newTable: LeaguePosition[] = realData.leagueTable.map((t: any) => ({
        rank: t.rank,
        team: t.team,
        gp: 0, // API might not return this, simplified
        diff: t.diff,
        points: t.points,
        trend: 'same'
      }));

      // Update Players (Merge with existing for images/details)
      const newPlayers = [...PLAYERS];
      realData.topScorers.forEach((scorer: any) => {
        // Try to find existing player to update, or add new
        const existingIdx = newPlayers.findIndex(p => p.name.includes(scorer.name.split(' ')[1])); // Simple fuzzy match on last name
        if (existingIdx !== -1) {
          newPlayers[existingIdx] = {
            ...newPlayers[existingIdx],
            g: scorer.goals,
            a: scorer.assists,
            tp: scorer.points,
            gp: scorer.gamesPlayed || newPlayers[existingIdx].gp
          };
        } else {
            // If new top scorer not in our mock list
            newPlayers.push({
                id: 200 + Math.random(),
                name: scorer.name,
                position: "FW",
                number: 0,
                gp: scorer.gamesPlayed || 0,
                g: scorer.goals,
                a: scorer.assists,
                tp: scorer.points,
                pim: 0,
                plusMinus: 0,
                corsi: 50,
                toi: "15:00",
                image: `https://ui-avatars.com/api/?name=${scorer.name}&background=005A31&color=fff`
            });
        }
      });
      
      // Sort players by points
      newPlayers.sort((a, b) => b.tp - a.tp);

      setData({
        matches: [nextMatch],
        news: newNews.length > 0 ? newNews : NEWS,
        players: newPlayers,
        leagueTable: newTable.length > 0 ? newTable : LEAGUE_TABLE,
      });
      setLastUpdated(new Date());
    }
    setLoading(false);
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <DataContext.Provider value={{ ...data, loading, lastUpdated, refresh }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
