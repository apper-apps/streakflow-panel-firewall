import React from "react";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
        <ApperIcon name="AlertTriangle" size={32} className="text-red-600" />
      </div>
      
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        Something went wrong
      </h3>
      
      <p className="text-gray-600 mb-6 max-w-md">
        {message || "We encountered an error while loading your goals. Please try again."}
      </p>
      
      {onRetry && (
        <Button 
          onClick={onRetry}
          variant="primary"
          className="flex items-center gap-2"
        >
          <ApperIcon name="RotateCcw" size={16} />
          Try Again
        </Button>
      )}
    </div>
  );
};

export default Error;