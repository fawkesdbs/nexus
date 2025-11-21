import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  Briefcase,
  Users,
  Hash,
  Calendar,
  Edit2,
  X,
  Camera,
  Shield,
  Loader2,
} from "lucide-react";
import type { Employee } from "../../types/profile";
import { ProfileField } from "../../components/Profile/ProfileField";

const Profile: React.FC = () => {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(
    "https://placehold.co/150x150/4f46e5/ffffff?text=User"
  );

  // Fetch Profile Data
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to load profile");

      const data = await res.json();
      setEmployee(data);
      if (data.profile_picture) {
        setProfileImage(data.profile_picture);
      } else {
        // Set default initials
        const initials = `${data.first_name?.charAt(0) || ""}${
          data.last_name?.charAt(0) || ""
        }`;
        setProfileImage(
          `https://placehold.co/150x150/4f46e5/ffffff?text=${initials}`
        );
      }
    } catch (err) {
      console.error(err);
      setError("Could not load profile data");
    } finally {
      setLoading(false);
    }
  };

  const handleFieldUpdate = async (key: keyof Employee, value: string) => {
    if (!employee) return;

    // Optimistic Update
    const previousEmployee = { ...employee };
    setEmployee((prev) => (prev ? { ...prev, [key]: value } : null));

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ [key]: value }),
      });

      if (!res.ok) throw new Error("Update failed");

      // Update successful
      console.log(`Updated ${key} successfully`);
    } catch (err) {
      console.error(err);
      // Revert on failure
      setEmployee(previousEmployee);
      alert("Failed to save changes. Please try again.");
    }
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      // Convert to Base64
      const reader = new FileReader();
      reader.onload = async (e) => {
        if (e.target?.result) {
          const base64String = e.target.result as string;
          setProfileImage(base64String);

          // Save to backend immediately
          try {
            const token = localStorage.getItem("token");
            await fetch("/api/auth/profile", {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ profile_picture: base64String }),
            });
          } catch (err) {
            console.error("Failed to upload image", err);
            alert("Failed to save profile picture");
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const formatDate = (dateString?: string): string => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getDepartmentColor = (department?: string | null): string => {
    const colors: { [key: string]: string } = {
      "Cloud Operations": "bg-blue-500",
      IT: "bg-green-500",
      HR: "bg-purple-500",
      Sales: "bg-orange-500",
      Engineering: "bg-red-500",
      Marketing: "bg-pink-500",
    };
    return (department && colors[department]) || "bg-gray-500";
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        <Loader2 className="animate-spin w-10 h-10" />
      </div>
    );
  if (error || !employee)
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-red-400">
        {error || "No profile found"}
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Employee Profile
          </h1>
          <p className="text-gray-400 mt-2">
            Manage your personal and professional information
          </p>
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
                <p className="text-gray-400 text-center">
                  {employee.role || "Employee"}
                </p>

                <div
                  className={`mt-2 px-3 py-1 rounded-full text-xs font-medium text-white ${getDepartmentColor(
                    employee.department
                  )}`}
                >
                  {employee.department || "Unassigned"}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="space-y-3 border-t border-gray-700 pt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Employee ID</span>
                  <span className="text-white font-mono">
                    {employee.employee_number || "N/A"}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Member Since</span>
                  <span className="text-white">
                    {formatDate(employee.created_at)}
                  </span>
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
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {isEditing ? (
                  <div className="flex items-center justify-center space-x-2">
                    <X className="w-4 h-4" />
                    <span>Exit Edit Mode</span>
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
                    value={employee.gender || "Not specified"}
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
                    value={employee.phone_number || "Not specified"}
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
                    value={employee.company_name || "LightStars Inc."}
                    isEditable={isEditing}
                    fieldKey="company_name"
                    onUpdate={handleFieldUpdate}
                  />
                  <ProfileField
                    icon={Users}
                    label="Department"
                    value={employee.department || "Unassigned"}
                    isEditable={isEditing}
                    fieldKey="department"
                    onUpdate={handleFieldUpdate}
                  />
                  <ProfileField
                    icon={Briefcase}
                    label="Role"
                    value={employee.role || "Employee"}
                    isEditable={isEditing}
                    fieldKey="role"
                    onUpdate={handleFieldUpdate}
                  />
                  <ProfileField
                    icon={Hash}
                    label="Employee Number"
                    value={employee.employee_number || "Pending"}
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
                    value={employee.id}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
