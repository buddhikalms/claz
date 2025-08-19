"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [identifierType, setIdentifierType] = useState("email");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Client-side validation
    if (!identifier) {
      setError(`Please provide an ${identifierType}`);
      setLoading(false);
      return;
    }
    if (!password) {
      setError("Password is required");
      setLoading(false);
      return;
    }
    if (
      identifierType === "email" &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier)
    ) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }
    if (identifierType === "phone" && !/^\+?[1-9]\d{1,14}$/.test(identifier)) {
      setError("Please enter a valid phone number");
      setLoading(false);
      return;
    }

    console.log("Sending login request:", { identifier, password });

    try {
      const res = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier,
          password,
        }),
      });

      const data = await res.json();
      console.log("API response:", { status: res.status, data });

      if (!res.ok) {
        setError(data.error || `Login failed with status ${res.status}`);
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      console.log("Login successful, token:", data.token);
      router.push("/dashboard");
    } catch (err: any) {
      console.error("Login request error:", err.message);
      setError(
        "Failed to connect to the server. Please check if the server is running."
      );
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Login
        </h1>
        {error && (
          <p className="text-red-500 mb-4 text-center" role="alert">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div>
            <label
              htmlFor="identifierType"
              className="block text-sm font-medium text-gray-700"
            >
              Login with
            </label>
            <select
              id="identifierType"
              value={identifierType}
              onChange={(e) => {
                setIdentifierType(e.target.value);
                setIdentifier("");
              }}
              className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Login method"
            >
              <option value="email">Email</option>
              <option value="phone">Phone</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="identifier"
              className="block text-sm font-medium text-gray-700"
            >
              {identifierType === "email" ? "Email" : "Phone"}
            </label>
            <input
              id="identifier"
              type={identifierType === "email" ? "email" : "tel"}
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={`Enter your ${identifierType}`}
              required
              aria-label={identifierType === "email" ? "Email" : "Phone number"}
            />
            <p className="mt-1 text-xs text-gray-500">
              {identifierType === "email"
                ? "Enter a valid email address"
                : "Enter a valid phone number (e.g., +1234567890)"}
            </p>
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
              className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
              aria-label="Password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
