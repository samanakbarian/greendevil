import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { NewsArticle } from '../types';
import { X, Clock, Share2, Loader, ArrowUpRight } from 'lucide-react';

const News: React.FC = () => {
  const { news, loading } = useData();
  const [activeFilter, setActiveFilter] = useState<string>('Alla');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  const filters = ['Alla', 'Herr', 'Dam', 'J20', 'Klubb'];

  const filteredNews = activeFilter === 'Alla' 
    ? news 
    : news.filter(n => n.category === activeFilter);
  
  const featuredArticle = filteredNews[0];
  const remainingNews = filteredNews.slice(1);

  return (
    <div className="animate-fade-in pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
            <h2 className="text-5xl font-black text-white tracking-tighter mb-2">NYHETER</h2>
            <div className="h-1 w-20 bg-loven-yellow"></div>
        </div>
        
        {/* Modern Filter Pills */}
        <div className="flex flex-wrap gap-1 bg-white/5 p-1.5 rounded-full border border-white/10 backdrop-blur-md">
            {filters.map(filter => (
                <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                        activeFilter === filter 
                        ? 'bg-loven-green text-white shadow-[0_0_15px_rgba(0,90,49,0.5)]' 
                        : 'text-white/40 hover:text-white hover:bg-white/5'
                    }`}
                >
                    {filter}
                </button>
            ))}
        </div>
      </div>

      {loading && <div className="text-center py-20 text-white/50 animate-pulse">Laddar nyheter...</div>}

      {!loading && filteredNews.length > 0 && (
          <div className="space-y-8">
            {/* Featured Article - Magazine Style */}
            {featuredArticle && (
                <div 
                    onClick={() => setSelectedArticle(featuredArticle)}
                    className="relative w-full h-[500px] rounded-3xl overflow-hidden group cursor-pointer border border-white/10 shadow-2xl transition-all duration-500 hover:border-loven-green/50 hover:shadow-[0_0_50px_rgba(0,90,49,0.2)]"
                >
                    <img 
                        src={featuredArticle.image} 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    
                    <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full md:w-2/3">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-loven-yellow text-black text-[10px] font-black uppercase tracking-widest mb-4 shadow-lg group-hover:scale-105 transition-transform origin-left">
                            {featuredArticle.category}
                        </div>
                        <h3 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4 group-hover:text-loven-neonGreen transition-colors drop-shadow-md">
                            {featuredArticle.title}
                        </h3>
                        <p className="text-white/80 text-lg line-clamp-2 mb-6 font-medium group-hover:text-white transition-colors">
                            {featuredArticle.summary}
                        </p>
                         <div className="flex items-center gap-2 text-white/50 text-xs font-bold uppercase tracking-widest">
                             <Clock size={12} /> {featuredArticle.date}
                        </div>
                    </div>
                </div>
            )}

            {/* Grid Layout for rest */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {remainingNews.map((article) => (
                    <div 
                        key={article.id}
                        onClick={() => setSelectedArticle(article)} 
                        className="group bg-[#0a0a0a] border border-white/5 rounded-3xl overflow-hidden transition-all duration-500 cursor-pointer flex flex-col hover:-translate-y-2 hover:border-loven-green/50 hover:shadow-[0_20px_40px_-15px_rgba(0,90,49,0.3)]"
                    >
                        <div className="relative h-56 overflow-hidden">
                            <img 
                                src={article.image} 
                                alt={article.title} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" 
                            />
                            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md w-10 h-10 flex items-center justify-center rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 hover:bg-loven-yellow hover:text-black">
                                <ArrowUpRight size={20} className="group-hover:text-current" />
                            </div>
                        </div>
                        <div className="p-6 flex-1 flex flex-col group-hover:bg-white/[0.02] transition-colors duration-500">
                            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-white/30 mb-3 group-hover:text-white/50 transition-colors">
                                <span className="text-loven-green">{article.category}</span>
                                <span>{article.date}</span>
                            </div>
                            <h3 className="text-xl font-black text-white mb-3 line-clamp-2 group-hover:text-loven-yellow transition-colors duration-300">
                                {article.title}
                            </h3>
                            <p className="text-white/50 text-sm leading-relaxed line-clamp-3 flex-1 group-hover:text-white/70 transition-colors">
                                {article.summary}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
          </div>
      )}

      {/* Article Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => setSelectedArticle(null)} />
            <div className="relative bg-[#0a0a0a] w-full max-w-4xl max-h-[95vh] overflow-y-auto rounded-3xl border border-white/10 shadow-2xl animate-scale-in">
                
                <button 
                    onClick={() => setSelectedArticle(null)}
                    className="fixed top-6 right-6 z-50 p-3 bg-black/50 hover:bg-white text-white hover:text-black rounded-full transition-colors backdrop-blur-md border border-white/10"
                >
                    <X size={24} />
                </button>

                <div className="relative h-[400px] w-full">
                    <img src={selectedArticle.image} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-[#0a0a0a]" />
                    <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                        <span className="inline-block px-3 py-1 bg-loven-green text-white text-[10px] font-black uppercase tracking-widest rounded mb-4">
                            {selectedArticle.category} • {selectedArticle.type}
                        </span>
                        <h2 className="text-4xl md:text-6xl font-black text-white leading-[0.9]">
                            {selectedArticle.title}
                        </h2>
                    </div>
                </div>

                <div className="p-8 md:p-12 flex flex-col md:flex-row gap-12">
                     <div className="md:w-[200px] shrink-0 space-y-6">
                         <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-neutral-900 flex items-center justify-center font-black text-loven-green border border-white/10">
                                IFB
                            </div>
                            <div>
                                <p className="text-sm font-bold text-white uppercase tracking-wider">Redaktionen</p>
                                <p className="text-xs text-white/40 font-mono">{selectedArticle.date}</p>
                            </div>
                         </div>
                         <div className="h-px w-full bg-white/10" />
                         <button className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white/60 hover:text-loven-yellow transition-colors">
                            <Share2 size={16} /> Dela artikel
                         </button>
                    </div>

                    <div className="flex-1">
                        <p className="text-2xl text-white font-medium leading-relaxed mb-8 text-white/90">
                            {selectedArticle.summary}
                        </p>
                        
                        <div className="prose prose-invert prose-lg max-w-none text-white/60">
                            <p>{selectedArticle.content}</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default News;