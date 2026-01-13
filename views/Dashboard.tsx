import React from 'react';
import { useData } from '../contexts/DataContext';
import { Calendar, TrendingUp, TrendingDown, Minus, ArrowRight, Zap, RefreshCw, Trophy, MapPin } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { matches, news, leagueTable, players, loading, refresh } = useData();
  
  const nextMatch = matches.find(m => m.isUpcoming) || matches[0];
  const latestNews = news[0];

  if (!nextMatch) return null;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Action */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
        <div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase mb-2">
                Match<span className="text-loven-yellow">Center</span>
            </h1>
            <p className="text-white/40 font-medium">Din dagliga dos av Björklöven.</p>
        </div>
        <button 
          onClick={refresh}
          className={`group flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 hover:border-loven-green/50 hover:bg-white/10 transition-all ${loading ? 'opacity-50' : ''}`}
        >
            <RefreshCw size={14} className={`text-loven-yellow ${loading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
            <span className="text-xs font-bold uppercase tracking-widest text-white">Uppdatera</span>
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* HERO: Next Match Poster (Span 8) */}
        <div className="lg:col-span-8 relative min-h-[400px] rounded-3xl overflow-hidden group border border-white/10">
            {/* Background Image/Gradient */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1580748141549-71748dbe0bdc?q=80&w=2574&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-loven-green/80 to-transparent mix-blend-multiply" />
            
            <div className="relative z-10 h-full p-8 md:p-12 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white text-xs font-bold uppercase tracking-widest">
                        <Calendar size={12} className="text-loven-yellow" />
                        {nextMatch.date} • {nextMatch.time}
                    </div>
                    <div className="hidden md:flex items-center gap-2 text-white/60 text-sm font-bold">
                        <MapPin size={14} />
                        {nextMatch.venue}
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-8 mt-8">
                    {/* Home Team */}
                    <div className="flex flex-col items-center md:items-start">
                        <span className="text-[100px] md:text-[140px] font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10 tracking-tighter opacity-80">
                            {nextMatch.homeTeam.substring(0,3).toUpperCase()}
                        </span>
                        <span className="text-xl md:text-2xl font-bold text-white uppercase tracking-widest -mt-4 md:-mt-8 ml-2">
                             {nextMatch.homeTeam.includes('Björklöven') ? 'Björklöven' : nextMatch.homeTeam}
                        </span>
                    </div>

                    {/* VS Badge */}
                    <div className="relative w-20 h-20 flex items-center justify-center">
                        <div className="absolute inset-0 bg-loven-yellow skew-x-12 rounded-lg blur-lg opacity-50 animate-pulse" />
                        <div className="absolute inset-0 bg-loven-yellow skew-x-12 rounded-lg border-2 border-white/20" />
                        <span className="relative text-3xl font-black text-black italic">VS</span>
                    </div>

                    {/* Away Team */}
                    <div className="flex flex-col items-center md:items-end">
                        <span className="text-[100px] md:text-[140px] font-black leading-none text-white/10 tracking-tighter">
                            {nextMatch.awayTeam.substring(0,3).toUpperCase()}
                        </span>
                         <span className="text-xl md:text-2xl font-bold text-white/60 uppercase tracking-widest -mt-4 md:-mt-8 mr-2">
                             {nextMatch.awayTeam.includes('Björklöven') ? 'Björklöven' : nextMatch.awayTeam}
                        </span>
                    </div>
                </div>
                
                <div className="mt-8">
                     <button className="w-full md:w-auto px-8 py-4 bg-white text-black font-black uppercase tracking-wider rounded-xl hover:bg-loven-yellow transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,210,0,0.5)]">
                        Matchcenter
                     </button>
                </div>
            </div>
        </div>

        {/* STATS: Top Scorers (Span 4) */}
        <div className="lg:col-span-4 bg-[#0a0a0a] border border-white/10 rounded-3xl p-6 flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-2">
                    <Trophy size={20} className="text-loven-yellow" />
                    Poängkungar
                </h3>
            </div>
            <div className="space-y-4 flex-1">
                {players.slice(0, 4).map((player, index) => (
                    <div key={player.id} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/5 transition-colors group cursor-pointer border border-transparent hover:border-white/5">
                        <div className="relative">
                            <img src={player.image} alt={player.name} className="w-12 h-12 rounded-xl object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                            <div className="absolute -top-2 -left-2 w-6 h-6 bg-black border border-white/10 rounded-full flex items-center justify-center text-[10px] font-bold text-loven-yellow">
                                {index + 1}
                            </div>
                        </div>
                        <div className="flex-1">
                            <p className="font-bold text-white text-sm group-hover:text-loven-yellow transition-colors">{player.name}</p>
                            <p className="text-[10px] font-bold uppercase text-white/30 tracking-wider">#{player.number} • {player.position}</p>
                        </div>
                        <div className="text-right">
                            <span className="block text-xl font-black text-white">{player.tp}</span>
                            <span className="text-[9px] uppercase font-bold text-white/30">Poäng</span>
                        </div>
                    </div>
                ))}
            </div>
             <button className="mt-4 w-full py-3 rounded-xl border border-white/10 text-xs font-bold uppercase tracking-widest text-white/50 hover:bg-white/5 hover:text-white transition-colors">
                Se alla spelare
            </button>
        </div>

        {/* TABLE Widget (Span 5) */}
        <div className="lg:col-span-5 bg-[#0a0a0a] border border-white/10 rounded-3xl p-6">
             <h3 className="text-xl font-black text-white uppercase tracking-tight mb-6 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-loven-green rounded-full"></span>
                Tabellen
            </h3>
            <div className="space-y-1">
                <div className="flex text-[10px] font-bold text-white/30 uppercase tracking-wider px-3 mb-2">
                    <span className="w-8">#</span>
                    <span className="flex-1">Lag</span>
                    <span className="w-12 text-center">+/-</span>
                    <span className="w-12 text-center">P</span>
                    <span className="w-8"></span>
                </div>
                {leagueTable.slice(0, 5).map((team) => (
                    <div key={team.rank} className={`flex items-center py-3 px-3 rounded-xl border ${team.team.includes("Björklöven") ? "bg-loven-green/10 border-loven-green/30" : "border-transparent hover:bg-white/5"}`}>
                        <span className={`font-black w-8 ${team.rank === 1 ? 'text-loven-yellow' : 'text-white/50'}`}>{team.rank}</span>
                        <span className={`flex-1 text-sm font-bold ${team.team.includes("Björklöven") ? "text-white" : "text-white/70"}`}>{team.team}</span>
                        <span className="w-12 text-center text-xs font-mono text-white/50">{team.diff > 0 ? `+${team.diff}` : team.diff}</span>
                        <span className="w-12 text-center text-sm font-black text-white">{team.points}</span>
                        <span className="w-8 flex justify-end">
                             {team.trend === 'up' && <TrendingUp size={14} className="text-green-500" />}
                            {team.trend === 'down' && <TrendingDown size={14} className="text-red-500" />}
                            {team.trend === 'same' && <Minus size={14} className="text-gray-600" />}
                        </span>
                    </div>
                ))}
            </div>
        </div>

        {/* LATEST NEWS (Span 7) */}
        {latestNews && (
        <div className="lg:col-span-7 relative bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 overflow-hidden group cursor-pointer">
             <div className="absolute top-0 right-0 w-64 h-64 bg-loven-green/10 rounded-full blur-[80px] group-hover:bg-loven-green/20 transition-colors duration-700" />
             
             <div className="relative z-10 flex flex-col md:flex-row gap-6 h-full">
                <div className="flex-1 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                         <span className="px-2 py-1 rounded bg-loven-yellow text-black text-[10px] font-black uppercase tracking-widest">Nyhet</span>
                         <span className="text-white/40 text-xs font-bold">{latestNews.date}</span>
                    </div>
                    <h3 className="text-3xl font-black text-white leading-none mb-4 group-hover:text-loven-neonGreen transition-colors">
                        {latestNews.title}
                    </h3>
                    <p className="text-white/60 text-sm font-medium leading-relaxed line-clamp-3 mb-6">
                        {latestNews.summary}
                    </p>
                    <div className="flex items-center gap-2 text-white font-bold text-sm uppercase tracking-wider group-hover:gap-4 transition-all">
                        Läs artikeln <ArrowRight size={16} className="text-loven-yellow" />
                    </div>
                </div>
                <div className="w-full md:w-48 h-48 rounded-2xl overflow-hidden border border-white/10 rotate-3 group-hover:rotate-0 transition-transform duration-500 shadow-2xl">
                    <img src={latestNews.image} className="w-full h-full object-cover" />
                </div>
             </div>
        </div>
        )}

      </div>
    </div>
  );
};

export default Dashboard;