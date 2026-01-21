import { Calendar, Clock, Tag, MoreVertical, CheckCircle2, Circle, Timer } from 'lucide-react';
import { useState } from 'react';

const priorityColors = {
    high: 'bg-red-500',
    medium: 'bg-yellow-500',
    low: 'bg-green-500',
};

const statusIcons = {
    todo: Circle,
    inprogress: Timer,
    done: CheckCircle2,
};

const TaskCard = ({ task, onStatusChange, onEdit, onDelete }) => {
    const [showMenu, setShowMenu] = useState(false);
    const StatusIcon = statusIcons[task.status];

    const handleStatusClick = () => {
        const nextStatus = {
            todo: 'inprogress',
            inprogress: 'done',
            done: 'todo',
        };
        onStatusChange(task.id, nextStatus[task.status]);
    };

    return (
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#e2e8f0] card-hover animate-slide-up relative">
            {/* Priority Indicator */}
            <div className={`absolute top-0 left-4 w-12 h-1 rounded-b-full ${priorityColors[task.priority]}`}></div>

            {/* Header */}
            <div className="flex items-start justify-between mb-3 mt-1">
                <button
                    onClick={handleStatusClick}
                    className="touch-target flex items-center justify-center p-1 -ml-1 rounded-lg hover:bg-[#1e3a5f]/5 transition-colors"
                >
                    <StatusIcon
                        className={`w-6 h-6 ${task.status === 'done'
                                ? 'text-green-500'
                                : task.status === 'inprogress'
                                    ? 'text-[#ff6b35]'
                                    : 'text-[#64748b]'
                            }`}
                    />
                </button>

                <div className="relative">
                    <button
                        onClick={() => setShowMenu(!showMenu)}
                        className="touch-target flex items-center justify-center p-2 rounded-lg hover:bg-[#1e3a5f]/5 transition-colors"
                    >
                        <MoreVertical className="w-5 h-5 text-[#64748b]" />
                    </button>

                    {showMenu && (
                        <div className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-xl border border-[#e2e8f0] py-2 min-w-[140px] z-20 animate-slide-up">
                            <button
                                onClick={() => {
                                    onEdit(task);
                                    setShowMenu(false);
                                }}
                                className="w-full px-4 py-2.5 text-left text-sm hover:bg-[#1e3a5f]/5 transition-colors"
                            >
                                Edit Task
                            </button>
                            <button
                                onClick={() => {
                                    onDelete(task.id);
                                    setShowMenu(false);
                                }}
                                className="w-full px-4 py-2.5 text-left text-sm text-red-500 hover:bg-red-50 transition-colors"
                            >
                                Delete Task
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Title */}
            <h3
                className={`font-semibold text-[#1e293b] mb-2 ${task.status === 'done' ? 'line-through opacity-60' : ''
                    }`}
            >
                {task.title}
            </h3>

            {/* Description */}
            {task.description && (
                <p className="text-sm text-[#64748b] mb-3 line-clamp-2">{task.description}</p>
            )}

            {/* Tags */}
            {task.tags && task.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                    {task.tags.map((tag, index) => (
                        <span
                            key={index}
                            className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#1e3a5f]/10 text-[#1e3a5f] rounded-lg text-xs font-medium"
                        >
                            <Tag className="w-3 h-3" />
                            {tag}
                        </span>
                    ))}
                </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between text-xs text-[#64748b] pt-3 border-t border-[#e2e8f0]">
                <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{task.dueDate}</span>
                </div>
                {task.estimatedTime && (
                    <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{task.estimatedTime}</span>
                    </div>
                )}
            </div>

            {/* Click outside to close menu */}
            {showMenu && (
                <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowMenu(false)}
                ></div>
            )}
        </div>
    );
};

export default TaskCard;
