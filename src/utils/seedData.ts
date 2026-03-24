import { Task, Status, Priority } from '../types/index';

const statuses: Status[] = ['To Do', 'In Progress', 'In Review', 'Done'];
const priorities: Priority[] = ['Low', 'Medium', 'High', 'Critical'];
const assignees = ['SM', 'JS', 'AK', 'PD', 'RB', 'LY'];

export const generateTasks = (count: number): Task[] => {
    return Array.from({ length: count }, (_, i): Task => {
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + Math.floor(Math.random() * 20) - 10);

    return {
        id: `task-${i}`,
        title: `Feature Implementation ${i + 1}`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      priority: priorities[Math.floor(Math.random() * priorities.length)],
        dueDate: dueDate.toISOString(),
      assignee: assignees[Math.floor(Math.random() * assignees.length)],
        collaborators: []
    };
    });
};