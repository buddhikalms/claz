"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("STUDENT");
  const [subject, setSubject] = useState("");
  const [experience, setExperience] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Replace with your deployed API URL
  const API_URL = "http://localhost:3001";

  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    if (!email && !phone) {
      errors.email = "Please provide either an email or phone number";
      errors.phone = "Please provide either an email or phone number";
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Please enter a valid email address";
    }
    if (phone && !/^\+?[1-9]\d{1,14}$/.test(phone)) {
      errors.phone = "Please enter a valid phone number (e.g., +1234567890)";
    }
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    if (role === "TEACHER") {
      if (!subject) {
        errors.subject = "Subject is required";
      }
      if (!experience || isNaN(Number(experience)) || Number(experience) < 0) {
        errors.experience = "Please enter a valid number of years";
      }
      if (!coverImage || !/^https?:\/\/.+$/.test(coverImage)) {
        errors.coverImage = "Please enter a valid URL";
      }
      if (!profileImage || !/^https?:\/\/.+$/.test(profileImage)) {
        errors.profileImage = "Please enter a valid URL";
      }
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    const teacherDetails =
      role === "TEACHER"
        ? {
            subject,
            experience: Number(experience),
            coverImage,
            profileImage,
            bio: bio || "",
            qualifications: { degree: subject || "Sample Degree" },
            subjects: subject ? [subject] : [],
            allowedCountries: [],
            restrictedCountries: [],
          }
        : undefined;

    try {
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email || undefined,
          phone: phone || undefined,
          password,
          name: name || undefined,
          role,
          teacherDetails,
        }),
        credentials: "include", // Include credentials if needed (e.g., for cookies)
      });

      const data = await res.json();
      console.log("API response:", { status: res.status, data });

      if (!res.ok) {
        let errorMsg =
          data.error || `Registration failed (Status: ${res.status})`;
        if (res.status === 0) {
          errorMsg =
            "CORS error: Unable to reach the server. Please check if the API is running and CORS is configured correctly.";
        } else if (errorMsg === "User already exists") {
          errorMsg = "This email or phone number is already registered";
        } else if (errorMsg === "Teacher details are incomplete") {
          errorMsg = "Please provide all required teacher details";
        }
        setError(errorMsg);
        setLoading(false);
        return;
      }

      console.log("Registration successful:", data);
      router.push("/login");
    } catch (err: any) {
      console.error("Registration request error:", err);
      setError(
        err.message.includes("fetch")
          ? "Failed to connect to the server. Please check the API URL and CORS configuration."
          : `Registration error: ${err.message}`
      );
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Register
        </h1>
        {error && (
          <p className="text-red-500 mb-4 text-center" role="alert">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name (optional)
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`mt-1 w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                fieldErrors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your name"
              aria-label="Name"
            />
            {fieldErrors.name && (
              <p className="mt-1 text-xs text-red-500">{fieldErrors.name}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email (optional)
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`mt-1 w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                fieldErrors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your email"
              aria-label="Email"
            />
            <p className="mt-1 text-xs text-gray-500">
              Provide either email or phone number
            </p>
            {fieldErrors.email && (
              <p className="mt-1 text-xs text-red-500">{fieldErrors.email}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone (optional)
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={`mt-1 w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                fieldErrors.phone ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your phone number (e.g., +1234567890)"
              aria-label="Phone number"
            />
            <p className="mt-1 text-xs text-gray-500">
              Provide either email or phone number
            </p>
            {fieldErrors.phone && (
              <p className="mt-1 text-xs text-red-500">{fieldErrors.phone}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`mt-1 w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                fieldErrors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your password"
              required
              aria-label="Password"
            />
            <p className="mt-1 text-xs text-gray-500">Minimum 6 characters</p>
            {fieldErrors.password && (
              <p className="mt-1 text-xs text-red-500">
                {fieldErrors.password}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`mt-1 w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                fieldErrors.confirmPassword
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="Confirm your password"
              required
              aria-label="Confirm password"
            />
            {fieldErrors.confirmPassword && (
              <p className="mt-1 text-xs text-red-500">
                {fieldErrors.confirmPassword}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              aria-label="Role"
            >
              <option value="STUDENT">Student</option>
              <option value="TEACHER">Teacher</option>
            </select>
          </div>
          {role === "TEACHER" && (
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className={`mt-1 w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    fieldErrors.subject ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter subject (e.g., Mathematics)"
                  required
                  aria-label="Subject"
                />
                {fieldErrors.subject && (
                  <p className="mt-1 text-xs text-red-500">
                    {fieldErrors.subject}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="experience"
                  className="block text-sm font-medium text-gray-700"
                >
                  Experience (years)
                </label>
                <input
                  id="experience"
                  type="number"
                  min="0"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className={`mt-1 w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    fieldErrors.experience
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="Enter years of experience"
                  required
                  aria-label="Experience"
                />
                {fieldErrors.experience && (
                  <p className="mt-1 text-xs text-red-500">
                    {fieldErrors.experience}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="coverImage"
                  className="block text-sm font-medium text-gray-700"
                >
                  Cover Image URL
                </label>
                <input
                  id="coverImage"
                  type="url"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  className={`mt-1 w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    fieldErrors.coverImage
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="Enter cover image URL (e.g., https://example.com/cover.jpg)"
                  required
                  aria-label="Cover image URL"
                />
                {fieldErrors.coverImage && (
                  <p className="mt-1 text-xs text-red-500">
                    {fieldErrors.coverImage}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="profileImage"
                  className="block text-sm font-medium text-gray-700"
                >
                  Profile Image URL
                </label>
                <input
                  id="profileImage"
                  type="url"
                  value={profileImage}
                  onChange={(e) => setProfileImage(e.target.value)}
                  className={`mt-1 w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    fieldErrors.profileImage
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="Enter profile image URL (e.g., https://example.com/profile.jpg)"
                  required
                  aria-label="Profile image URL"
                />
                {fieldErrors.profileImage && (
                  <p className="mt-1 text-xs text-red-500">
                    {fieldErrors.profileImage}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="bio"
                  className="block text-sm font-medium text-gray-700"
                >
                  Bio (optional)
                </label>
                <textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your bio"
                  rows={4}
                  aria-label="Bio"
                />
              </div>
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
