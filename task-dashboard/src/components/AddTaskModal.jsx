import { X, Calendar, Tag, Clock, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

const priorities = [
    { id: 'low', label: 'Low', color: 'bg-green-500' },
    { id: 'medium', label: 'Medium', color: 'bg-yellow-500' },
    { id: 'high', label: 'High', color: 'bg-red-500' },
];

const categories = [
    { id: 'work', label: '💼 Work' },
    { id: 'personal', label: '👤 Personal' },
    { id: 'shopping', label: '🛒 Shopping' },
    { id: 'priority', label: '⭐ Priority' },
];

const AddTaskModal = ({ isOpen, onClose, onSave, editTask }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priority: 'medium',
        category: 'work',
        dueDate: '',
        estimatedTime: '',
        tags: [],
    });
    const [tagInput, setTagInput] = useState('');

    useEffect(() => {
        if (editTask) {
            setFormData({
                ...editTask,
                tags: editTask.tags || [],
            });
        } else {
            setFormData({
                title: '',
                description: '',
                priority: 'medium',
                category: 'work',
                dueDate: '',
                estimatedTime: '',
                tags: [],
            });
        }
    }, [editTask, isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title.trim()) return;

        onSave({
            ...formData,
            id: editTask?.id || Date.now(),
            status: editTask?.status || 'todo',
        });
        onClose();
    };

    const addTag = () => {
        if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
            setFormData({
                ...formData,
                tags: [...formData.tags, tagInput.trim()],
            });
            setTagInput('');
        }
    };

    const removeTag = (tag) => {
        setFormData({
            ...formData,
            tags: formData.tags.filter((t) => t !== tag),
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-end lg:items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="relative w-full max-w-lg bg-white rounded-t-3xl lg:rounded-2xl max-h-[90vh] overflow-y-auto animate-slide-up">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-[#e2e8f0] px-6 py-4 flex items-center justify-between rounded-t-3xl lg:rounded-t-2xl">
                    <h2 className="text-xl font-bold text-[#1e293b]">
                        {editTask ? 'Edit Task' : 'Add New Task'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="touch-target flex items-center justify-center w-10 h-10 rounded-xl hover:bg-[#f1f5f9] transition-colors"
                    >
                        <X className="w-5 h-5 text-[#64748b]" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-[#1e293b] mb-2">
                            Task Title *
                        </label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) =>
                                setFormData({ ...formData, title: e.target.value })
                            }
                            placeholder="What needs to be done?"
                            className="w-full px-4 py-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl focus:border-[#1e3a5f] focus:ring-2 focus:ring-[#1e3a5f]/20 outline-none transition-all"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-[#1e293b] mb-2">
                            Description
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({ ...formData, description: e.target.value })
                            }
                            placeholder="Add more details..."
                            rows={3}
                            className="w-full px-4 py-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl focus:border-[#1e3a5f] focus:ring-2 focus:ring-[#1e3a5f]/20 outline-none transition-all resize-none"
                        ></textarea>
                    </div>

                    {/* Priority */}
                    <div>
                        <label className="block text-sm font-medium text-[#1e293b] mb-2">
                            <AlertCircle className="inline w-4 h-4 mr-1" />
                            Priority
                        </label>
                        <div className="flex gap-3">
                            {priorities.map((priority) => (
                                <button
                                    key={priority.id}
                                    type="button"
                                    onClick={() =>
                                        setFormData({ ...formData, priority: priority.id })
                                    }
                                    className={`flex-1 py-3 rounded-xl font-medium text-sm transition-all ${formData.priority === priority.id
                                            ? `${priority.color} text-white shadow-lg`
                                            : 'bg-[#f1f5f9] text-[#64748b] hover:bg-[#e2e8f0]'
                                        }`}
                                >
                                    {priority.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-[#1e293b] mb-2">
                            Category
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    type="button"
                                    onClick={() =>
                                        setFormData({ ...formData, category: category.id })
                                    }
                                    className={`py-3 rounded-xl font-medium text-sm transition-all ${formData.category === category.id
                                            ? 'bg-gradient-to-r from-[#1e3a5f] to-[#2d4a6f] text-white shadow-lg'
                                            : 'bg-[#f1f5f9] text-[#64748b] hover:bg-[#e2e8f0]'
                                        }`}
                                >
                                    {category.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Due Date & Time */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-[#1e293b] mb-2">
                                <Calendar className="inline w-4 h-4 mr-1" />
                                Due Date
                            </label>
                            <input
                                type="date"
                                value={formData.dueDate}
                                onChange={(e) =>
                                    setFormData({ ...formData, dueDate: e.target.value })
                                }
                                className="w-full px-4 py-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl focus:border-[#1e3a5f] focus:ring-2 focus:ring-[#1e3a5f]/20 outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[#1e293b] mb-2">
                                <Clock className="inline w-4 h-4 mr-1" />
                                Est. Time
                            </label>
                            <input
                                type="text"
                                value={formData.estimatedTime}
                                onChange={(e) =>
                                    setFormData({ ...formData, estimatedTime: e.target.value })
                                }
                                placeholder="e.g., 2h"
                                className="w-full px-4 py-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl focus:border-[#1e3a5f] focus:ring-2 focus:ring-[#1e3a5f]/20 outline-none transition-all"
                            />
                        </div>
                    </div>

                    {/* Tags */}
                    <div>
                        <label className="block text-sm font-medium text-[#1e293b] mb-2">
                            <Tag className="inline w-4 h-4 mr-1" />
                            Tags
                        </label>
                        <div className="flex gap-2 mb-2 flex-wrap">
                            {formData.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#1e3a5f]/10 text-[#1e3a5f] rounded-lg text-sm"
                                >
                                    {tag}
                                    <button
                                        type="button"
                                        onClick={() => removeTag(tag)}
                                        className="ml-1 hover:text-red-500"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </span>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                                placeholder="Add a tag..."
                                className="flex-1 px-4 py-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl focus:border-[#1e3a5f] focus:ring-2 focus:ring-[#1e3a5f]/20 outline-none transition-all"
                            />
                            <button
                                type="button"
                                onClick={addTag}
                                className="px-4 py-3 bg-[#1e3a5f] text-white rounded-xl font-medium hover:bg-[#152a45] transition-colors"
                            >
                                Add
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-4 bg-gradient-to-r from-[#ff6b35] to-[#e55a2a] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                        {editTask ? 'Update Task' : 'Create Task'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddTaskModal;
