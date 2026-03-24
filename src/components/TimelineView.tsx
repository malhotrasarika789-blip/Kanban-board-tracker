import React from 'react';
import { useTaskStore } from '../store/useTaskStore';

export default function TimelineView() {
  const { tasks } = useTaskStore();
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const dayWidth = 100;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col h-[500px]">
      <div className="overflow-x-auto border-b border-slate-800 bg-slate-800/30">
        <div className="flex" style={{ width: 30 * dayWidth }}>
          {days.map(d => (
            <div key={d} className="flex-shrink-0 w-[100px] py-3 text-center text-[10px] font-bold text-slate-500 border-r border-slate-800">
              {d} Mar
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-auto relative">
        <div className="relative" style={{ width: 30 * dayWidth, minHeight: '100%' }}>
         
          <div className="absolute top-0 bottom-0 border-l-2 border-dashed border-blue-500/40 z-10" style={{ left: 24 * dayWidth }} />
          
          <div className="py-4 space-y-3">
            {tasks.slice(0, 30).map((task, i) => (
              <div key={task.id} className="relative h-6">
                <div 
                  className="absolute h-full rounded bg-blue-600/20 border border-blue-500/30 text-[9px] flex items-center px-2 truncate font-bold text-blue-300"
                  style={{ left: (i % 20) * dayWidth, width: 200 }}
                >
                  {task.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}