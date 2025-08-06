import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import BadgeCard from "@/components/molecules/BadgeCard";
import ApperIcon from "@/components/ApperIcon";
import badgesService from "@/services/api/badgesService";
import goalsService from "@/services/api/goalsService";

const BadgeShowcase = ({ newBadges = [] }) => {
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBadges();
  }, []);

  useEffect(() => {
    if (newBadges.length > 0) {
      setBadges(prev => [...prev, ...newBadges]);
    }
  }, [newBadges]);

  const loadBadges = async () => {
    try {
      const badgesData = await badgesService.getAll();
      setBadges(badgesData);
    } catch (error) {
      console.error("Error loading badges:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
<Card className="p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-gradient-to-r from-white/30 to-white/50 rounded-full animate-pulse backdrop-filter backdrop-blur-sm"></div>
          <div className="h-6 bg-gradient-to-r from-white/30 to-white/50 rounded w-32 animate-pulse backdrop-filter backdrop-blur-sm"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-white/10 backdrop-filter backdrop-blur-sm border border-white/20 rounded-xl p-4">
              <div className="w-16 h-16 bg-gradient-to-r from-white/30 to-white/50 rounded-full mx-auto mb-3 animate-pulse backdrop-filter backdrop-blur-sm"></div>
              <div className="h-4 bg-gradient-to-r from-white/30 to-white/50 rounded w-full mb-2 animate-pulse backdrop-filter backdrop-blur-sm"></div>
              <div className="h-3 bg-gradient-to-r from-white/30 to-white/50 rounded w-3/4 mx-auto animate-pulse backdrop-filter backdrop-blur-sm"></div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  if (badges.length === 0) {
    return (
<Card className="p-8 mb-8 text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-white/20 to-white/30 backdrop-filter backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <ApperIcon name="Award" size={32} className="text-white/70" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2 drop-shadow-lg">No badges yet</h3>
        <p className="text-white/80 text-sm">
          Complete your first 7-day streak to earn your first badge!
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-6 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-accent-500 to-accent-600 flex items-center justify-center">
          <ApperIcon name="Award" size={20} className="text-white" />
</div>
        <h2 className="text-xl font-bold text-white drop-shadow-lg">Achievement Badges</h2>
<span className="px-2 py-1 bg-amber-500/30 text-amber-100 backdrop-filter backdrop-blur-sm border border-amber-300/40 rounded-full text-sm font-medium">
          {badges.length}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {badges.map((badge, index) => (
          <BadgeCard
            key={badge.Id}
            badge={badge}
            isNew={newBadges.some(nb => nb.Id === badge.Id)}
          />
        ))}
      </div>

      {badges.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 pt-6 border-t border-surface-200 text-center"
>
          <p className="text-sm text-white/80">
            Keep building streaks to unlock more badges! 
            <span className="ml-2">🎯</span>
          </p>
        </motion.div>
      )}
    </Card>
  );
};

export default BadgeShowcase;