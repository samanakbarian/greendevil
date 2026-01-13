import React, { useState, useEffect } from 'react';
import { useData } from '../contexts/DataContext';
import { Player } from '../types';
import { ResponsiveContainer, LineChart, Line, Legend, Tooltip as RechartsTooltip, XAxis, YAxis, CartesianGrid } from 'recharts';
import { ArrowUpRight, Scale, Shield, Loader, Activity } from 'lucide-react';

const Stats: React.FC = () => {
  const { players, loading } = useData();
  const [sortConfig, setSortConfig] = useState<{ key: keyof Player; direction: 'asc' | 'desc' } | null>({ key: 'tp', direction: 'desc' });
  const [compPlayer1Id, setCompPlayer1Id] = useState<number | null>(null);
  const [compPlayer2Id, setCompPlayer2Id] = useState<number | null>(null);

  useEffect(() => {
    if (players && players.length >= 2) {
        if (compPlayer1Id === null) setCompPlayer1Id(players[0].id);
        if (compPlayer2Id === null) setCompPlayer2Id(players[1].id);
    }
  }, [players]);

  // Safety check if players data is missing
  if (!players || players.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] animate-fade-in">
             <div className="text-white/40 font-medium mb-4">Ingen spelardata tillgänglig.</div>
             {loading && <Loader className="animate-spin text-loven-yellow" />}
        </div>
      );
  }

  const sortedPlayers = [...players].sort((a, b) => {
    if (!sortConfig) return 0;
    const aVal = a[sortConfig.key];
    const bVal = b[sortConfig.key];
    if (typeof aVal === 'string' || typeof bVal === 'string') return 0; 
    if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const requestSort = (key: keyof Player) => {
    let direction: 'asc' | 'desc' = 'desc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = 'asc';
    }
    setSortConfig({ key, direction });
  };

  const p1 = players.find(p => p.id === compPlayer1Id) || players[0];
  const p2 = players.find(p => p.id === compPlayer2Id) || players[1] || players[0];

  const formData = [
    { match: 'M1', points: 0, corsi: 45 },
    { match: 'M2', points: 3, corsi: 52 },
    { match: 'M3', points: 1, corsi: 48 },
    { match: 'M4', points: 3, corsi: 60 },
    { match: 'M5', points: 3, corsi: 55 },
    { match: 'M6', points: 0, corsi: 42 },
    { match: 'M7', points: 2, corsi: 58 },
    { match: 'M8', points: 3, corsi: 62 },
    { match: 'M9', points: 1, corsi: 50 },
    { match: 'M10', points: 3, corsi: 56 },
  ];

  if (!p1 || !p2) return <div className="p-20 text-center"><Loader className="animate-spin inline mr-2 text-loven-yellow" /> <span className="text-white/50 font-bold uppercase tracking-widest">Laddar spelare...</span></div>;

  return (
    <div className="space-y-8 animate-fade-in pb-12">
       <div>
            <h2 className="text-5xl font-black text-white tracking-tighter mb-2">STATISTIK</h2>
            <p className="text-white/40 font-medium">Djupdykning i siffrorna.</p>
       </div>

      {/* Analytics Chart Section */}
      <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
            <Activity size={100} className="text-white" />
        </div>
        <h3 className="text-xl font-black text-white uppercase tracking-tight mb-8 flex items-center gap-3">
            <span className="p-2 bg-white/5 rounded-lg text-loven-yellow"><ArrowUpRight size={20} /></span>
            Trendanalys
        </h3>
        <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={formData}>
                    <defs>
                        <linearGradient id="colorPoints" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#FFD200" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#FFD200" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                    <XAxis dataKey="match" stroke="#444" tick={{fill: '#666', fontSize: 10, fontWeight: 'bold'}} axisLine={false} tickLine={false} dy={10} />
                    <YAxis yAxisId="left" stroke="#444" tick={{fill: '#666', fontSize: 10}} axisLine={false} tickLine={false} />
                    <YAxis yAxisId="right" orientation="right" stroke="#444" tick={{fill: '#666', fontSize: 10}} axisLine={false} tickLine={false} />
                    <RechartsTooltip 
                        contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
                        itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase' }}
                        labelStyle={{ color: '#666', marginBottom: '8px', fontSize: '10px' }}
                    />
                    <Legend iconType="circle" />
                    <Line yAxisId="left" type="monotone" dataKey="points" name="Lagpoäng" stroke="#FFD200" strokeWidth={4} dot={{ r: 6, fill: '#000', stroke: '#FFD200', strokeWidth: 2 }} activeDot={{ r: 8, fill: '#FFD200' }} />
                    <Line yAxisId="right" type="monotone" dataKey="corsi" name="Corsi %" stroke="#005A31" strokeWidth={4} dot={false} strokeOpacity={0.5} />
                </LineChart>
            </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Roster Table */}
        <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 overflow-hidden">
             <h3 className="text-xl font-black text-white uppercase tracking-tight mb-6 flex items-center gap-3">
                <span className="p-2 bg-white/5 rounded-lg text-loven-green"><Shield size={20} /></span>
                Spelartrupp
            </h3>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-white/30 text-[10px] font-bold uppercase tracking-widest border-b border-white/5">
                            <th className="p-4 pl-0">Spelare</th>
                            <th className="p-4 text-right cursor-pointer hover:text-loven-yellow transition-colors" onClick={() => requestSort('gp')}>GP</th>
                            <th className="p-4 text-right cursor-pointer hover:text-loven-yellow transition-colors" onClick={() => requestSort('g')}>M</th>
                            <th className="p-4 text-right cursor-pointer hover:text-loven-yellow transition-colors" onClick={() => requestSort('a')}>A</th>
                            <th className="p-4 text-right cursor-pointer text-loven-yellow" onClick={() => requestSort('tp')}>P</th>
                            <th className="p-4 text-right cursor-pointer hover:text-loven-yellow transition-colors" onClick={() => requestSort('plusMinus')}>+/-</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {sortedPlayers.map((player, idx) => (
                            <tr key={player.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                                <td className="p-4 pl-0 font-bold text-white flex items-center gap-4">
                                    <span className="font-mono text-white/20 text-xs w-6 text-right">#{player.number}</span>
                                    {player.name}
                                </td>
                                <td className="p-4 text-right text-white/50 font-mono">{player.gp}</td>
                                <td className="p-4 text-right text-white/70 font-bold">{player.g}</td>
                                <td className="p-4 text-right text-white/70 font-bold">{player.a}</td>
                                <td className="p-4 text-right font-black text-loven-yellow text-lg">{player.tp}</td>
                                <td className={`p-4 text-right font-bold ${player.plusMinus > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                    {player.plusMinus > 0 ? `+${player.plusMinus}` : player.plusMinus}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        {/* Comparison Tool - Trading Card Style */}
        <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 flex flex-col">
            <div className="flex justify-between items-center mb-8">
                 <h3 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                    <span className="p-2 bg-white/5 rounded-lg text-blue-500"><Scale size={20} /></span>
                    Head-to-Head
                </h3>
            </div>

            {/* Selectors */}
            <div className="flex gap-4 mb-8">
                <select 
                    className="flex-1 bg-black text-white text-xs font-bold uppercase tracking-wider p-3 rounded-xl border border-white/10 focus:border-loven-green outline-none appearance-none"
                    value={compPlayer1Id || ''}
                    onChange={(e) => setCompPlayer1Id(Number(e.target.value))}
                >
                    {players.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
                <div className="flex items-center justify-center text-white/20 font-black italic">VS</div>
                <select 
                    className="flex-1 bg-black text-white text-xs font-bold uppercase tracking-wider p-3 rounded-xl border border-white/10 focus:border-loven-green outline-none appearance-none"
                    value={compPlayer2Id || ''}
                    onChange={(e) => setCompPlayer2Id(Number(e.target.value))}
                >
                     {players.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
            </div>

            {/* Cards Display */}
            <div className="flex-1 flex gap-4 relative">
                 {/* Card 1 */}
                 <div className="flex-1 rounded-2xl bg-gradient-to-b from-neutral-900 to-black border border-white/5 relative overflow-hidden group hover:border-loven-green/50 transition-colors">
                    <div className="absolute top-0 w-full h-32 bg-gradient-to-b from-loven-green/20 to-transparent" />
                    <div className="relative z-10 p-4 text-center">
                        <div className="w-20 h-20 mx-auto rounded-full p-1 bg-gradient-to-br from-loven-green to-black mb-3">
                            <img src={p1.image} className="w-full h-full rounded-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                        </div>
                        <h4 className="font-black text-white uppercase leading-tight mb-1">{p1.name}</h4>
                        <p className="text-xs font-bold text-white/40">#{p1.number} • {p1.position}</p>
                        
                        <div className="mt-6 space-y-2">
                             <div className="flex justify-between items-center p-2 bg-white/5 rounded">
                                <span className="text-[10px] font-bold uppercase text-white/40">Poäng</span>
                                <span className="font-black text-white">{p1.tp}</span>
                             </div>
                             <div className="flex justify-between items-center p-2 bg-white/5 rounded">
                                <span className="text-[10px] font-bold uppercase text-white/40">Mål</span>
                                <span className="font-black text-white">{p1.g}</span>
                             </div>
                             <div className="flex justify-between items-center p-2 bg-white/5 rounded">
                                <span className="text-[10px] font-bold uppercase text-white/40">Corsi</span>
                                <span className="font-black text-blue-400">{p1.corsi}%</span>
                             </div>
                        </div>
                    </div>
                 </div>

                 {/* Card 2 */}
                 <div className="flex-1 rounded-2xl bg-gradient-to-b from-neutral-900 to-black border border-white/5 relative overflow-hidden group hover:border-loven-yellow/50 transition-colors">
                    <div className="absolute top-0 w-full h-32 bg-gradient-to-b from-loven-yellow/20 to-transparent" />
                    <div className="relative z-10 p-4 text-center">
                        <div className="w-20 h-20 mx-auto rounded-full p-1 bg-gradient-to-br from-loven-yellow to-black mb-3">
                            <img src={p2.image} className="w-full h-full rounded-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                        </div>
                        <h4 className="font-black text-white uppercase leading-tight mb-1">{p2.name}</h4>
                        <p className="text-xs font-bold text-white/40">#{p2.number} • {p2.position}</p>
                        
                         <div className="mt-6 space-y-2">
                             <div className="flex justify-between items-center p-2 bg-white/5 rounded">
                                <span className="text-[10px] font-bold uppercase text-white/40">Poäng</span>
                                <span className={`font-black ${p2.tp > p1.tp ? 'text-green-500' : 'text-white'}`}>{p2.tp}</span>
                             </div>
                             <div className="flex justify-between items-center p-2 bg-white/5 rounded">
                                <span className="text-[10px] font-bold uppercase text-white/40">Mål</span>
                                <span className={`font-black ${p2.g > p1.g ? 'text-green-500' : 'text-white'}`}>{p2.g}</span>
                             </div>
                             <div className="flex justify-between items-center p-2 bg-white/5 rounded">
                                <span className="text-[10px] font-bold uppercase text-white/40">Corsi</span>
                                <span className={`font-black ${p2.corsi > p1.corsi ? 'text-green-500' : 'text-blue-400'}`}>{p2.corsi}%</span>
                             </div>
                        </div>
                    </div>
                 </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;