import { Plus, X, FileText, Clock, Star } from 'lucide-react';
import { useState } from 'react';

const quickActions = [
    { id: 'task', label: 'New Task', icon: FileText, color: 'bg-blue-500' },
    { id: 'reminder', label: 'Reminder', icon: Clock, color: 'bg-purple-500' },
    { id: 'priority', label: 'Priority', icon: Star, color: 'bg-yellow-500' },
];

const FloatingActionButton = ({ onAddTask }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleQuickAction = (actionId) => {
        if (actionId === 'task') {
            onAddTask();
        }
        setIsExpanded(false);
    };

    return (
        <>
            {/* Backdrop */}
            {isExpanded && (
                <div
                    className="fixed inset-0 bg-black/20 z-40 lg:hidden"
                    onClick={() => setIsExpanded(false)}
                ></div>
            )}

            {/* Quick Actions */}
            <div className="fixed bottom-24 right-4 z-50 flex flex-col items-end gap-3 lg:bottom-8">
                {isExpanded &&
                    quickActions.map((action, index) => {
                        const Icon = action.icon;
                        return (
                            <button
                                key={action.id}
                                onClick={() => handleQuickAction(action.id)}
                                className="flex items-center gap-3 animate-slide-up"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <span className="px-4 py-2 bg-white rounded-xl shadow-lg text-sm font-medium text-[#1e293b]">
                                    {action.label}
                                </span>
                                <div
                                    className={`w-12 h-12 ${action.color} rounded-2xl flex items-center justify-center shadow-lg text-white`}
                                >
                                    <Icon className="w-5 h-5" />
                                </div>
                            </button>
                        );
                    })}

                {/* Main FAB */}
                <button
                    onClick={() => (isExpanded ? setIsExpanded(false) : onAddTask())}
                    onContextMenu={(e) => {
                        e.preventDefault();
                        setIsExpanded(!isExpanded);
                    }}
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl transition-all duration-300 ${isExpanded
                            ? 'bg-[#1e3a5f] rotate-45'
                            : 'bg-gradient-to-br from-[#ff6b35] to-[#e55a2a] fab-pulse'
                        }`}
                >
                    {isExpanded ? (
                        <X className="w-6 h-6 text-white" />
                    ) : (
                        <Plus className="w-7 h-7 text-white" />
                    )}
                </button>
            </div>
        </>
    );
};

export default FloatingActionButton;
