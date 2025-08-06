import React, { useState, useEffect } from "react";
import Modal from "@/components/atoms/Modal";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday } from "date-fns";
import { cn } from "@/utils/cn";
import completionsService from "@/services/api/completionsService";

const CalendarModal = ({ isOpen, onClose, goalId, goalTitle }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [completions, setCompletions] = useState([]);

  useEffect(() => {
    if (isOpen && goalId) {
      loadCompletions();
    }
  }, [isOpen, goalId, currentMonth]);

  const loadCompletions = async () => {
    try {
      const allCompletions = await completionsService.getAll();
      const goalCompletions = allCompletions.filter(c => c.goalId === goalId);
      setCompletions(goalCompletions);
    } catch (error) {
      console.error("Error loading completions:", error);
    }
  };

  const getDaysInMonth = () => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    return eachDayOfInterval({ start, end });
  };

  const isDateCompleted = (date) => {
    return completions.some(completion => 
      isSameDay(new Date(completion.date), date)
    );
  };

  const navigateMonth = (direction) => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setMonth(prev.getMonth() + direction);
      return newMonth;
    });
  };

  const days = getDaysInMonth();
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Get first day of month to calculate grid start
  const firstDayOfMonth = startOfMonth(currentMonth);
  const startingDayIndex = firstDayOfMonth.getDay();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Calendar - ${goalTitle}`}
      size="lg"
    >
      <div className="space-y-6">
        {/* Month Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigateMonth(-1)}
            className="p-2 hover:bg-surface-50 rounded-lg transition-colors duration-200"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          
          <h3 className="text-xl font-semibold text-gray-800">
            {format(currentMonth, "MMMM yyyy")}
          </h3>
          
          <button
            onClick={() => navigateMonth(1)}
            className="p-2 hover:bg-surface-50 rounded-lg transition-colors duration-200"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {/* Week Day Headers */}
          {weekDays.map(day => (
            <div
              key={day}
              className="p-2 text-center text-sm font-medium text-gray-600"
            >
              {day}
            </div>
          ))}

          {/* Empty cells for days before month starts */}
          {Array.from({ length: startingDayIndex }, (_, i) => (
            <div key={`empty-${i}`} className="p-2"></div>
          ))}

          {/* Month days */}
          {days.map(day => {
            const completed = isDateCompleted(day);
            const today = isToday(day);

            return (
              <div
                key={day.toISOString()}
                className={cn(
                  "p-2 text-center text-sm rounded-lg transition-all duration-200 relative",
                  today && "ring-2 ring-primary-500",
                  completed 
                    ? "bg-gradient-to-br from-success-500 to-success-600 text-white shadow-md"
                    : "hover:bg-surface-50 text-gray-700"
                )}
              >
                <span className="relative z-10">
                  {format(day, "d")}
                </span>
                {completed && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-1 h-1 bg-white rounded-full opacity-50"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 pt-4 border-t border-surface-200">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gradient-to-br from-success-500 to-success-600 rounded"></div>
            <span className="text-sm text-gray-600">Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-primary-500 rounded"></div>
            <span className="text-sm text-gray-600">Today</span>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-surface-50 rounded-lg p-4">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary-600">
                {completions.length}
              </div>
              <div className="text-sm text-gray-600">Total Completions</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-success-600">
                {Math.round((completions.length / days.length) * 100)}%
              </div>
              <div className="text-sm text-gray-600">This Month</div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CalendarModal;