import { create } from 'zustand';

export type Status = 'To Do' | 'In Progress' | 'In Review' | 'Done';
export type Priority = 'Low' | 'Medium' | 'High' | 'Critical';

export interface Task {
  id: string;
  title: string;
  status: Status;
  priority: Priority;
  assignee: string;
  dueDate: string;
  startDate?: string;
}

const generateTasks = (count: number): Task[] => {
  const users = ['Sarika', 'Amit', 'Priya', 'John', 'Lisa', 'Rahul'];
  const priorities: Priority[] = ['Low', 'Medium', 'High', 'Critical'];
  const statuses: Status[] = ['To Do', 'In Progress', 'In Review', 'Done'];
  
  return Array.from({ length: count }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + (Math.random() * 20 - 10)); // Mix of overdue and future
    return {
      id: `task-${i}`,
      title: `Feature Implementation ${i + 1}`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      assignee: users[Math.floor(Math.random() * users.length)],
      dueDate: date.toISOString(),
      startDate: new Date().toISOString(),
    };
  });
};

interface TaskState {
  tasks: Task[];
  selectedTask: Task | null;
  setSelectedTask: (task: Task | null) => void;
  updateTaskStatus: (taskId: string, newStatus: Status) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: generateTasks(500),
  selectedTask: null,
  setSelectedTask: (task) => set({ selectedTask: task }),
  updateTaskStatus: (taskId, newStatus) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)),
    })),
}));