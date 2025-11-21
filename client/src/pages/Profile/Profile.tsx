import React, { useState, useEffect } from 'react';
import { 
    User, Mail, Phone, Briefcase, Users, Hash, Calendar, 
    Edit2, Save, X, Camera, MapPin, Shield, Clock
} from 'lucide-react';

// --- Type Definitions ---
interface Employee {
    id: number;
    company_name: string;
    first_name: string;
    last_name: string;
    gender: string;
    email: string;
    phone_number: string;
    department: string;
    employee_number: string;
    role: string;
    created_at: string;
}

// --- Mock Data ---
const mockEmployee: Employee = {
    id: 1,
    company_name: 'LightStars Technology Inc.',
    first_name: 'Aisha',
    last_name: 'Jele',
    gender: 'Female',
    email: 'aisha.jele@lightstars.co.za',
    phone_number: '+27 82 555 1234',
    department: 'Cloud Operations',
    employee_number: 'LS-9001',
    role: 'Senior Data Architect',
    created_at: '2023-01-15T08:00:00Z'
};

// --- Reusable Components ---
interface ProfileFieldProps {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    label: string;
    value: string;
    isEditable?: boolean;
    fieldKey: keyof Employee;
    onUpdate?: (key: keyof Employee, value: string) => void;
    inputType?: string;
}

const ProfileField: React.FC<ProfileFieldProps> = ({ 
    icon: Icon, 
    label, 
    value, 
    isEditable = false, 
    fieldKey,
    onUpdate = () => {},
    inputType = 'text'
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

    const isLocked = fieldKey === 'id' || fieldKey === 'employee_number' || fieldKey === 'created_at';

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

// --- Main Profile Component ---
const Profile: React.FC = () => {
    const [employee, setEmployee] = useState<Employee>(mockEmployee);
    const [isEditing, setIsEditing] = useState(false);
    const [profileImage, setProfileImage] = useState('https://placehold.co/150x150/4f46e5/ffffff?text=AJ');

    const handleFieldUpdate = (key: keyof Employee, value: string) => {
        setEmployee(prev => ({
            ...prev,
            [key]: value
        }));
        // In real app, this would make an API call to update the database
        console.log(`Updated ${key} to: ${value}`);
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result) {
                    setProfileImage(e.target.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const getInitials = (firstName: string, lastName: string): string => {
        return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    };

    const formatDate = (dateString: string): string => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getDepartmentColor = (department: string): string => {
        const colors: { [key: string]: string } = {
            'Cloud Operations': 'bg-blue-500',
            'IT': 'bg-green-500',
            'HR': 'bg-purple-500',
            'Sales': 'bg-orange-500',
            'Engineering': 'bg-red-500',
            'Marketing': 'bg-pink-500'
        };
        return colors[department] || 'bg-gray-500';
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        Employee Profile
                    </h1>
                    <p className="text-gray-400 mt-2">Manage your personal and professional information</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Left Column - Profile Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6 sticky top-6">
                            {/* Profile Image */}
                            <div className="flex flex-col items-center mb-6">
                                <div className="relative mb-4">
                                    <img 
                                        src={profileImage} 
                                        alt="Profile" 
                                        className="w-32 h-32 rounded-full border-4 border-blue-500 object-cover"
                                        onError={(e) => {
                                            e.currentTarget.src = `https://placehold.co/150x150/4f46e5/ffffff?text=${getInitials(employee.first_name, employee.last_name)}`;
                                        }}
                                    />
                                    {isEditing && (
                                        <>
                                            <input 
                                                type="file" 
                                                id="profile-image-upload" 
                                                className="hidden" 
                                                accept="image/*"
                                                onChange={handleImageChange}
                                            />
                                            <label 
                                                htmlFor="profile-image-upload" 
                                                className="absolute bottom-2 right-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full cursor-pointer transition-colors border-2 border-gray-800"
                                            >
                                                <Camera className="w-4 h-4" />
                                            </label>
                                        </>
                                    )}
                                </div>
                                
                                <h2 className="text-xl font-bold text-white text-center">
                                    {employee.first_name} {employee.last_name}
                                </h2>
                                <p className="text-gray-400 text-center">{employee.role}</p>
                                
                                <div className={`mt-2 px-3 py-1 rounded-full text-xs font-medium text-white ${getDepartmentColor(employee.department)}`}>
                                    {employee.department}
                                </div>
                            </div>

                            {/* Quick Stats */}
                            <div className="space-y-3 border-t border-gray-700 pt-4">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-400">Employee ID</span>
                                    <span className="text-white font-mono">{employee.employee_number}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-400">Member Since</span>
                                    <span className="text-white">{formatDate(employee.created_at)}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-400">Status</span>
                                    <span className="text-green-400 font-medium">Active</span>
                                </div>
                            </div>

                            {/* Edit Toggle */}
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className={`w-full mt-6 py-3 px-4 rounded-lg font-semibold transition-all ${
                                    isEditing
                                        ? 'bg-red-600 hover:bg-red-700 text-white'
                                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                                }`}
                            >
                                {isEditing ? (
                                    <div className="flex items-center justify-center space-x-2">
                                        <X className="w-4 h-4" />
                                        <span>Cancel Editing</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center space-x-2">
                                        <Edit2 className="w-4 h-4" />
                                        <span>Edit Profile</span>
                                    </div>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Right Column - Profile Details */}
                    <div className="lg:col-span-3">
                        <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6">
                            {/* Section: Personal Information */}
                            <div className="mb-8">
                                <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                                    <User className="w-5 h-5 text-blue-400 mr-2" />
                                    Personal Information
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <ProfileField
                                        icon={User}
                                        label="First Name"
                                        value={employee.first_name}
                                        isEditable={isEditing}
                                        fieldKey="first_name"
                                        onUpdate={handleFieldUpdate}
                                    />
                                    <ProfileField
                                        icon={User}
                                        label="Last Name"
                                        value={employee.last_name}
                                        isEditable={isEditing}
                                        fieldKey="last_name"
                                        onUpdate={handleFieldUpdate}
                                    />
                                    <ProfileField
                                        icon={Users}
                                        label="Gender"
                                        value={employee.gender}
                                        isEditable={isEditing}
                                        fieldKey="gender"
                                        onUpdate={handleFieldUpdate}
                                    />
                                    <ProfileField
                                        icon={Mail}
                                        label="Email"
                                        value={employee.email}
                                        isEditable={isEditing}
                                        fieldKey="email"
                                        onUpdate={handleFieldUpdate}
                                        inputType="email"
                                    />
                                    <ProfileField
                                        icon={Phone}
                                        label="Phone Number"
                                        value={employee.phone_number}
                                        isEditable={isEditing}
                                        fieldKey="phone_number"
                                        onUpdate={handleFieldUpdate}
                                        inputType="tel"
                                    />
                                </div>
                            </div>

                            {/* Section: Professional Information */}
                            <div className="mb-8">
                                <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                                    <Briefcase className="w-5 h-5 text-green-400 mr-2" />
                                    Professional Information
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <ProfileField
                                        icon={Briefcase}
                                        label="Company"
                                        value={employee.company_name}
                                        isEditable={isEditing}
                                        fieldKey="company_name"
                                        onUpdate={handleFieldUpdate}
                                    />
                                    <ProfileField
                                        icon={Users}
                                        label="Department"
                                        value={employee.department}
                                        isEditable={isEditing}
                                        fieldKey="department"
                                        onUpdate={handleFieldUpdate}
                                    />
                                    <ProfileField
                                        icon={Briefcase}
                                        label="Role"
                                        value={employee.role}
                                        isEditable={isEditing}
                                        fieldKey="role"
                                        onUpdate={handleFieldUpdate}
                                    />
                                    <ProfileField
                                        icon={Hash}
                                        label="Employee Number"
                                        value={employee.employee_number}
                                        isEditable={false}
                                        fieldKey="employee_number"
                                        onUpdate={handleFieldUpdate}
                                    />
                                </div>
                            </div>

                            {/* Section: System Information */}
                            <div>
                                <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                                    <Shield className="w-5 h-5 text-purple-400 mr-2" />
                                    System Information
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <ProfileField
                                        icon={Hash}
                                        label="User ID"
                                        value={employee.id.toString()}
                                        isEditable={false}
                                        fieldKey="id"
                                        onUpdate={handleFieldUpdate}
                                    />
                                    <ProfileField
                                        icon={Calendar}
                                        label="Account Created"
                                        value={formatDate(employee.created_at)}
                                        isEditable={false}
                                        fieldKey="created_at"
                                        onUpdate={handleFieldUpdate}
                                    />
                                </div>
                            </div>

                            {/* Save Changes Button (when editing) */}
                            {isEditing && (
                                <div className="mt-8 pt-6 border-t border-gray-700">
                                    <button
                                        onClick={() => setIsEditing(false)}
                                        className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center space-x-2"
                                    >
                                        <Save className="w-4 h-4" />
                                        <span>Save All Changes</span>
                                    </button>
                                    <p className="text-sm text-gray-400 mt-2">
                                        Note: Changes will be reflected across all company systems
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Additional Info Card */}
                        <div className="mt-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                                <Clock className="w-5 h-5 text-yellow-400 mr-2" />
                                Profile Completeness
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-gray-400">Profile Information</span>
                                        <span className="text-green-400">95% Complete</span>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-2">
                                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-400">
                                    Your profile is almost complete! Consider adding a profile picture and verifying your contact information.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;

// --- Helper Component for Profile Field Display/Edit ---
interface ProfileFieldProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  name: string;
  isEditing: boolean;
  tempValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  type?: string; // e.g., "text", "email", "tel", "select"
  options?: string[]; // For select type
}

const ProfileField: React.FC<ProfileFieldProps> = ({ icon, label, value, name, isEditing, tempValue, onChange, type = "text", options }) => (
  <div className="flex flex-col">
    <label className="text-gray-400 text-xs font-semibold uppercase mb-2 flex items-center">
      {icon && <span className="mr-2 text-indigo-400">{icon}</span>}
      {label}
    </label>
    {isEditing ? (
      type === "select" && options ? (
        <select
          name={name}
          value={tempValue}
          onChange={onChange}
          className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:ring-blue-500 focus:border-blue-500 text-white"
        >
          {options.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={tempValue}
          onChange={onChange}
          className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:ring-blue-500 focus:border-blue-500 text-white"
        />
      )
    ) : (
      <p className="text-lg text-white font-medium">{value}</p>
    )}
  </div>
);
