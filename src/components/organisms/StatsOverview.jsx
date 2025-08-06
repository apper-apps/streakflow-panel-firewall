import React, { useState, useEffect } from "react";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import goalsService from "@/services/api/goalsService";
import completionsService from "@/services/api/completionsService";
import { isToday, startOfWeek, endOfWeek } from "date-fns";

const StatsOverview = () => {
  const [stats, setStats] = useState({
    totalGoals: 0,
    completedToday: 0,
    currentStreaks: 0,
    weeklyProgress: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [goals, completions] = await Promise.all([
        goalsService.getAll(),
        completionsService.getAll()
      ]);

      const activeGoals = goals.filter(g => !g.isArchived);
      const today = new Date().toISOString().split("T")[0];
      const todayCompletions = completions.filter(c => c.date === today);
      
      const currentStreaks = activeGoals.reduce((total, goal) => 
        total + goal.currentStreak, 0
      );

      // Calculate weekly progress
      const weekStart = startOfWeek(new Date());
      const weekEnd = endOfWeek(new Date());
      const weekCompletions = completions.filter(c => {
        const date = new Date(c.date);
        return date >= weekStart && date <= weekEnd;
      });
      
      const weeklyProgress = activeGoals.length > 0 
        ? Math.round((weekCompletions.length / (activeGoals.length * 7)) * 100)
        : 0;

      setStats({
        totalGoals: activeGoals.length,
        completedToday: todayCompletions.length,
        currentStreaks,
        weeklyProgress: Math.min(weeklyProgress, 100)
      });
    } catch (error) {
      console.error("Error loading stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Active Goals",
      value: stats.totalGoals,
      icon: "Target",
      gradient: "from-primary-500 to-primary-600",
      bgGradient: "from-primary-50 to-blue-50"
    },
    {
      title: "Completed Today",
      value: stats.completedToday,
      icon: "CheckCircle2",
      gradient: "from-success-500 to-success-600",
      bgGradient: "from-success-50 to-emerald-50"
    },
    {
      title: "Total Streak Days",
      value: stats.currentStreaks,
      icon: "Flame",
      gradient: "from-accent-500 to-accent-600",
      bgGradient: "from-accent-50 to-orange-50"
    }
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
{[1, 2, 3].map(i => (
          <div key={i} className="backdrop-filter backdrop-blur-lg bg-white/20 border border-white/30 rounded-xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="h-6 bg-gradient-to-r from-white/30 to-white/50 rounded w-24 animate-pulse backdrop-filter backdrop-blur-sm"></div>
              <div className="w-10 h-10 bg-gradient-to-r from-white/30 to-white/50 rounded-full animate-pulse backdrop-filter backdrop-blur-sm"></div>
            </div>
            <div className="h-8 bg-gradient-to-r from-white/30 to-white/50 rounded w-16 animate-pulse mb-2 backdrop-filter backdrop-blur-sm"></div>
            <div className="h-4 bg-gradient-to-r from-white/30 to-white/50 rounded w-20 animate-pulse backdrop-filter backdrop-blur-sm"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {statCards.map((stat, index) => (
        <Card 
key={stat.title} 
          className="p-6 backdrop-filter backdrop-blur-lg bg-white/20 border border-white/30 hover:bg-white/25 hover:shadow-2xl transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-4">
<h3 className="font-medium text-white/90 drop-shadow">{stat.title}</h3>
            <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${stat.gradient} flex items-center justify-center backdrop-filter backdrop-blur-sm border border-white/30`}>
              <ApperIcon 
                name={stat.icon} 
                size={20} 
                className={`text-white ${stat.icon === "Flame" ? "flame-animation" : ""}`}
              />
            </div>
          </div>
<div className="text-3xl font-bold text-white mb-1 drop-shadow-lg">
            {stat.value}
          </div>
<div className="text-sm text-white/80 drop-shadow">
            {stat.title === "Active Goals" && "Track your habits"}
            {stat.title === "Completed Today" && `of ${stats.totalGoals} goals`}
            {stat.title === "Total Streak Days" && "Keep the momentum"}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default StatsOverview;