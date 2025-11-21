import React from "react";
import type { Task } from "../../types/dashboard";

interface TaskCardProps {
  task: Task;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case "high":
        return {
          container: "bg-red-900/30 border-red-500",
          badge: "bg-red-500 text-white",
        };
      case "medium":
        return {
          container: "bg-yellow-900/30 border-yellow-500",
          badge: "bg-yellow-500 text-white",
        };
      case "low":
        return {
          container: "bg-green-900/30 border-green-500",
          badge: "bg-green-500 text-white",
        };
      case "at-risk":
        return {
          container: "bg-orange-900/30 border-orange-500",
          badge: "bg-orange-500 text-white",
        };
      default:
        return {
          container: "bg-gray-700 border-gray-500",
          badge: "bg-gray-500 text-white",
        };
    }
  };

  const styles = getPriorityStyles(task.priority);

  return (
    <div
      className={`task-card border-l-4 p-4 mb-3 rounded-r-lg ${styles.container}`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-bold text-white">{task.title}</h4>
          <p className="text-sm text-gray-300 mt-1">{task.due}</p>
          <p className="text-xs text-gray-400 mt-2">{task.description}</p>
        </div>
        <span
          className={`text-xs font-semibold px-2 py-1 rounded ${styles.badge}`}
        >
          {task.priority === "at-risk"
            ? "At Risk"
            : task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
        </span>
      </div>
    </div>
  );
};
