import { LayoutGrid, CheckSquare, User, Settings, BarChart3 } from 'lucide-react';

const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'stats', label: 'Stats', icon: BarChart3 },
    { id: 'profile', label: 'Profile', icon: User },
];

const BottomNavigation = ({ activeNav, onNavChange }) => {
    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden glass border-t border-white/20">
            <div className="flex items-center justify-around px-2 py-2">
                {navItems.map((item) => {
                    const isActive = activeNav === item.id;
                    const Icon = item.icon;

                    return (
                        <button
                            key={item.id}
                            onClick={() => onNavChange(item.id)}
                            className={`touch-target flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl transition-all ${isActive
                                    ? 'text-[#ff6b35]'
                                    : 'text-[#64748b] hover:text-[#1e3a5f]'
                                }`}
                        >
                            <div
                                className={`p-2 rounded-xl transition-all ${isActive
                                        ? 'bg-gradient-to-br from-[#ff6b35]/10 to-[#e55a2a]/10'
                                        : ''
                                    }`}
                            >
                                <Icon className={`w-6 h-6 ${isActive ? 'stroke-2' : ''}`} />
                            </div>
                            <span className="text-xs font-medium">{item.label}</span>
                            {isActive && (
                                <div className="absolute bottom-1 w-8 h-1 bg-[#ff6b35] rounded-full"></div>
                            )}
                        </button>
                    );
                })}
            </div>
        </nav>
    );
};

export default BottomNavigation;
