import { useTaskStore } from '../store/useTaskStore';
import KanbanColumn from './KanbanColumn';
import { Status } from '../types';

const COLUMNS: Status[] = ['To Do', 'In Progress', 'In Review', 'Done'];

export default function KanbanView() {
  const tasks = useTaskStore((state) => state.tasks) || [];

  return (
    <div className="flex gap-6 h-full overflow-x-auto pb-4 px-2">
      {COLUMNS.map((colStatus) => (
        <KanbanColumn 
          key={colStatus} 
          status={colStatus} 
          tasks={tasks.filter(t => t.status === colStatus)} 
        />
      ))}
    </div>
  );
}