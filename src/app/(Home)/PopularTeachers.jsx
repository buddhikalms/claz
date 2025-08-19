"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function TeachersSection(props) {
  const teachers = props.teachers;
  const [visibleCount, setVisibleCount] = useState(4);

  const handleLoadMore = () => {
    const newCount = visibleCount + 2;
    setVisibleCount(newCount);
    // In production, fetch more teachers from API if pagination is supported
    console.log("Loading more teachers...");
  };

  console.log(teachers);

  return (
    <section className="bg-emerald-50 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-12">
          Our Top Teachers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-4 gap-8">
          {teachers.slice(0, visibleCount).map((teacher, index) => (
            <div
              key={teacher.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 overflow-hidden border border-slate-200 animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Cover Image */}
              <div className="relative h-40 bg-gradient-to-r from-emerald-500 to-amber-400">
                <Image
                  src={`http://localhost:3001${teacher.coverImage}`}
                  width={140}
                  height={140}
                  alt={teacher.name}
                  className="w-full h-full object-cover"
                />

                {/* Profile Image */}
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                  <Image
                    src={`http://localhost:3001${teacher.profileImage}`}
                    width={140}
                    height={140}
                    alt={teacher.name}
                    className="w-24 h-24 rounded-full border-4 border-white object-cover"
                  />
                </div>
              </div>
              <div className="pt-16 p-6 text-center">
                <h3 className="text-xl font-semibold text-slate-800 mb-2">
                  {teacher.name}
                </h3>
                <p className="text-sm text-emerald-600 font-medium mb-1">
                  {teacher.subject}
                </p>
                <p className="text-sm text-slate-700 mb-3">
                  {teacher.experience} Level
                </p>
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.round(teacher.rating)
                          ? "text-amber-400"
                          : "text-slate-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-sm text-slate-600">
                    {teacher.rating.toFixed(1)}
                  </span>
                </div>
                <a
                  href={`/teacher/${teacher.slug}`}
                  className="inline-block px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 hover:scale-105 transition-transform duration-200"
                >
                  View Profile
                </a>
              </div>
            </div>
          ))}
        </div>
        {visibleCount < teachers.length && (
          <div className="mt-12 text-center">
            <button
              onClick={handleLoadMore}
              className="px-8 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 hover:scale-105 transition-transform duration-200 text-lg font-medium"
            >
              Load More Teachers
            </button>
          </div>
        )}
      </div>
      <style jsx>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
