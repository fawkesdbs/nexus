import React, { useState } from 'react';
import { Camera, Edit2, Mail, Phone, Building2, Hash, Briefcase, UserRound, Users, User, X, Save } from 'lucide-react'; // Icons from Lucide React
// import './Profile.css'; // Assuming you might want some custom CSS here

// Dummy data for the profile (as shown in your image)
const initialProfileData = {
  fullName: "",
  role: "",
  companyName: "LightStars Technology Inc.",
  firstName: "",
  lastName: "",
  gender: "",
  email: "",
  phoneNumber: "",
  department: "",
  employeeNumber: "",
  profilePicture: null, // Placeholder for uploaded image
};

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(initialProfileData);
  const [tempProfileData, setTempProfileData] = useState(initialProfileData); // For edits
  const [profileImage, setProfileImage] = useState<string | null>(null); // For display picture URL

  // Function to handle changes in input fields during edit mode
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTempProfileData(prev => ({ ...prev, [name]: value }));
  };

  // Function to handle profile picture upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target?.result as string);
        // Also update temp data if saving to the profile is desired on upload
        // setTempProfileData(prev => ({ ...prev, profilePicture: event.target?.result as string }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // Function to save changes
  const handleSave = () => {
    setProfileData(tempProfileData);
    setIsEditing(false);
    // In a real application, you would send this data to a backend API
    console.log("Profile Saved:", tempProfileData, "Profile Image:", profileImage);
  };

  // Function to cancel editing
  const handleCancel = () => {
    setTempProfileData(profileData); // Revert to original data
    setIsEditing(false);
  };

  // Helper to get initials for the avatar if no image is uploaded
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-4 sm:p-6 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-xl p-6 sm:p-8 space-y-6">

        {/* Header Section: Profile Picture, Name, Role, Edit Button */}
        <div className="flex flex-col items-center border-b border-gray-700 pb-6 mb-6">
          <div className="relative w-32 h-32 rounded-full bg-indigo-700 flex items-center justify-center text-5xl font-bold text-white mb-4">
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="w-full h-full rounded-full object-cover" />
            ) : (
              getInitials(profileData.firstName, profileData.lastName)
            )}
            {isEditing && (
              <label htmlFor="profile-image-upload" className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
                <Camera size={20} />
                <input
                  id="profile-image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            )}
          </div>
          <h1 className="text-3xl font-bold text-white">{profileData.fullName}</h1>
          <p className="text-gray-400 text-lg">{profileData.role}</p>

          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="mt-6 flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md"
            >
              <Edit2 size={20} className="mr-2" />
              Edit Profile
            </button>
          )}
        </div>

        {/* Profile Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">

          {/* Company Name */}
          <ProfileField
            icon={<Building2 size={20} />}
            label="COMPANY NAME"
            value={profileData.companyName}
            name="companyName"
            isEditing={isEditing}
            tempValue={tempProfileData.companyName}
            onChange={handleChange}
          />

          {/* First Name */}
          <ProfileField
            icon={<User size={20} />}
            label="FIRST NAME"
            value={profileData.firstName}
            name="firstName"
            isEditing={isEditing}
            tempValue={tempProfileData.firstName}
            onChange={handleChange}
          />

          {/* Last Name */}
          <ProfileField
            icon={<User size={20} />}
            label="LAST NAME"
            value={profileData.lastName}
            name="lastName"
            isEditing={isEditing}
            tempValue={tempProfileData.lastName}
            onChange={handleChange}
          />

          {/* Gender */}
          <ProfileField
            icon={<Users size={20} />}
            label="GENDER"
            value={profileData.gender}
            name="gender"
            isEditing={isEditing}
            tempValue={tempProfileData.gender}
            onChange={handleChange}
            type="select"
            options={['Male', 'Female', 'Other', 'Prefer not to say']}
          />

          {/* Email */}
          <ProfileField
            icon={<Mail size={20} />}
            label="EMAIL"
            value={profileData.email}
            name="email"
            isEditing={isEditing}
            tempValue={tempProfileData.email}
            onChange={handleChange}
            type="email"
          />

          {/* Phone Number */}
          <ProfileField
            icon={<Phone size={20} />}
            label="PHONE NUMBER"
            value={profileData.phoneNumber}
            name="phoneNumber"
            isEditing={isEditing}
            tempValue={tempProfileData.phoneNumber}
            onChange={handleChange}
            type="tel"
          />

          {/* Department */}
          <ProfileField
            icon={<Building2 size={20} />}
            label="DEPARTMENT"
            value={profileData.department}
            name="department"
            isEditing={isEditing}
            tempValue={tempProfileData.department}
            onChange={handleChange}
          />

          {/* Employee Number */}
          <ProfileField
            icon={<Hash size={20} />}
            label="EMPLOYEE NUMBER"
            value={profileData.employeeNumber}
            name="employeeNumber"
            isEditing={isEditing}
            tempValue={tempProfileData.employeeNumber}
            onChange={handleChange}
          />

          {/* Role/Occupation */}
          <ProfileField
            icon={<Briefcase size={20} />}
            label="ROLE/OCCUPATION"
            value={profileData.role}
            name="role"
            isEditing={isEditing}
            tempValue={tempProfileData.role}
            onChange={handleChange}
          />

        </div>

        {/* Action Buttons for Editing */}
        {isEditing && (
          <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-700">
            <button
              onClick={handleCancel}
              className="flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors shadow-md"
            >
              <X size={20} className="mr-2" />
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md"
            >
              <Save size={20} className="mr-2" />
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

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
