import React from "react";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No goals yet",
  description = "Start your journey by creating your first goal. Build habits that stick!",
  actionText = "Create Your First Goal",
  onAction,
  icon = "Target"
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
      <div className="w-20 h-20 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full flex items-center justify-center mb-6">
        <ApperIcon name={icon} size={40} className="text-primary-600" />
      </div>
      
      <h3 className="text-2xl font-semibold text-gray-800 mb-3">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-8 max-w-md text-lg">
        {description}
      </p>
      
      {onAction && (
        <Button 
          onClick={onAction}
          variant="primary"
          size="lg"
          className="flex items-center gap-2"
        >
          <ApperIcon name="Plus" size={20} />
          {actionText}
        </Button>
      )}
    </div>
  );
};

export default Empty;