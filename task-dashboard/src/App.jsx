import { useState, useMemo } from 'react';
import { CheckCircle2, Timer, ListTodo, Target, Monitor, Smartphone } from 'lucide-react';
import Header from './components/Header';
import KanbanBoard from './components/KanbanBoard';
import CategoryTabs from './components/CategoryTabs';
import BottomNavigation from './components/BottomNavigation';
import FloatingActionButton from './components/FloatingActionButton';
import AddTaskModal from './components/AddTaskModal';
import StatsCard from './components/StatsCard';
import { sampleTasks } from './data/sampleTasks';
import './App.css';

// Desktop redirect message component
const DesktopRedirect = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e3a5f] via-[#2d4a6f] to-[#1e3a5f] flex items-center justify-center p-8">
      <div className="max-w-xl text-center">
        {/* Logo */}
        <div className="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl border border-white/20">
          <span className="text-6xl">🐻</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          OsosWeb Task Dashboard
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-white/80 mb-8">
          هذا التطبيق مصمم للهواتف الذكية فقط
        </p>
        <p className="text-lg text-white/60 mb-12">
          This dashboard is designed for mobile devices only
        </p>

        {/* Phone Icon */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="p-4 bg-white/10 rounded-2xl">
            <Monitor className="w-12 h-12 text-white/40" />
          </div>
          <div className="text-3xl text-white/60">→</div>
          <div className="p-4 bg-gradient-to-br from-[#ff6b35] to-[#e55a2a] rounded-2xl shadow-lg">
            <Smartphone className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-8">
          <h3 className="text-lg font-semibold text-white mb-3">للوصول إلى لوحة المهام:</h3>
          <ul className="text-white/80 space-y-2 text-right">
            <li>📱 افتح هذا الرابط من هاتفك الذكي</li>
            <li>🔄 أو قم بتصغير نافذة المتصفح</li>
            <li>🛠️ أو استخدم أدوات المطور (F12) لمحاكاة الهاتف</li>
          </ul>
        </div>

        {/* Link to main website */}
        <a
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#ff6b35] to-[#e55a2a] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
        >
          <span>زيارة الموقع الرئيسي</span>
          <span>🌐</span>
        </a>

        {/* Footer */}
        <p className="mt-12 text-white/40 text-sm">
          © 2026 OsosWeb - أسس لخدمات الويب
        </p>
      </div>
    </div>
  );
};

// Mobile Dashboard Component
const MobileDashboard = () => {
  const [tasks, setTasks] = useState(sampleTasks);
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeNav, setActiveNav] = useState('dashboard');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter tasks based on search and category
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        activeCategory === 'all' || task.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [tasks, searchQuery, activeCategory]);

  // Stats calculations
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === 'done').length;
    const inProgress = tasks.filter((t) => t.status === 'inprogress').length;
    const todo = tasks.filter((t) => t.status === 'todo').length;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { total, completed, inProgress, todo, completionRate };
  }, [tasks]);

  const handleStatusChange = (taskId, newStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const handleSaveTask = (taskData) => {
    if (editTask) {
      setTasks((prev) =>
        prev.map((task) => (task.id === taskData.id ? taskData : task))
      );
    } else {
      setTasks((prev) => [...prev, taskData]);
    }
    setEditTask(null);
  };

  const handleEditTask = (task) => {
    setEditTask(task);
    setShowAddModal(true);
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const handleAddTask = () => {
    setEditTask(null);
    setShowAddModal(true);
  };

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <Header onSearch={setSearchQuery} searchQuery={searchQuery} />

      {/* Main Content */}
      <main className="pt-20 px-4 max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-6 mt-4">
          <h1 className="text-2xl font-bold text-[#1e293b] mb-2">
            مرحباً! 👋
          </h1>
          <p className="text-[#64748b]">
            لديك{' '}
            <span className="font-semibold text-[#ff6b35]">{stats.todo}</span>{' '}
            مهام للإنجاز اليوم
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <StatsCard
            title="إجمالي المهام"
            value={stats.total}
            icon={ListTodo}
            color="from-[#1e3a5f] to-[#2d4a6f]"
          />
          <StatsCard
            title="قيد التنفيذ"
            value={stats.inProgress}
            icon={Timer}
            trend="up"
            trendValue="+2"
            color="from-[#ff6b35] to-[#e55a2a]"
          />
          <StatsCard
            title="مكتملة"
            value={stats.completed}
            icon={CheckCircle2}
            trend="up"
            trendValue="+5"
            color="from-green-500 to-green-600"
          />
          <StatsCard
            title="نسبة الإنجاز"
            value={`${stats.completionRate}%`}
            icon={Target}
            trend="up"
            trendValue="+12%"
            color="from-purple-500 to-purple-600"
          />
        </div>

        {/* Category Tabs */}
        <CategoryTabs
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Kanban Board - Single Column for Mobile */}
        <KanbanBoard
          tasks={filteredTasks}
          onStatusChange={handleStatusChange}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          activeCategory={activeCategory}
        />
      </main>

      {/* Bottom Navigation (Mobile) */}
      <BottomNavigation activeNav={activeNav} onNavChange={setActiveNav} />

      {/* Floating Action Button */}
      <FloatingActionButton onAddTask={handleAddTask} />

      {/* Add/Edit Task Modal */}
      <AddTaskModal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setEditTask(null);
        }}
        onSave={handleSaveTask}
        editTask={editTask}
      />
    </div>
  );
};

function App() {
  return (
    <>
      {/* Desktop View - Redirect Message */}
      <div className="hidden lg:block">
        <DesktopRedirect />
      </div>

      {/* Mobile View - Task Dashboard */}
      <div className="block lg:hidden">
        <MobileDashboard />
      </div>
    </>
  );
}

export default App;
