import React, { useState } from 'react';
import TaskCard from './TaskCard';
import { useTaskStore } from '../store/useTaskStore';
import { Status } from '../types';

interface Props {
  title: string;
  status: Status;
}

export default function KanbanColumn({ title, status }: Props) {
  const { tasks, updateTaskStatus } = useTaskStore();
  const [isOver, setIsOver] = useState(false); // Visual indicator for drop zone

  const columnTasks = tasks.filter((t) => t.status === status);

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // Zaroori hai drop allow karne ke liye
    setIsOver(true);
  };

  const onDragLeave = () => setIsOver(false);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(false);
    const taskId = e.dataTransfer.getData('taskId');
    if (taskId) {
      updateTaskStatus(taskId, status);
    }
  };

  return (
    <div 
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={`flex flex-col w-80 min-h-[500px] rounded-2xl p-4 transition-all duration-200 ${
        isOver ? 'bg-blue-600/10 border-2 border-dashed border-blue-500/50' : 'bg-slate-900/50 border border-slate-800'
      }`}
    >
      <div className="flex justify-between items-center mb-6 px-2">
        <h2 className="font-bold text-slate-200 uppercase tracking-wider text-sm">{title}</h2>
        <span className="bg-slate-800 text-slate-400 text-xs px-2 py-1 rounded-md font-bold">
          {columnTasks.length}
        </span>
      </div>

      <div className="flex-1 space-y-3">
        {columnTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
        
        {/* Requirement #2: Placeholder logic */}
        {isOver && (
          <div className="h-24 bg-slate-800/30 border border-dashed border-slate-700 rounded-xl animate-pulse" />
        )}

        {/* Empty State (Requirement #6) */}
        {columnTasks.length === 0 && !isOver && (
          <div className="h-full flex flex-col items-center justify-center opacity-30 py-20 text-center">
            <div className="text-4xl mb-2">📥</div>
            <p className="text-xs font-medium">No tasks here</p>
          </div>
        )}
      </div>
    </div>
  );
}