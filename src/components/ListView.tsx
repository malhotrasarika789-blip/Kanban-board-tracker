import React, { useState } from 'react';
import { useTaskStore } from '../store/useTaskStore';

export default function ListView() {
  const { tasks, updateTaskStatus } = useTaskStore();
  const [scrollTop, setScrollTop] = useState(0);
  
  const ROW_HEIGHT = 60;
  const VIEWPORT_H = 500;
  const BUFFER = 5;

  const startIndex = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - BUFFER);
  const endIndex = Math.min(tasks.length - 1, Math.floor((scrollTop + VIEWPORT_H) / ROW_HEIGHT) + BUFFER);
  const visibleTasks = tasks.slice(startIndex, endIndex + 1);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
      <div className="grid grid-cols-4 p-4 bg-slate-800/50 border-b border-slate-700 text-xs font-bold text-slate-400 uppercase tracking-widest">
        <div>Title</div>
        <div>Priority</div>
        <div>Status (Inline)</div>
        <div>Assignee</div>
      </div>
      <div 
        onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
        className="overflow-auto relative" 
        style={{ height: VIEWPORT_H }}
      >
        <div style={{ height: tasks.length * ROW_HEIGHT }}>
          <div style={{ transform: `translateY(${startIndex * ROW_HEIGHT}px)`, position: 'absolute', width: '100%' }}>
            {visibleTasks.map((task) => (
              <div key={task.id} className="grid grid-cols-4 px-4 items-center border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors" style={{ height: ROW_HEIGHT }}>
                <div className="text-sm font-medium text-slate-200 truncate pr-4">{task.title}</div>
                <div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${task.priority === 'Critical' ? 'bg-red-500/20 text-red-400' : 'bg-slate-700 text-slate-300'}`}>
                    {task.priority}
                  </span>
                </div>
                <div>
                  <select 
                    value={task.status}
                    onChange={(e) => updateTaskStatus(task.id, e.target.value as any)}
                    className="bg-slate-800 border border-slate-700 text-xs text-blue-400 p-1 rounded outline-none"
                  >
                    <option>To Do</option>
                    <option>In Progress</option>
                    <option>In Review</option>
                    <option>Done</option>
                  </select>
                </div>
                <div className="text-sm text-slate-400">{task.assignee}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}