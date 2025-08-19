"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function TeachersSection(props) {
  const { teachers } = props;
  const [visibleCount, setVisibleCount] = useState(4);
  const [userCountry, setUserCountry] = useState(null);
  const [filteredTeachers, setFilteredTeachers] = useState(teachers);
  const [loading, setLoading] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);

  // Fetch user's country using geolocation
  useEffect(() => {
    const fetchUserCountry = async () => {
      setLoading(true);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            try {
              const response = await fetch(
                `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
              );
              const data = await response.json();
              const countryCode = data.countryCode || null; // ISO 3166-1 alpha-2 code
              setUserCountry(countryCode);
              setPermissionGranted(true);
            } catch (error) {
              console.error("Error fetching country:", error);
              setUserCountry(null);
            } finally {
              setLoading(false);
            }
          },
          (error) => {
            console.error("Geolocation permission denied:", error);
            setUserCountry(null);
            setLoading(false);
          }
        );
      } else {
        console.error("Geolocation not supported");
        setUserCountry(null);
        setLoading(false);
      }
    };

    fetchUserCountry();
  }, []);

  // Filter teachers based on userCountry
  useEffect(() => {
    if (userCountry) {
      const filtered = teachers.filter((teacher) => {
        // Parse restrictedCountries (JSON field, e.g., ["CN", "RU"])
        const restrictedCountries = teacher.restrictedCountries
          ? JSON.parse(teacher.restrictedCountries)
          : [];
        // Only include teachers whose restrictedCountries do not include userCountry
        return !restrictedCountries.includes(userCountry);
      });
      setFilteredTeachers(filtered);
    } else {
      // If userCountry is null (e.g., permission denied), show all teachers
      setFilteredTeachers(teachers);
    }
  }, [userCountry, teachers]);

  const handleLoadMore = () => {
    const newCount = visibleCount + 2;
    setVisibleCount(newCount);
    console.log("Loading more teachers...");
  };

  return (
    <section className="bg-emerald-50 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-12">
          Our Top Teachers
        </h2>
        {!permissionGranted && !userCountry && !loading && (
          <div className="text-center mb-8">
            <p className="text-lg text-slate-700">
              We need your location to show teachers available in your country.
              Would you like to share your location?
            </p>
            <button
              onClick={() =>
                navigator.geolocation.getCurrentPosition(
                  () => fetchUserCountry(), // Re-run fetch on manual permission
                  () => setUserCountry(null)
                )
              }
              className="mt-4 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200"
            >
              Share Location
            </button>
          </div>
        )}
        {loading && (
          <div className="text-center mb-8">
            <p className="text-lg text-slate-700">Fetching your location...</p>
          </div>
        )}
        {userCountry === null && !loading && permissionGranted && (
          <div className="text-center mb-8">
            <p className="text-lg text-red-600">
              Unable to detect your location. Showing all available teachers.
            </p>
          </div>
        )}
        {filteredTeachers.length === 0 && userCountry && !loading && (
          <div className="text-center mb-8">
            <p className="text-lg text-red-600">
              No teachers available for your country.
            </p>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-4 gap-8">
          {filteredTeachers.slice(0, visibleCount).map((teacher, index) => (
            <div
              key={teacher.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 overflow-hidden border border-slate-200 animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Cover Image */}
              <div className="relative h-40 bg-gradient-to-r from-emerald-500 to-amber-400">
                <Image
                  src={`/teachers/${teacher.coverImage}`}
                  width={140}
                  height={140}
                  alt={teacher.name}
                  className="w-full h-full object-cover"
                />
                {/* Profile Image */}
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                  <Image
                    src={`/teachers/${teacher.profileImage}`}
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
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-slate-800">
                    Available Courses
                  </h4>
                  {teacher.courses && teacher.courses.length > 0 ? (
                    <ul className="text-sm text-slate-700 list-none">
                      {teacher.courses.map((course, idx) => (
                        <li key={idx}>{course.name}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-slate-600">
                      No courses available
                    </p>
                  )}
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
        {visibleCount < filteredTeachers.length && (
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

  // Reusable function to fetch country (for manual retry)
  async function fetchUserCountry() {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );
            const data = await response.json();
            const countryCode = data.countryCode || null;
            setUserCountry(countryCode);
            setPermissionGranted(true);
          } catch (error) {
            console.error("Error fetching country:", error);
            setUserCountry(null);
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          console.error("Geolocation permission denied:", error);
          setUserCountry(null);
          setLoading(false);
        }
      );
    } else {
      console.error("Geolocation not supported");
      setUserCountry(null);
      setLoading(false);
    }
  }
}
