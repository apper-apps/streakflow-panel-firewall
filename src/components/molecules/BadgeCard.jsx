import React from "react";
import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import { format } from "date-fns";
import { cn } from "@/utils/cn";

const BadgeCard = ({ badge, isNew = false }) => {
  const getBadgeConfig = (type) => {
    switch (type) {
      case "streak7":
        return {
          name: "Week Warrior",
          description: "7-day streak",
          icon: "Flame",
          gradient: "from-accent-400 to-accent-600",
          bgGradient: "from-accent-50 to-orange-50"
        };
      case "streak30":
        return {
          name: "Month Master",
          description: "30-day streak",
          icon: "Crown",
          gradient: "from-purple-400 to-purple-600",
          bgGradient: "from-purple-50 to-violet-50"
        };
      case "streak100":
        return {
          name: "Century Champion",
          description: "100-day streak",
          icon: "Trophy",
          gradient: "from-yellow-400 to-yellow-600",
          bgGradient: "from-yellow-50 to-amber-50"
        };
      default:
        return {
          name: "Achievement",
          description: "Goal completed",
          icon: "Star",
          gradient: "from-blue-400 to-blue-600",
          bgGradient: "from-blue-50 to-indigo-50"
        };
    }
  };

  const config = getBadgeConfig(badge.type);

  return (
    <motion.div
      initial={{ scale: 0, rotate: -10 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 20,
        delay: isNew ? 0.2 : 0 
      }}
    >
      <Card className={cn(
        "p-4 text-center relative overflow-hidden",
        `bg-gradient-to-br ${config.bgGradient}`,
        isNew && "ring-2 ring-accent-500 ring-offset-2"
      )}>
        {isNew && (
          <div className="absolute inset-0 badge-shine" />
        )}
        
        <div className="relative z-10">
          <div className={cn(
            "w-16 h-16 rounded-full bg-gradient-to-br mx-auto mb-3 flex items-center justify-center",
            config.gradient
          )}>
            <ApperIcon 
              name={config.icon} 
              size={28} 
              className="text-white drop-shadow-sm" 
            />
          </div>
          
          <h3 className="font-semibold text-gray-800 mb-1">
            {config.name}
          </h3>
          
          <p className="text-sm text-gray-600 mb-2">
            {config.description}
          </p>
          
          <p className="text-xs text-gray-500">
            Earned {format(new Date(badge.earnedAt), "MMM d, yyyy")}
          </p>
        </div>
        
        {isNew && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="absolute -top-2 -right-2 w-6 h-6 bg-accent-500 rounded-full flex items-center justify-center"
          >
            <ApperIcon name="Sparkles" size={12} className="text-white" />
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
};

export default BadgeCard;