import React from "react";
import { AlertCircle, CalendarDays, Check, Bell } from "lucide-react";
import type { Notification } from "../../types/dashboard";

interface NotificationItemProps {
  notification: Notification;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
}) => {
  const getIcon = () => {
    switch (notification.type) {
      case "alert":
        return (
          <div className="bg-red-500 p-2 rounded-lg">
            <AlertCircle className="w-4 h-4 text-white" />
          </div>
        );
      case "info":
        return (
          <div className="bg-blue-500 p-2 rounded-lg">
            <CalendarDays className="w-4 h-4 text-white" />
          </div>
        );
      case "success":
        return (
          <div className="bg-green-500 p-2 rounded-lg">
            <Check className="w-4 h-4 text-white" />
          </div>
        );
      default:
        return (
          <div className="bg-gray-500 p-2 rounded-lg">
            <Bell className="w-4 h-4 text-white" />
          </div>
        );
    }
  };

  return (
    <div className="flex items-start space-x-3">
      {getIcon()}
      <div>
        <h4 className="font-medium text-white">{notification.title}</h4>
        <p className="text-xs text-gray-400">{notification.message}</p>
      </div>
    </div>
  );
};
