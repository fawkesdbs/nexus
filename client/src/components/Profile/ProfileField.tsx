import React, { useState, useEffect } from "react";
import { Edit2, Shield } from "lucide-react";
import type { Employee } from "../../types/profile";

interface ProfileFieldProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  value: string;
  isEditable?: boolean;
  fieldKey: keyof Employee;
  onUpdate?: (key: keyof Employee, value: string) => void;
  inputType?: string;
}

export const ProfileField: React.FC<ProfileFieldProps> = ({
  icon: Icon,
  label,
  value,
  isEditable = false,
  fieldKey,
  onUpdate = () => {},
  inputType = "text",
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  const handleSave = () => {
    onUpdate(fieldKey, currentValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setCurrentValue(value);
    setIsEditing(false);
  };

  const isLocked =
    fieldKey === "id" ||
    fieldKey === "employee_number" ||
    fieldKey === "created_at";

  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors">
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-semibold text-gray-400 flex items-center">
          <Icon className="w-4 h-4 mr-2 text-blue-400" />
          {label}
        </label>

        {!isLocked && isEditable && !isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-gray-400 hover:text-blue-400 transition-colors p-1"
          >
            <Edit2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {isLocked ? (
        <div className="flex items-center justify-between">
          <p className="text-white font-medium">{value}</p>
          <Shield className="w-4 h-4 text-gray-500" />
        </div>
      ) : isEditing ? (
        <div className="space-y-2">
          <input
            type={inputType}
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded text-sm transition-colors"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-300 py-1 px-3 rounded text-sm transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <p className="text-white font-medium">{value}</p>
      )}
    </div>
  );
};
