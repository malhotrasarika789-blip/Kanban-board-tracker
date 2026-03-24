import { useEffect, useState } from 'react';
import { useTaskStore } from '../store/useTaskStore';

const MOCK_USERS = [
    { id: 'u1', name: 'John', color: 'bg-pink-500' },
    { id: 'u2', name: 'Sarah', color: 'bg-green-500' },
    { id: 'u3', name: 'Mike', color: 'bg-yellow-500' },
];

export default function CollaborationOverlay() {
    const [activeCount, setActiveCount] = useState(3);

  // Simulation: Randomly change count every 5 seconds
    useEffect(() => {
    const interval = setInterval(() => {
      setActiveCount(Math.floor(Math.random() * 3) + 2);
    }, 5000);
    return () => clearInterval(interval);
    }, []);

    return (
    <div className="flex items-center gap-2 mb-4 bg-slate-800/40 p-2 rounded-full w-fit border border-slate-700">
        <div className="flex -space-x-2">
        {MOCK_USERS.map((user) => (
            <div key={user.id} className={`w-8 h-8 rounded-full border-2 border-slate-900 ${user.color} flex items-center justify-center text-[10px] font-bold`}>
            {user.name[0]}
            </div>
        ))}
        </div>
        <span className="text-xs text-slate-400 px-2">{activeCount} people are viewing this board</span>
    </div>
    );
}