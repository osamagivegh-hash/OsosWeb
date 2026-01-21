import { Circle, Timer, CheckCircle2 } from 'lucide-react';
import TaskCard from './TaskCard';

const columns = [
    { id: 'todo', title: 'قيد الانتظار', icon: Circle, color: 'from-blue-500 to-blue-600' },
    { id: 'inprogress', title: 'قيد التنفيذ', icon: Timer, color: 'from-[#ff6b35] to-[#e55a2a]' },
    { id: 'done', title: 'مكتملة', icon: CheckCircle2, color: 'from-green-500 to-green-600' },
];

const KanbanBoard = ({ tasks, onStatusChange, onEdit, onDelete, activeCategory }) => {
    return (
        <div className="space-y-6">
            {columns.map((column) => {
                const columnTasks = tasks.filter(
                    (task) =>
                        task.status === column.id &&
                        (activeCategory === 'all' || task.category === activeCategory)
                );
                const Icon = column.icon;

                return (
                    <div key={column.id} className="flex flex-col">
                        {/* Column Header */}
                        <div className="flex items-center gap-3 mb-4">
                            <div className={`p-2 rounded-xl bg-gradient-to-br ${column.color} shadow-lg`}>
                                <Icon className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h2 className="font-semibold text-[#1e293b]">{column.title}</h2>
                                <p className="text-xs text-[#64748b]">{columnTasks.length} مهام</p>
                            </div>
                        </div>

                        {/* Column Content */}
                        <div className="flex-1 space-y-3 min-h-[100px] p-3 bg-[#f1f5f9]/50 rounded-2xl border-2 border-dashed border-[#e2e8f0]">
                            {columnTasks.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-center py-6">
                                    <div className="w-12 h-12 bg-[#e2e8f0] rounded-xl flex items-center justify-center mb-2">
                                        <Icon className="w-6 h-6 text-[#94a3b8]" />
                                    </div>
                                    <p className="text-sm text-[#64748b]">لا توجد مهام</p>
                                </div>
                            ) : (
                                columnTasks.map((task) => (
                                    <TaskCard
                                        key={task.id}
                                        task={task}
                                        onStatusChange={onStatusChange}
                                        onEdit={onEdit}
                                        onDelete={onDelete}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default KanbanBoard;
