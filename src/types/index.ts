export type Status = 'To Do' | 'In Progress' | 'In Review' | 'Done';
export type Priority = 'Low' | 'Medium' | 'High' | 'Critical';

export interface Task {
    id: string;
    title: string;
    status: Status;
    priority: Priority;
    startDate?: string;
    dueDate: string;
    assignee: string;
    collaborators: string[];
}