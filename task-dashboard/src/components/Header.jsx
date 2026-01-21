import { Menu, Bell, Search, X } from 'lucide-react';
import { useState } from 'react';

const Header = ({ onSearch, searchQuery }) => {
    const [showSearch, setShowSearch] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/20">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                {/* Logo Section */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#1e3a5f] to-[#2d4a6f] rounded-xl flex items-center justify-center shadow-lg">
                        <span className="text-2xl">🐻</span>
                    </div>
                    <div className="hidden sm:block">
                        <h1 className="text-lg font-bold text-[#1e3a5f]">OsosWeb</h1>
                        <p className="text-xs text-[#64748b]">Task Dashboard</p>
                    </div>
                </div>

                {/* Search Bar - Desktop */}
                <div className="hidden md:flex flex-1 max-w-md mx-8">
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748b] w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search tasks..."
                            value={searchQuery}
                            onChange={(e) => onSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-[#e2e8f0] focus:border-[#1e3a5f] focus:ring-2 focus:ring-[#1e3a5f]/20 outline-none transition-all text-sm"
                        />
                    </div>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-2">
                    {/* Mobile Search Toggle */}
                    <button
                        onClick={() => setShowSearch(!showSearch)}
                        className="md:hidden touch-target flex items-center justify-center w-10 h-10 rounded-xl hover:bg-[#1e3a5f]/10 transition-colors"
                    >
                        {showSearch ? (
                            <X className="w-5 h-5 text-[#1e3a5f]" />
                        ) : (
                            <Search className="w-5 h-5 text-[#1e3a5f]" />
                        )}
                    </button>

                    {/* Notifications */}
                    <button className="touch-target relative flex items-center justify-center w-10 h-10 rounded-xl hover:bg-[#1e3a5f]/10 transition-colors">
                        <Bell className="w-5 h-5 text-[#1e3a5f]" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-[#ff6b35] rounded-full"></span>
                    </button>

                    {/* Profile */}
                    <button className="touch-target flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#ff6b35] to-[#e55a2a] text-white font-semibold shadow-lg">
                        O
                    </button>
                </div>
            </div>

            {/* Mobile Search Bar */}
            {showSearch && (
                <div className="md:hidden px-4 pb-3 animate-slide-up">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748b] w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search tasks..."
                            value={searchQuery}
                            onChange={(e) => onSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-[#e2e8f0] focus:border-[#1e3a5f] focus:ring-2 focus:ring-[#1e3a5f]/20 outline-none transition-all"
                            autoFocus
                        />
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
