import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GoalCard from "@/components/molecules/GoalCard";
import CalendarModal from "@/components/molecules/CalendarModal";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import goalsService from "@/services/api/goalsService";
import completionsService from "@/services/api/completionsService";
import badgesService from "@/services/api/badgesService";
import { isToday } from "date-fns";
import { toast } from "react-toastify";

const GoalList = ({ onAddGoal, showArchived = false, onBadgeEarned }) => {
  const [goals, setGoals] = useState([]);
  const [completions, setCompletions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedGoalForCalendar, setSelectedGoalForCalendar] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      const [goalsData, completionsData] = await Promise.all([
        goalsService.getAll(),
        completionsService.getAll()
      ]);
      setGoals(goalsData);
      setCompletions(completionsData);
    } catch (err) {
      setError("Failed to load goals. Please try again.");
      console.error("Error loading data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleComplete = async (goalId) => {
    try {
      const goal = goals.find(g => g.Id === goalId);
      if (!goal) return;

      const today = new Date().toISOString().split("T")[0];
      const existingCompletion = completions.find(
        c => c.goalId === goalId && c.date === today
      );

      if (existingCompletion) {
        // Remove completion
        await completionsService.delete(existingCompletion.Id);
        setCompletions(prev => prev.filter(c => c.Id !== existingCompletion.Id));
        
        // Update goal streak
        const updatedGoal = {
          ...goal,
          currentStreak: Math.max(0, goal.currentStreak - 1),
          lastCompletedDate: goal.currentStreak > 1 ? goal.lastCompletedDate : null
        };
        await goalsService.update(goalId, updatedGoal);
        setGoals(prev => prev.map(g => g.Id === goalId ? updatedGoal : g));
        
        toast.info("Goal unmarked");
      } else {
        // Add completion
        const newCompletion = {
          goalId: goalId,
          date: today,
          completedAt: new Date().toISOString()
        };
        const savedCompletion = await completionsService.create(newCompletion);
        setCompletions(prev => [...prev, savedCompletion]);

        // Update goal streak
        const newStreak = goal.currentStreak + 1;
        const updatedGoal = {
          ...goal,
          currentStreak: newStreak,
          bestStreak: Math.max(goal.bestStreak, newStreak),
          lastCompletedDate: today
        };
        await goalsService.update(goalId, updatedGoal);
        setGoals(prev => prev.map(g => g.Id === goalId ? updatedGoal : g));

        // Check for badge achievements
        const badgeTypes = [];
        if (newStreak === 7) badgeTypes.push("streak7");
        if (newStreak === 30) badgeTypes.push("streak30");
        if (newStreak === 100) badgeTypes.push("streak100");

        for (const badgeType of badgeTypes) {
          const newBadge = {
            type: badgeType,
            earnedAt: new Date().toISOString(),
            goalId: goalId
          };
          const savedBadge = await badgesService.create(newBadge);
          if (onBadgeEarned) {
            onBadgeEarned(savedBadge);
          }
          
          const badgeNames = {
            streak7: "Week Warrior",
            streak30: "Month Master", 
            streak100: "Century Champion"
          };
          toast.success(`🎉 Badge earned: ${badgeNames[badgeType]}!`);
        }

        toast.success("Goal completed! 🎯");
      }
    } catch (err) {
      console.error("Error toggling completion:", err);
      toast.error("Failed to update goal completion");
    }
  };

  const handleArchiveGoal = async (goalId) => {
    try {
      const goal = goals.find(g => g.Id === goalId);
      if (!goal) return;

      const updatedGoal = {
        ...goal,
        isArchived: !goal.isArchived
      };
      
      await goalsService.update(goalId, updatedGoal);
      setGoals(prev => prev.map(g => g.Id === goalId ? updatedGoal : g));
      
      toast.success(goal.isArchived ? "Goal restored!" : "Goal archived!");
    } catch (err) {
      console.error("Error archiving goal:", err);
      toast.error("Failed to archive goal");
    }
  };

  const handleViewCalendar = (goalId) => {
    const goal = goals.find(g => g.Id === goalId);
    setSelectedGoalForCalendar(goal);
  };

  const isGoalCompleted = (goalId) => {
    const today = new Date().toISOString().split("T")[0];
    return completions.some(c => c.goalId === goalId && c.date === today);
  };

  const filteredGoals = goals.filter(goal => 
    showArchived ? goal.isArchived : !goal.isArchived
  );

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadData} />;
  if (filteredGoals.length === 0) {
    return (
      <Empty
        title={showArchived ? "No archived goals" : "No goals yet"}
        description={
          showArchived 
            ? "Goals you archive will appear here for future reference."
            : "Start your journey by creating your first goal. Build habits that stick!"
        }
        actionText={showArchived ? null : "Create Your First Goal"}
        onAction={showArchived ? null : onAddGoal}
        icon={showArchived ? "Archive" : "Target"}
      />
    );
  }

  return (
<div className="space-y-6 p-6 backdrop-filter backdrop-blur-lg bg-white/10 rounded-3xl border border-white/20 shadow-2xl">
      <AnimatePresence mode="popLayout">
        {filteredGoals.map(goal => (
          <GoalCard
            key={goal.Id}
            goal={goal}
            isCompleted={isGoalCompleted(goal.Id)}
            onToggleComplete={handleToggleComplete}
            onArchive={handleArchiveGoal}
            onViewCalendar={handleViewCalendar}
            showArchive={showArchived}
          />
        ))}
      </AnimatePresence>

      <CalendarModal
        isOpen={!!selectedGoalForCalendar}
        onClose={() => setSelectedGoalForCalendar(null)}
        goalId={selectedGoalForCalendar?.Id}
        goalTitle={selectedGoalForCalendar?.title}
      />
    </div>
  );
};

export default GoalList;