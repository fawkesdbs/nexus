import React from "react";
import { MapPin, Calendar, Users } from "lucide-react";
import type { Event } from "../../types/dashboard";

interface EventCardProps {
  event: Event;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const getEventTypeStyles = (type: string) => {
    switch (type) {
      case "meeting":
        return {
          bg: "bg-blue-900/30",
          border: "border-blue-500",
          text: "text-blue-400",
        };
      case "training":
        return {
          bg: "bg-purple-900/30",
          border: "border-purple-500",
          text: "text-purple-400",
        };
      case "deadline":
        return {
          bg: "bg-red-900/30",
          border: "border-red-500",
          text: "text-red-400",
        };
      case "social":
        return {
          bg: "bg-green-900/30",
          border: "border-green-500",
          text: "text-green-400",
        };
      default:
        return {
          bg: "bg-gray-700",
          border: "border-gray-500",
          text: "text-gray-400",
        };
    }
  };

  const styles = getEventTypeStyles(event.type);

  return (
    <div
      className={`p-4 rounded-lg border-l-4 ${styles.bg} ${styles.border} hover:shadow-lg transition-all`}
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-bold text-white text-sm">{event.name}</h4>
        <span
          className={`text-xs font-semibold px-2 py-1 rounded ${styles.bg} ${styles.text}`}
        >
          {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
        </span>
      </div>
      <div className="space-y-1 text-xs">
        <div className="flex items-center text-gray-300">
          <MapPin className="w-3 h-3 mr-1" />
          <span>{event.venue}</span>
        </div>
        <div className="flex items-center text-gray-300">
          <Calendar className="w-3 h-3 mr-1" />
          <span>
            {event.date} • {event.time}
          </span>
        </div>
        <div className="flex items-center text-gray-300">
          <Users className="w-3 h-3 mr-1" />
          <span>{event.attendees} attendees</span>
        </div>
      </div>
    </div>
  );
};
