import React from 'react';
import { ViewState } from '../types';
import { Home, Newspaper, BarChart2, Menu, X, Info, ChevronRight } from 'lucide-react';

interface NavigationProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setView }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { view: ViewState.DASHBOARD, label: "Dashboard", icon: <Home size={22} /> },
    { view: ViewState.NEWS, label: "Nyheter", icon: <Newspaper size={22} /> },
    { view: ViewState.STATS, label: "Statistik", icon: <BarChart2 size={22} /> },
    { view: ViewState.ABOUT, label: "Om Fan-Hub", icon: <Info size={22} /> },
  ];

  return (
    <>
      {/* Mobile Header - Glass */}
      <div className="md:hidden fixed top-0 w-full z-50 bg-black/50 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-loven-green to-black flex items-center justify-center border border-white/10 shadow-[0_0_15px_rgba(0,90,49,0.5)]">
                <span className="font-black text-white text-xs tracking-tighter">IFB</span>
            </div>
            <span className="font-black tracking-tighter text-lg text-white">FAN<span className="text-loven-yellow">HUB</span></span>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-loven-yellow transition-colors">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 md:hidden flex flex-col justify-center items-center space-y-8 animate-fade-in backdrop-blur-3xl">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                setView(item.view);
                setIsOpen(false);
              }}
              className={`text-3xl font-black tracking-tight flex items-center gap-4 ${
                currentView === item.view ? 'text-loven-yellow scale-110' : 'text-white/40'
              } transition-all duration-300`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      )}

      {/* Desktop Sidebar - Floating Dock Style */}
      <div className="hidden md:flex fixed left-6 top-6 bottom-6 w-[260px] bg-[#0a0a0a]/60 backdrop-blur-2xl border border-white/5 rounded-3xl flex-col py-8 z-30 shadow-2xl">
        {/* Logo */}
        <div className="flex px-8 mb-14 items-center gap-4 group cursor-default">
             <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-loven-green to-black flex items-center justify-center border border-white/10 group-hover:shadow-[0_0_20px_rgba(0,90,49,0.8)] transition-all duration-500">
                <span className="font-black text-white text-sm tracking-tighter">IFB</span>
            </div>
            <div className="flex flex-col">
                <span className="font-black text-2xl tracking-tighter text-white leading-none">FAN<span className="text-loven-yellow">HUB</span></span>
                <span className="text-[10px] font-bold tracking-widest text-white/40 uppercase">Supporterzon</span>
            </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col gap-2 px-4">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setView(item.view)}
              className={`relative flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group overflow-hidden ${
                currentView === item.view
                  ? 'bg-white/5 text-white shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]'
                  : 'text-neutral-500 hover:text-white hover:bg-white/5'
              }`}
            >
              {currentView === item.view && (
                 <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-loven-yellow rounded-r-full shadow-[0_0_10px_#FFD200]" />
              )}
              <div className={`${currentView === item.view ? 'text-loven-yellow' : 'text-current group-hover:text-loven-yellow transition-colors'} relative z-10`}>
                {item.icon}
              </div>
              <span className={`font-bold tracking-tight relative z-10 ${currentView === item.view ? 'text-white' : ''}`}>{item.label}</span>
              
              {currentView === item.view && <ChevronRight className="ml-auto text-white/20" size={16} />}
            </button>
          ))}
        </nav>

        {/* Mini Match Center Widget */}
        <div className="px-4 mt-auto">
            <div className="relative p-5 rounded-2xl bg-gradient-to-br from-loven-green/20 to-black border border-loven-green/30 overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-20 text-loven-green group-hover:scale-110 transition-transform">
                    <div className="w-20 h-20 rounded-full border-2 border-current" />
                </div>
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        <p className="text-[10px] text-red-400 font-black uppercase tracking-widest">Nästa Match</p>
                    </div>
                    <div className="flex justify-between items-end">
                        <div>
                            <p className="text-white font-black text-lg leading-none mb-1">DIF</p>
                            <p className="text-white/40 text-xs font-medium">Borta</p>
                        </div>
                        <span className="text-loven-yellow font-black text-xl italic">VS</span>
                        <div className="text-right">
                            <p className="text-white font-black text-lg leading-none mb-1">IFB</p>
                            <p className="text-white/40 text-xs font-medium">19:00</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;