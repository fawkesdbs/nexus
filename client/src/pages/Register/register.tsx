import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  Briefcase,
  Star,
  Zap,
  Users,
  CheckCircle,
} from "lucide-react";

interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

export default function RegisterPage() {
  const [formData, setFormData] = useState<RegisterForm>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

  const departments = [
    "Cloud Operations",
    "Data Architecture",
    "Software Development",
    "DevOps",
    "IT Infrastructure",
    "Security",
    "Product Management",
    "Quality Assurance",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Registration attempt:", formData);
      setIsLoading(false);
      // In real app, you would redirect to verification or dashboard
    }, 2000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            First Name *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              id="firstName"
              name="firstName"
              type="text"
              required
              value={formData.firstName}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="Enter your first name"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Last Name *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              id="lastName"
              name="lastName"
              type="text"
              required
              value={formData.lastName}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="Enter your last name"
            />
          </div>
        </div>
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-300 mb-2"
        >
          Work Email *
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="Enter your work email"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-300 mb-2"
        >
          Phone Number
        </label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="+27 82 555 1234"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={nextStep}
          disabled={
            !formData.firstName || !formData.lastName || !formData.email
          }
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <label
          htmlFor="department"
          className="block text-sm font-medium text-gray-300 mb-2"
        >
          Department *
        </label>
        <div className="relative">
          <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
          <select
            id="department"
            name="department"
            required
            value={formData.department}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition appearance-none"
          >
            <option value="">Select your department</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-300 mb-2"
        >
          Password *
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full pl-10 pr-12 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="Create a strong password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-2">
          Must be at least 8 characters with uppercase, lowercase, and numbers
        </p>
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-300 mb-2"
        >
          Confirm Password *
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full pl-10 pr-12 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="Confirm your password"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition"
          >
            {showConfirmPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      <div className="flex items-start space-x-3">
        <input
          id="agreeToTerms"
          name="agreeToTerms"
          type="checkbox"
          required
          checked={formData.agreeToTerms}
          onChange={handleChange}
          className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2 mt-1"
        />
        <label htmlFor="agreeToTerms" className="text-sm text-gray-300">
          I agree to the{" "}
          <button
            type="button"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            Terms of Service
          </button>{" "}
          and{" "}
          <button
            type="button"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            Privacy Policy
          </button>
        </label>
      </div>

      <div className="flex justify-between space-x-4">
        <button
          type="button"
          onClick={prevStep}
          className="px-6 py-3 bg-gray-700 text-gray-300 rounded-lg font-semibold hover:bg-gray-600 focus:ring-2 focus:ring-gray-500 transition"
        >
          Back
        </button>

        <button
          type="submit"
          disabled={
            isLoading ||
            !formData.department ||
            !formData.password ||
            !formData.confirmPassword ||
            !formData.agreeToTerms ||
            formData.password !== formData.confirmPassword
          }
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Creating Account...
            </div>
          ) : (
            "Create Account"
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Left Side - Brand & Features */}
      <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-gray-800 to-gray-900 p-12 flex-col justify-between">
        <div className="flex items-center space-x-3">
          <Star className="w-8 h-8 text-yellow-400" />
          <h1 className="text-2xl font-extrabold tracking-widest uppercase">
            Light<span className="text-blue-400">Stars</span>
          </h1>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-4xl font-bold mb-4 gradient-text">
              Join LightStars Platform
            </h2>
            <p className="text-gray-300 text-lg">
              Register to access the centralized command center for data
              architects and cloud operations teams.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="flex items-center space-x-4 p-4 bg-gray-800/50 rounded-lg">
              <Zap className="w-6 h-6 text-blue-400" />
              <div>
                <h3 className="font-semibold">AI-Powered Analytics</h3>
                <p className="text-sm text-gray-400">
                  Real-time insights and automated optimization
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-gray-800/50 rounded-lg">
              <Users className="w-6 h-6 text-green-400" />
              <div>
                <h3 className="font-semibold">Team Collaboration</h3>
                <p className="text-sm text-gray-400">
                  Integrated communication and project management
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-gray-800/50 rounded-lg">
              <CheckCircle className="w-6 h-6 text-purple-400" />
              <div>
                <h3 className="font-semibold">Enterprise Security</h3>
                <p className="text-sm text-gray-400">
                  Bank-level security and compliance standards
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-sm text-gray-400">
          <p>
            Already have an account?{" "}
            <button className="text-blue-400 hover:text-blue-300 underline">
              Sign in here
            </button>
          </p>
        </div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <div className="flex items-center space-x-3">
              <Star className="w-8 h-8 text-yellow-400" />
              <h1 className="text-2xl font-extrabold tracking-widest uppercase">
                Light<span className="text-blue-400">Stars</span>
              </h1>
            </div>
          </div>

          <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700">
            {/* Progress Steps */}
            <div className="flex justify-between items-center mb-8">
              <div
                className={`flex items-center ${
                  step >= 1 ? "text-blue-400" : "text-gray-500"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                    step >= 1
                      ? "bg-blue-600 border-blue-600"
                      : "border-gray-500"
                  }`}
                >
                  {step > 1 ? <CheckCircle className="w-4 h-4" /> : "1"}
                </div>
                <span className="ml-2 text-sm font-medium">Personal</span>
              </div>

              <div className="flex-1 h-1 bg-gray-600 mx-4"></div>

              <div
                className={`flex items-center ${
                  step >= 2 ? "text-blue-400" : "text-gray-500"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                    step >= 2
                      ? "bg-blue-600 border-blue-600"
                      : "border-gray-500"
                  }`}
                >
                  2
                </div>
                <span className="ml-2 text-sm font-medium">
                  Work & Security
                </span>
              </div>
            </div>

            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">
                {step === 1 ? "Create Your Account" : "Work Information"}
              </h2>
              <p className="text-gray-400">
                {step === 1
                  ? "Enter your personal details to get started"
                  : "Complete your work profile and security settings"}
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              {step === 1 && renderStep1()}
              {step === 2 && renderStep2()}
            </form>

            {/* Mobile Footer */}
            <div className="lg:hidden text-center mt-6 pt-4 border-t border-gray-700">
              <p className="text-sm text-gray-400">
                Already have an account?{" "}
                <button className="text-blue-400 hover:text-blue-300 font-semibold transition">
                  Sign in
                </button>
              </p>
            </div>
          </div>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-blue-900/20 border border-blue-700 rounded-lg">
            <p className="text-sm text-blue-300 text-center">
              <strong>Enterprise Security:</strong> All data is encrypted and
              protected by enterprise-grade security measures.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
