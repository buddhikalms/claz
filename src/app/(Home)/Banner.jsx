"use client";
import { useState } from "react";

export default function Banner() {
  const [searchTerm, setSearchTerm] = useState("");
  const [subject, setSubject] = useState("");
  const [experience, setExperience] = useState("");
  const [availableNow, setAvailableNow] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() || subject || experience || availableNow) {
      console.log("Search filters:", {
        searchTerm,
        subject,
        experience,
        availableNow,
      });
      alert(
        `Searching with filters: ${JSON.stringify({
          searchTerm,
          subject,
          experience,
          availableNow,
        })}`
      );
    } else {
      alert("Please apply at least one filter.");
    }
  };

  return (
    <div className="relative bg-gradient-to-r from-emerald-500 to-amber-400 h-80 md:h-96 flex items-center justify-center text-center text-white overflow-hidden">
      {/* Animated SVG Background */}
      <div className="absolute inset-0 opacity-20">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="200"
            cy="200"
            r="20"
            fill="#ecfdf5"
            className="animate-float-up"
            style={{ animationDelay: "0s" }}
          />
          <circle
            cx="400"
            cy="250"
            r="15"
            fill="#facc15"
            className="animate-float-up"
            style={{ animationDelay: "1s" }}
          />
          <circle
            cx="1000"
            cy="180"
            r="25"
            fill="#ecfdf5"
            className="animate-float-up"
            style={{ animationDelay: "0.5s" }}
          />
          <circle
            cx="1200"
            cy="220"
            r="18"
            fill="#facc15"
            className="animate-float-up"
            style={{ animationDelay: "1.5s" }}
          />
          <path
            d="M0,160C120,120,240,200,360,180C480,160,600,120,720,140C840,160,960,200,1080,180C1200,160,1320,120,1440,140"
            stroke="#ffffff"
            strokeWidth="4"
            strokeOpacity="0.3"
            className="animate-wave"
          />
        </svg>
      </div>
      <div className="relative max-w-4xl px-6 z-10">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg animate-fade-in">
          Find Your Perfect Teacher!
        </h1>
        <form onSubmit={handleSearch} className="space-y-4 animate-slide-in">
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <input
              type="text"
              placeholder="Search by name or keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-3 rounded-full text-slate-900 bg-white/90 focus:outline-none focus:ring-4 focus:ring-amber-400/50 focus:shadow-lg w-full md:w-1/2"
            />
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="px-4 py-3 rounded-full text-slate-900 bg-white/90 focus:outline-none focus:ring-4 focus:ring-amber-400/50 focus:shadow-lg w-full md:w-1/4"
            >
              <option value="">Select Subject</option>
              <option value="memory">Memory Enhancement</option>
              <option value="math">Math</option>
              <option value="science">Science</option>
              <option value="programming">Programming</option>
              <option value="english">English</option>
            </select>
            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="px-4 py-3 rounded-full text-slate-900 bg-white/90 focus:outline-none focus:ring-4 focus:ring-amber-400/50 focus:shadow-lg w-full md:w-1/4"
            >
              <option value="">Select Experience</option>
              <option value="beginner">Beginner (0-2 years)</option>
              <option value="intermediate">Intermediate (2-5 years)</option>
              <option value="expert">Expert (5+ years)</option>
            </select>
          </div>
          <div className="flex items-center justify-center gap-4">
            <label className="flex items-center text-emerald-50">
              <input
                type="checkbox"
                checked={availableNow}
                onChange={(e) => setAvailableNow(e.target.checked)}
                className="mr-2 rounded text-amber-400 focus:ring-amber-400/50"
              />
              Available Now
            </label>
            <button
              type="submit"
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 hover:scale-105 text-white rounded-full flex items-center gap-2 transition-transform duration-200 bounce"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              Search
            </button>
          </div>
        </form>
        <p className="mt-4 text-lg text-emerald-50 animate-fade-in">
          Explore our expert teachers to start your learning journey today!
        </p>
      </div>
    </div>
  );
}
