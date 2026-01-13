import React from 'react';
import { Info, Heart, Code, Shield, Cpu, Bot, BrainCircuit, Network } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="space-y-12 animate-fade-in max-w-5xl mx-auto pb-20">
       {/* Header */}
       <div className="text-center mb-16">
          <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-4 opacity-10">IFB HUB</h2>
          <div className="relative -mt-12 md:-mt-16">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">OM FAN-HUB</h2>
            <p className="text-loven-yellow font-bold uppercase tracking-widest text-sm">Passion • Data • Gemenskap</p>
          </div>
       </div>

       {/* Grid */}
       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission Card */}
          <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-10 hover:border-loven-green/50 transition-all duration-500 group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform duration-700">
                  <Shield size={120} />
              </div>
              <div className="w-14 h-14 rounded-2xl bg-loven-green/20 flex items-center justify-center text-loven-green mb-8 border border-loven-green/20">
                 <Shield size={28} />
              </div>
              <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">Vår Mission</h3>
              <p className="text-white/60 leading-relaxed font-medium">
                  Att skapa den ultimata digitala plattformen för Björklövens supportrar. En plats där passion möter teknologi, och där varje supporter får tillgång till djupgående statistik och de senaste nyheterna i realtid.
              </p>
          </div>

          {/* Purpose Card */}
          <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-10 hover:border-loven-yellow/50 transition-all duration-500 group relative overflow-hidden">
               <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform duration-700">
                  <Heart size={120} />
              </div>
              <div className="w-14 h-14 rounded-2xl bg-loven-yellow/20 flex items-center justify-center text-loven-yellow mb-8 border border-loven-yellow/20">
                 <Heart size={28} />
              </div>
              <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">Syftet</h3>
              <p className="text-white/60 leading-relaxed font-medium">
                  Vi bygger denna tjänst för att hylla Umeås stolthet. Genom att samla data från olika källor och presentera det i ett modernt gränssnitt vill vi förhöja upplevelsen av att följa Björklöven.
              </p>
          </div>

          {/* Team / Architecture Card */}
          <div className="md:col-span-2 bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
                 <Network size={400} />
              </div>
              
              <div className="relative z-10">
                  <h3 className="text-3xl font-black text-white mb-10 uppercase tracking-tight text-center">Teamet & Arkitekturen</h3>

                  <div className="flex flex-col md:flex-row gap-8 items-stretch">
                      
                      {/* The Human */}
                      <div className="flex-1 bg-gradient-to-b from-white/5 to-transparent border border-white/5 rounded-2xl p-8 flex flex-col items-center text-center hover:border-loven-yellow/30 transition-colors duration-500 group">
                          <div className="w-24 h-24 rounded-full bg-black border-2 border-loven-yellow p-1 mb-6 shadow-[0_0_20px_rgba(255,210,0,0.2)] group-hover:scale-105 transition-transform">
                              <div className="w-full h-full rounded-full bg-neutral-900 flex items-center justify-center overflow-hidden">
                                 <span className="font-black text-2xl text-white">SA</span>
                              </div>
                          </div>
                          <h4 className="font-black text-xl text-white mb-1">Saman Akbarian</h4>
                          <span className="inline-block px-3 py-1 bg-loven-yellow/10 border border-loven-yellow/20 rounded text-loven-yellow text-[10px] font-black uppercase tracking-widest mb-4">
                            Agent Manager & Lead Dev
                          </span>
                          <p className="text-white/50 text-sm font-medium leading-relaxed">
                              Arkitekten bakom systemet. Ansvarig för vision, strategisk styrning och orkestrering av de AI-drivna processerna.
                          </p>
                      </div>

                      {/* Connection Visual (Desktop) */}
                      <div className="hidden md:flex flex-col items-center justify-center">
                          <div className="w-16 h-[2px] bg-gradient-to-r from-loven-yellow/50 to-loven-green/50"></div>
                      </div>

                      {/* The Agents */}
                      <div className="flex-1 bg-gradient-to-b from-white/5 to-transparent border border-white/5 rounded-2xl p-8 flex flex-col items-center text-center hover:border-loven-green/30 transition-colors duration-500 group">
                          <div className="flex items-center gap-3 mb-6">
                              <div className="w-10 h-10 rounded-full bg-loven-green/20 flex items-center justify-center text-loven-green border border-loven-green/20 animate-pulse">
                                  <BrainCircuit size={18} />
                              </div>
                              <div className="w-12 h-12 rounded-full bg-loven-neonGreen/10 flex items-center justify-center text-loven-neonGreen border border-loven-neonGreen/20 shadow-[0_0_15px_rgba(0,255,136,0.3)] group-hover:scale-110 transition-transform">
                                  <Cpu size={24} />
                              </div>
                              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 border border-blue-500/20 animate-pulse" style={{animationDelay: '0.5s'}}>
                                  <Bot size={18} />
                              </div>
                          </div>
                          <h4 className="font-black text-xl text-white mb-1">AI-Agenter</h4>
                          <span className="inline-block px-3 py-1 bg-loven-green/10 border border-loven-green/20 rounded text-loven-green text-[10px] font-black uppercase tracking-widest mb-4">
                            Code • Data • Design
                          </span>
                          <p className="text-white/50 text-sm font-medium leading-relaxed">
                              Ett kluster av specialiserade AI-modeller som arbetar under Samans ledning för att generera kod, analysera matchdata och optimera användarupplevelsen i realtid.
                          </p>
                      </div>

                  </div>
              </div>
          </div>
       </div>
    </div>
  );
};

export default About;