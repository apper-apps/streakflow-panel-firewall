import React, { useState } from "react";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import GoalList from "@/components/organisms/GoalList";
import StatsOverview from "@/components/organisms/StatsOverview";
import BadgeShowcase from "@/components/organisms/BadgeShowcase";
import AddGoalModal from "@/components/molecules/AddGoalModal";
import goalsService from "@/services/api/goalsService";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [showArchived, setShowArchived] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [newBadges, setNewBadges] = useState([]);

  const handleAddGoal = async (goalData) => {
    try {
      await goalsService.create(goalData);
      setRefreshKey(prev => prev + 1);
    } catch (error) {
      console.error("Error creating goal:", error);
      toast.error("Failed to create goal");
    }
  };

  const handleBadgeEarned = (badge) => {
    setNewBadges(prev => [...prev, badge]);
    // Clear new badge status after 3 seconds
    setTimeout(() => {
      setNewBadges(prev => prev.filter(b => b.Id !== badge.Id));
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-2">
              StreakFlow
            </h1>
            <p className="text-gray-600 text-lg">
              Build consistent habits, one day at a time
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant={showArchived ? "primary" : "secondary"}
              onClick={() => setShowArchived(!showArchived)}
              className="flex items-center gap-2"
            >
              <ApperIcon name="Archive" size={18} />
              {showArchived ? "View Active" : "View Archived"}
            </Button>
            {!showArchived && (
              <Button
                variant="primary"
                onClick={() => setShowAddGoal(true)}
                className="flex items-center gap-2"
              >
                <ApperIcon name="Plus" size={18} />
                Add Goal
              </Button>
            )}
          </div>
        </div>

        {/* Stats Overview */}
        {!showArchived && <StatsOverview key={refreshKey} />}

        {/* Badge Showcase */}
        {!showArchived && (
          <BadgeShowcase 
            key={refreshKey} 
            newBadges={newBadges}
          />
        )}

        {/* Goals Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {showArchived ? "Archived Goals" : "Today's Goals"}
          </h2>
          <GoalList
            key={`${refreshKey}-${showArchived}`}
            onAddGoal={() => setShowAddGoal(true)}
            showArchived={showArchived}
            onBadgeEarned={handleBadgeEarned}
          />
        </div>

        {/* Add Goal Modal */}
        <AddGoalModal
          isOpen={showAddGoal}
          onClose={() => setShowAddGoal(false)}
          onAddGoal={handleAddGoal}
        />
      </div>
    </div>
  );
};

export default Dashboard;