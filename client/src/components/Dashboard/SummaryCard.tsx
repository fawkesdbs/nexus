import React from "react";
import type { SummaryItem } from "../../types/dashboard";

interface SummaryCardProps {
  item: SummaryItem;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ item }) => {
  const Icon = item.icon;
  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors">
      <div className="flex items-center justify-between mb-2">
        <div
          className={`p-2 rounded-lg ${item.color.replace(
            "text",
            "bg"
          )} bg-opacity-20`}
        >
          <Icon className={`w-5 h-5 ${item.color}`} />
        </div>
        <span
          className={`text-sm font-semibold ${
            item.change >= 0 ? "text-green-400" : "text-red-400"
          }`}
        >
          {item.change >= 0 ? "+" : ""}
          {item.change}%
        </span>
      </div>
      <h3 className="text-2xl font-bold text-white mb-1">{item.count}</h3>
      <p className="text-sm text-gray-400">{item.category}</p>
    </div>
  );
};
