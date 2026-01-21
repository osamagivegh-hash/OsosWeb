import { TrendingUp, TrendingDown } from 'lucide-react';

const StatsCard = ({ title, value, icon: Icon, trend, trendValue, color }) => {
    const isPositive = trend === 'up';

    return (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#e2e8f0] card-hover">
            <div className="flex items-start justify-between mb-4">
                <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${color} shadow-lg`}
                >
                    <Icon className="w-6 h-6 text-white" />
                </div>
                {trendValue && (
                    <div
                        className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${isPositive
                                ? 'bg-green-100 text-green-600'
                                : 'bg-red-100 text-red-600'
                            }`}
                    >
                        {isPositive ? (
                            <TrendingUp className="w-3 h-3" />
                        ) : (
                            <TrendingDown className="w-3 h-3" />
                        )}
                        {trendValue}
                    </div>
                )}
            </div>
            <p className="text-3xl font-bold text-[#1e293b] mb-1">{value}</p>
            <p className="text-sm text-[#64748b]">{title}</p>
        </div>
    );
};

export default StatsCard;
