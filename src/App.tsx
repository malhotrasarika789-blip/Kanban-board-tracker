import React, { useState, useEffect } from 'react';
import KanbanView from './components/KanbanView';
import ListView from './components/ListView';
import TimelineView from './components/TimelineView';
import { useTaskStore } from './store/useTaskStore';

function App() {
  const [view, setView] = useState<'kanban' | 'list' | 'timeline'>(() => {
    return (new URLSearchParams(window.location.search).get('view') as any) || 'kanban';
  });

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('view', view);
    window.history.pushState({}, '', url);
  }, [view]);

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white p-8">
      <header className="max-w-7xl mx-auto flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black tracking-tighter bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">PROJECT.TRACKER</h1>
          <p className="text-slate-500 text-xs font-bold uppercase mt-1">Live Collaboration Active • 500+ Tasks</p>
        </div>
        <div className="flex -space-x-2">
          {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-[10px] font-bold">U{i}</div>)}
          <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-blue-600 flex items-center justify-center text-[10px] font-bold">+1</div>
        </div>
      </header>

      <nav className="max-w-7xl mx-auto mb-8 flex gap-2">
        {['kanban', 'list', 'timeline'].map((v: any) => (
          <button 
            key={v} 
            onClick={() => setView(v)}
            className={`px-6 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${view === v ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'bg-slate-900 text-slate-500 hover:bg-slate-800'}`}
          >
            {v}
          </button>
        ))}
      </nav>

      <main className="max-w-7xl mx-auto">
        {view === 'kanban' && <KanbanView />}
        {view === 'list' && <ListView />}
        {view === 'timeline' && <TimelineView />}
      </main>
    </div>
  );
}

export default App;