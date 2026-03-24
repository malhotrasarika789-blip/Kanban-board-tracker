import React from 'react';
import { Task, useTaskStore } from '../store/useTaskStore';

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const setSelectedTask = useTaskStore((state) => state.setSelectedTask);
  const onDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('taskId', task.id);
    e.dataTransfer.effectAllowed = 'move';
    const target = e.currentTarget as HTMLElement;
    setTimeout(() => {
      target.style.opacity = '0.4';
    }, 0);
  };

  const onDragEnd = (e: React.DragEvent) => {
    const target = e.currentTarget as HTMLElement;
    target.style.opacity = '1';
  };
  const isBeingViewed = parseInt(task.id.split('-')[1]) % 8 === 0;

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("Opening Modal for:", task.id);
        setSelectedTask(task);
      }}
      className="relative z-30 group bg-[#161b2a] p-4 rounded-xl border border-slate-700/50 cursor-pointer hover:border-blue-500/50 transition-all shadow-lg select-none active:scale-95"
    >
      {isBeingViewed && (
        <div className="absolute -top-1 -right-1 z-40">
          <div className="w-5 h-5 rounded-full bg-pink-500 border-2 border-[#0b0f1a] flex items-center justify-center text-[8px] font-black text-white animate-bounce shadow-xl">
            AK
          </div>
          <div className="absolute top-0 w-5 h-5 rounded-full bg-pink-500 animate-ping opacity-20"></div>
        </div>
      )}

      <div className="mb-3">
        <span className={`text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider ${
          task.priority === 'Critical' ? 'bg-red-500/20 text-red-400 border border-red-500/20' : 
          'bg-slate-700/50 text-slate-400'
        }`}>
          {task.priority}
        </span>
      </div>

      <h3 className="text-sm font-bold text-slate-200 group-hover:text-blue-400 transition-colors leading-snug mb-4 pointer-events-none">
        {task.title}
      </h3>

      <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-700/30 pointer-events-none">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-bold text-slate-500">
            📅 {new Date(task.dueDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
          </span>
        </div>

        <div className="w-6 h-6 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center">
          <span className="text-[9px] font-black text-slate-300">
            {task.assignee.substring(0, 1).toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );
}