import React, { useState } from "react";
import { motion } from "framer-motion";
import { format, isToday } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import { cn } from "@/utils/cn";

const GoalCard = React.forwardRef(({ 
  goal, 
  isCompleted, 
  onToggleComplete, 
  onArchive, 
  onViewCalendar,
  showArchive = false 
}, ref) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const getStreakColor = (streak) => {
    if (streak >= 30) return "text-purple-600";
    if (streak >= 7) return "text-accent-600";
    return "text-primary-600";
  };

  const getStreakBgColor = (streak) => {
    if (streak >= 30) return "from-purple-500 to-purple-600";
    if (streak >= 7) return "from-accent-500 to-accent-600";
    return "from-primary-500 to-primary-600";
  };

  const canCompleteToday = () => {
    if (goal.frequency === "daily") return true;
    if (goal.frequency === "weekly") {
      const lastCompleted = goal.lastCompletedDate;
      if (!lastCompleted) return true;
      const daysSinceCompletion = Math.floor((new Date() - new Date(lastCompleted)) / (1000 * 60 * 60 * 24));
      return daysSinceCompletion >= 7;
    }
    return false;
  };

  const handleToggleComplete = () => {
    if (canCompleteToday() || isCompleted) {
      onToggleComplete(goal.Id);
    }
  };

  return (
<motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={cn(
"p-6 backdrop-filter backdrop-blur-lg bg-white/20 border border-white/30 hover:bg-white/25 hover:border-white/40 transition-all duration-300 shadow-xl hover:shadow-2xl",
        isCompleted && "bg-gradient-to-r from-emerald-400/20 to-green-400/20 border-emerald-300/40 shadow-emerald-500/20",
        goal.isArchived && "opacity-60"
      )}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
<h3 className={cn(
              "text-lg font-semibold mb-2 text-white drop-shadow-lg",
              isCompleted && "text-emerald-100",
              goal.isArchived && "text-gray-200"
            )}>
              {goal.title}
            </h3>
            {goal.description && (
<p className={cn(
                "text-white/80 text-sm mb-3 drop-shadow",
                goal.isArchived && "text-white/60"
              )}>
                {goal.description}
              </p>
            )}
            <div className="flex items-center gap-3 text-sm">
              <span className={cn(
                "px-2 py-1 rounded-full text-xs font-medium",
goal.frequency === "daily" 
                  ? "bg-blue-500/30 text-blue-100 border border-blue-300/40 backdrop-filter backdrop-blur-sm"
                  : "bg-green-500/30 text-green-100 border border-green-300/40 backdrop-filter backdrop-blur-sm"
              )}>
                {goal.frequency}
              </span>
              <span className="text-gray-500">
                Created {format(new Date(goal.createdAt), "MMM d")}
              </span>
            </div>
          </div>
          
          {!goal.isArchived && (
            <div className="flex items-center gap-2">
<Button
                variant="ghost"
                size="icon"
                onClick={() => onViewCalendar(goal.Id)}
                className="text-white/70 hover:text-white hover:bg-white/20 backdrop-filter backdrop-blur-sm border border-white/20"
              >
                <ApperIcon name="Calendar" size={18} />
              </Button>
<Button
                variant="ghost"
                size="icon"
                onClick={() => setShowConfirmDelete(true)}
                className="text-white/70 hover:text-red-200 hover:bg-red-500/20 backdrop-filter backdrop-blur-sm border border-white/20"
              >
                <ApperIcon name="Archive" size={18} />
              </Button>
            </div>
          )}
        </div>

        {/* Streak Display */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r text-white",
              getStreakBgColor(goal.currentStreak)
            )}>
              <ApperIcon 
                name="Flame" 
                size={16} 
                className={cn(
                  "flame-animation",
                  goal.currentStreak > 0 && "text-orange-200"
                )}
              />
              <span className="font-semibold text-sm">
                {goal.currentStreak} day{goal.currentStreak !== 1 ? "s" : ""}
              </span>
            </div>
{goal.bestStreak > goal.currentStreak && (
              <span className="text-xs text-white/60 drop-shadow">
                Best: {goal.bestStreak}
              </span>
            )}
          </div>

          {!goal.isArchived && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleToggleComplete}
              disabled={!canCompleteToday() && !isCompleted}
              className={cn(
                "w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-200",
                isCompleted
                  ? "bg-success-500 border-success-500 text-white"
                  : canCompleteToday()
                  ? "border-gray-300 hover:border-primary-500 text-gray-400 hover:text-primary-500"
                  : "border-gray-200 text-gray-300 cursor-not-allowed",
                !canCompleteToday() && !isCompleted && "opacity-50"
              )}
            >
              {isCompleted && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="check-animation"
                >
                  <ApperIcon name="Check" size={16} />
                </motion.div>
              )}
            </motion.button>
          )}
        </div>

        {/* Completion Status */}
        {!goal.isArchived && (
<div className="text-xs text-white/70">
            {isCompleted ? (
              <span className="text-emerald-200 font-medium drop-shadow">
                ✓ Completed today
              </span>
            ) : canCompleteToday() ? (
              <span>
                Click to mark as complete
              </span>
            ) : goal.frequency === "weekly" ? (
              <span>
                Available in {7 - Math.floor((new Date() - new Date(goal.lastCompletedDate)) / (1000 * 60 * 60 * 24))} days
              </span>
            ) : null}
          </div>
        )}

{showArchive && goal.isArchived && (
          <div className="mt-4 pt-4 border-t border-surface-200">
            <Button
variant="ghost"
              size="sm"
              onClick={() => onArchive(goal.Id)}
              className="text-indigo-200 hover:text-white hover:bg-indigo-500/20 backdrop-filter backdrop-blur-sm border border-white/20"
            >
              <ApperIcon name="RotateCcw" size={14} className="mr-2" />
              Restore Goal
            </Button>
          </div>
        )}

        {/* Confirm Delete Modal */}
{showConfirmDelete && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-lg z-50 flex items-center justify-center p-4">
            <div className="backdrop-filter backdrop-blur-xl bg-white/20 border border-white/30 rounded-3xl p-6 max-w-sm w-full shadow-2xl">
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-red-500/20 backdrop-filter backdrop-blur-sm border border-red-300/40 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name="Archive" size={24} className="text-red-200" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 drop-shadow-lg">
                  Archive Goal?
                </h3>
                <p className="text-white/80 text-sm">
                  This will move "{goal.title}" to your archived goals. You can restore it later if needed.
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setShowConfirmDelete(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    onArchive(goal.Id);
                    setShowConfirmDelete(false);
                  }}
                  className="flex-1 bg-red-500/80 hover:bg-red-500 backdrop-filter backdrop-blur-sm border border-red-300/40"
                >
                  Archive
                </Button>
              </div>
            </div>
          </div>
        )}
</Card>
    </motion.div>
  );
});

GoalCard.displayName = 'GoalCard';

export default GoalCard;