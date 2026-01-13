import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Dashboard from './views/Dashboard';
import News from './views/News';
import Stats from './views/Stats';
import About from './views/About';
import { ViewState } from './types';
import { DataProvider } from './contexts/DataContext';

const AppContent: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.DASHBOARD);

  const renderView = () => {
    switch (currentView) {
      case ViewState.DASHBOARD:
        return <Dashboard />;
      case ViewState.NEWS:
        return <News />;
      case ViewState.STATS:
        return <Stats />;
      case ViewState.ABOUT:
        return <About />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen font-sans text-white bg-[#030303] selection:bg-loven-yellow selection:text-black overflow-x-hidden">
      {/* Cinematic Background */}
      <div className="fixed inset-0 z-0">
         {/* Deep Green Base */}
         <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f0d] to-[#000000]" />
         
         {/* Spotlights */}
         <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-loven-green/20 rounded-full blur-[150px] animate-pulse-slow" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-loven-yellow/5 rounded-full blur-[120px]" />
         
         {/* Grid Pattern */}
         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      {/* Noise Texture Overlay */}
      <div className="bg-noise" />

      <Navigation currentView={currentView} setView={setCurrentView} />

      {/* Main Content Area */}
      <main className="relative z-10 md:ml-[280px] min-h-screen transition-all duration-500">
        <div className="max-w-[1400px] mx-auto px-4 py-24 md:px-8 md:py-12">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  );
};

export default App;