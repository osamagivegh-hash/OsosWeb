import { Briefcase, User, ShoppingCart, Layout, Star } from 'lucide-react';

const categories = [
    { id: 'all', label: 'All Tasks', icon: Layout },
    { id: 'work', label: 'Work', icon: Briefcase },
    { id: 'personal', label: 'Personal', icon: User },
    { id: 'shopping', label: 'Shopping', icon: ShoppingCart },
    { id: 'priority', label: 'Priority', icon: Star },
];

const CategoryTabs = ({ activeCategory, onCategoryChange }) => {
    return (
        <div className="mb-6 -mx-4 px-4 overflow-x-auto scrollbar-hide">
            <div className="flex gap-2 min-w-max pb-2">
                {categories.map((category) => {
                    const isActive = activeCategory === category.id;
                    const Icon = category.icon;

                    return (
                        <button
                            key={category.id}
                            onClick={() => onCategoryChange(category.id)}
                            className={`touch-target flex items-center gap-2 px-4 py-3 rounded-xl font-medium text-sm whitespace-nowrap transition-all ${isActive
                                    ? 'bg-gradient-to-r from-[#1e3a5f] to-[#2d4a6f] text-white shadow-lg tab-active'
                                    : 'bg-white text-[#64748b] border border-[#e2e8f0] hover:border-[#1e3a5f] hover:text-[#1e3a5f]'
                                }`}
                        >
                            <Icon className="w-4 h-4" />
                            <span>{category.label}</span>
                            {isActive && (
                                <span className="ml-1 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                                    {category.count || ''}
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default CategoryTabs;
