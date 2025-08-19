"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeCanvas } from "qrcode.react";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";

// Animation variants for smoother transitions
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const tabContentVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function TeacherProfile({ details }) {
  const [activeTab, setActiveTab] = useState("details");
  const [message, setMessage] = useState("");
  const [booking, setBooking] = useState({
    date: "",
    time: "",
    sessionType: "",
  });
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [quickRating, setQuickRating] = useState(0);
  const qrRef = useRef(null);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      console.log("Sending message:", message);
      alert(`Message sent: ${message}`);
      setMessage("");
    } else {
      alert("Please enter a message.");
    }
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (reviewRating > 0 && reviewText.trim()) {
      console.log("Submitting review:", {
        rating: reviewRating,
        comment: reviewText,
      });
      alert(`Review submitted: ${reviewRating} stars - ${reviewText}`);
      setReviewText("");
      setReviewRating(0);
    } else {
      alert("Please provide a rating and comment.");
    }
  };

  const handleQuickReviewSubmit = (e) => {
    e.preventDefault();
    if (quickRating > 0) {
      console.log("Submitting quick review:", { rating: quickRating });
      alert(`Quick rating submitted: ${quickRating} stars`);
      setQuickRating(0);
    } else {
      alert("Please select a rating.");
    }
  };

  const handleBookSession = (e) => {
    e.preventDefault();
    if (booking.date && booking.time && booking.sessionType) {
      console.log("Booking:", booking);
      alert(
        `Booking confirmed: ${booking.sessionType} on ${booking.date} at ${booking.time}`
      );
      setBooking({ date: "", time: "", sessionType: "" });
    } else {
      alert("Please fill in all booking details.");
    }
  };

  const handleEnroll = (course) => {
    console.log("Enrolling in:", course.title);
    alert(`Enrolling in ${course.title}`);
  };

  const handleQRDownload = () => {
    if (qrRef.current) {
      const canvas = qrRef.current.querySelector("canvas");
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `${(details.name || "teacher").replace(
        /\s+/g,
        "_"
      )}_profile_qr.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Define days
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // Parse schedules JSON
  const schedules =
    typeof details.schedules === "string"
      ? JSON.parse(details.schedules)
      : details.schedules || [];

  // Generate dynamic time slots
  const dynamicTimeSlots = Array.from(
    new Set(
      schedules
        .flatMap((slot) => [slot.startTime, slot.endTime])
        .filter(Boolean)
    )
  ).sort();

  // Generate weeklyTimetable
  const weeklyTimetable = days.reduce((acc, day) => {
    acc[day] = { scheduled: [], available: [] };
    return acc;
  }, {});

  try {
    schedules.forEach((slot) => {
      if (!slot.day || !days.includes(slot.day)) return;
      const target = slot.type === "AVAILABLE" ? "available" : "scheduled";
      weeklyTimetable[slot.day][target].push({
        start: slot.startTime,
        end: slot.endTime,
        courseId: slot.courseId || null,
      });
    });
  } catch (error) {
    console.error("Error parsing schedules:", error);
  }

  // Attach to details
  details.weeklyTimetable = weeklyTimetable;

  // Generate availableTimes for booking form
  const availableTimes = Object.entries(weeklyTimetable).flatMap(
    ([day, { available }]) =>
      available.map((slot) => ({
        day,
        time: `${slot.start} - ${slot.end}`,
      }))
  );

  const tabs = [
    { id: "details", label: "Teacher Details" },
    { id: "courses", label: "Courses" },
    { id: "timetable", label: "Timetable" },
    { id: "booking", label: "Book Appointment" },
    { id: "reviews", label: "Reviews" },
    { id: "contact", label: "Contact" },
  ];

  const qualifications =
    typeof details.qualifications === "string"
      ? JSON.parse(details.qualifications)
      : details.qualifications || [];
  const subjects =
    typeof details.subjects === "string"
      ? JSON.parse(details.subjects)
      : details.subjects || [];

  // Calculate average rating from reviews
  const averageRating =
    details.reviews?.length > 0
      ? details.reviews.reduce((sum, review) => sum + review.rating, 0) /
        details.reviews.length
      : 0;

  // QR code URL with fallback
  const qrCodeUrl =
    typeof window !== "undefined"
      ? window.location.href
      : `http://localhost:3001/teacher/${details.slug || "default"}`;

  // Social media links
  const socialLinks = details.socialLinks || {
    linkedin: "",
    twitter: "",
    github: "",
  };

  return (
    <motion.div
      className="bg-gradient-to-b from-gray-50 to-teal-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div
          className="relative rounded-3xl overflow-hidden shadow-2xl mb-12 bg-white"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="relative h-32 sm:h-48 lg:h-64">
            {details.coverImage ? (
              <Image
                src={`http://localhost:3001${details.coverImage}`}
                layout="fill"
                objectFit="cover"
                alt={details.name || "Teacher"}
                className="rounded-t-3xl"
                priority
              />
            ) : (
              <div className="w-full h-full bg-gray-200 rounded-t-3xl" />
            )}
            <div className="absolute inset-0 bg-gradient-to-br from-teal-600/60 to-amber-500/60" />
          </div>
          <div className="absolute top-16 sm:top-24 lg:top-36 left-1/2 lg:left-12 transform -translate-x-1/2 lg:translate-x-0">
            {details.profileImage ? (
              <Image
                src={`http://localhost:3001${details.profileImage}`}
                width={120}
                height={120}
                alt={details.name || "Teacher"}
                className="w-30 h-30 rounded-full border-4 border-white shadow-lg object-cover"
              />
            ) : (
              <div className="w-30 h-30 rounded-full bg-gray-300 border-4 border-white shadow-lg" />
            )}
          </div>
          <div className="pt-20 sm:pt-24 pb-8 px-6 sm:px-12 lg:flex lg:justify-between lg:items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-3">
                {details.name || "Unknown Teacher"}
              </h1>
              <p className="text-md font-medium text-teal-700 mb-4">
                {details.subject || "N/A"}
              </p>
              <div className="flex justify-center lg:justify-start items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(averageRating)
                        ? "text-amber-400"
                        : i < Math.ceil(averageRating) &&
                          averageRating % 1 >= 0.5
                        ? "text-amber-400 half-star"
                        : "text-gray-200"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
                <span className="ml-2 text-sm text-gray-600 font-medium">
                  {averageRating.toFixed(1)} ({details.reviews?.length || 0}{" "}
                  reviews)
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 items-center lg:items-end">
              {qrCodeUrl && (
                <div
                  className="bg-white p-3 rounded-lg shadow-md cursor-pointer"
                  ref={qrRef}
                  onClick={handleQRDownload}
                >
                  <QRCodeCanvas value={qrCodeUrl} size={100} />
                  <p className="text-xs text-gray-600 mt-2 text-center">
                    Click to download QR
                  </p>
                </div>
              )}
              <motion.a
                href={`/teacher/${details.cvFile || "cv.pdf"}`}
                download
                className="px-5 py-2 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 transition-all duration-300 shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Download CV
              </motion.a>
              <div className="flex gap-3 items-center">
                {socialLinks.linkedin && (
                  <motion.a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-teal-600 transition-colors duration-300"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaLinkedin className="w-6 h-6" />
                  </motion.a>
                )}
                {socialLinks.twitter && (
                  <motion.a
                    href={socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-teal-600 transition-colors duration-300"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaTwitter className="w-6 h-6" />
                  </motion.a>
                )}
                {socialLinks.github && (
                  <motion.a
                    href={socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-teal-600 transition-colors duration-300"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaGithub className="w-6 h-6" />
                  </motion.a>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs Navigation */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="flex border-b-2 border-gray-200 overflow-x-auto">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 text-sm md:text-base font-semibold relative transition-colors duration-300 ${
                  activeTab === tab.id
                    ? "text-teal-600"
                    : "text-gray-600 hover:text-teal-500"
                }`}
                whileHover={{ y: -2 }}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600"
                    layoutId="underline"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={tabContentVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="bg-white rounded-3xl shadow-xl p-8"
          >
            {activeTab === "details" && (
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  About {details.name || "Unknown Teacher"}
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {details.bio || "No bio available."}
                </p>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Qualifications
                </h3>
                <ul className="list-disc list-inside text-gray-600 mb-6">
                  {qualifications.length > 0 ? (
                    qualifications.map((qual, index) => (
                      <li key={index} className="mb-2">
                        {qual}
                      </li>
                    ))
                  ) : (
                    <li>No qualifications listed.</li>
                  )}
                </ul>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Subjects Taught
                </h3>
                <div className="flex flex-wrap gap-3">
                  {subjects.length > 0 ? (
                    subjects.map((subject, index) => (
                      <span
                        key={index}
                        className="px-4 py-1.5 bg-teal-100 text-teal-700 rounded-full text-sm font-medium"
                      >
                        {subject}
                      </span>
                    ))
                  ) : (
                    <span className="px-4 py-1.5 bg-teal-100 text-teal-700 rounded-full text-sm font-medium">
                      No subjects listed
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Rest of the tabs remain unchanged */}
            {activeTab === "courses" && (
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Courses Taught
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {(details.courses || []).map((course) => (
                    <motion.div
                      key={course.id}
                      className="bg-teal-50 rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="relative h-48">
                        {course.image ? (
                          <Image
                            src={`http://localhost:3001${course.image}`}
                            layout="fill"
                            objectFit="cover"
                            alt={course.title || "Course"}
                            className="rounded-t-xl"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 rounded-t-xl" />
                        )}
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">
                          {course.title || "Untitled Course"}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          Duration: {course.duration || "N/A"}
                        </p>
                        <p className="text-sm text-gray-600 mb-2">
                          Level: {course.level || "N/A"}
                        </p>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {course.description || "No description available."}
                        </p>
                        <p className="text-sm font-medium text-teal-600 mb-3">
                          Price: $
                          {course.price ? course.price.toFixed(2) : "N/A"}
                        </p>
                        <p
                          className={`text-sm font-medium ${
                            course.enrollmentStatus === "Open"
                              ? "text-teal-600"
                              : "text-gray-600"
                          } mb-4`}
                        >
                          Status: {course.enrollmentStatus || "N/A"}
                        </p>
                        <div className="flex gap-3">
                          <motion.button
                            onClick={() => handleEnroll(course)}
                            disabled={course.enrollmentStatus !== "Open"}
                            className={`px-4 py-2 rounded-lg text-white font-semibold text-sm ${
                              course.enrollmentStatus === "Open"
                                ? "bg-teal-600 hover:bg-teal-700"
                                : "bg-gray-400 cursor-not-allowed"
                            } transition-all duration-300`}
                            whileHover={{
                              scale:
                                course.enrollmentStatus === "Open" ? 1.05 : 1,
                            }}
                            whileTap={{
                              scale:
                                course.enrollmentStatus === "Open" ? 0.95 : 1,
                            }}
                          >
                            Enroll Now
                          </motion.button>
                          <Link
                            href={`/course/${course.id}`}
                            className="px-4 py-2 text-teal-600 hover:text-teal-700 text-sm font-semibold transition-colors duration-300"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "timetable" && (
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Weekly Timetable
                </h2>
                {dynamicTimeSlots.length === 0 ? (
                  <p className="text-gray-600 text-center">
                    No schedule available.
                  </p>
                ) : (
                  <div className="overflow-x-auto">
                    <div className="grid grid-cols-[120px_repeat(7,1fr)] gap-px bg-gray-200 rounded-xl p-px">
                      <div className="p-4 font-semibold text-gray-800 bg-white rounded-tl-xl">
                        Time
                      </div>
                      {days.map((day) => (
                        <div
                          key={day}
                          className="p-4 font-semibold text-gray-800 text-center bg-white"
                        >
                          {day.slice(0, 3)}
                        </div>
                      ))}
                      {dynamicTimeSlots.map((time) => (
                        <div key={time} className="contents">
                          <div className="p-4 text-gray-700 font-medium bg-white border-t border-gray-200">
                            {time}
                          </div>
                          {days.map((day) => {
                            const slot =
                              weeklyTimetable[day]?.scheduled?.find(
                                (s) => s.start === time
                              ) ||
                              weeklyTimetable[day]?.available?.find(
                                (s) => s.start === time
                              );
                            if (slot) {
                              const isScheduled =
                                weeklyTimetable[day].scheduled.includes(slot);
                              const course = isScheduled
                                ? details.courses.find(
                                    (c) => c.id === slot.courseId
                                  )
                                : null;
                              return (
                                <motion.div
                                  key={`${day}-${time}`}
                                  className={`relative p-3 text-center rounded-lg m-1 transition-colors duration-200 cursor-pointer ${
                                    isScheduled
                                      ? "bg-teal-600 text-white hover:bg-teal-700"
                                      : "bg-amber-100 text-amber-800 hover:bg-amber-200"
                                  }`}
                                  title={`${
                                    isScheduled
                                      ? course?.title || "Unknown Course"
                                      : "Available"
                                  } (${slot.start} - ${slot.end})`}
                                  onClick={() =>
                                    !isScheduled &&
                                    setBooking({
                                      ...booking,
                                      date: day,
                                      time: slot.start,
                                    })
                                  }
                                  whileHover={{ scale: isScheduled ? 1 : 1.05 }}
                                  whileTap={{ scale: isScheduled ? 1 : 0.95 }}
                                >
                                  <span className="text-sm font-medium">
                                    {isScheduled
                                      ? course?.title || "Unknown"
                                      : "Available"}
                                  </span>
                                </motion.div>
                              );
                            }
                            return (
                              <div
                                key={`${day}-${time}`}
                                className="p-3 bg-gray-100 m-1 rounded-lg"
                              ></div>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "booking" && (
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Book an Appointment
                </h2>
                <form onSubmit={handleBookSession} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label
                        htmlFor="date"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Select Date
                      </label>
                      <input
                        id="date"
                        type="date"
                        value={booking.date}
                        onChange={(e) =>
                          setBooking({ ...booking, date: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="time"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Select Time
                      </label>
                      <select
                        id="time"
                        value={booking.time}
                        onChange={(e) =>
                          setBooking({ ...booking, time: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
                      >
                        <option value="">Choose Time</option>
                        {availableTimes.map(({ day, time }, index) => (
                          <option key={`${day}-${time}-${index}`} value={time}>
                            {`${day}, ${time}`}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="sessionType"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Session Type
                      </label>
                      <select
                        id="sessionType"
                        value={booking.sessionType}
                        onChange={(e) =>
                          setBooking({
                            ...booking,
                            sessionType: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
                      >
                        <option value="">Choose Session</option>
                        <option value="30-min">30 Minutes</option>
                        <option value="1-hour">1 Hour</option>
                        <option value="90-min">90 Minutes</option>
                      </select>
                    </div>
                  </div>
                  <motion.button
                    type="submit"
                    className="px-6 py-2.5 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-all duration-300 shadow-md"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Confirm Booking
                  </motion.button>
                </form>
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Reviews
                </h2>
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Submit a Review
                  </h3>
                  <form onSubmit={handleReviewSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Rating
                      </label>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <motion.button
                            key={i}
                            type="button"
                            onClick={() => setReviewRating(i + 1)}
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              reviewRating > i
                                ? "bg-amber-400 text-white"
                                : "bg-gray-200 text-gray-600"
                            } hover:bg-amber-500 transition-colors duration-200`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            {i + 1}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="reviewText"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Comment
                      </label>
                      <textarea
                        id="reviewText"
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder="Share your experience..."
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
                        rows="4"
                      />
                    </div>
                    <motion.button
                      type="submit"
                      className="px-6 py-2.5 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-all duration-300 shadow-md"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Submit Review
                    </motion.button>
                  </form>
                </div>
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Quick Rating
                  </h3>
                  <form
                    onSubmit={handleQuickReviewSubmit}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Rate {details.name || "Teacher"}
                      </label>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <motion.button
                            key={i}
                            type="button"
                            onClick={() => setQuickRating(i + 1)}
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              quickRating > i
                                ? "bg-amber-400 text-white"
                                : "bg-gray-200 text-gray-600"
                            } hover:bg-amber-500 transition-colors duration-200`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            {i + 1}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                    <motion.button
                      type="submit"
                      className="px-6 py-2.5 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-all duration-300 shadow-md"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Submit Quick Rating
                    </motion.button>
                  </form>
                </div>
                {(details.reviews || []).length > 0 ? (
                  <div className="space-y-6">
                    {details.reviews.map((review) => (
                      <motion.div
                        key={review.id}
                        className="border-b border-gray-200 pb-6"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex items-center mb-3">
                          <span className="font-semibold text-gray-800">
                            {review.user || "Anonymous"}
                          </span>
                          <div className="flex ml-3">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-5 h-5 ${
                                  i < Math.round(review.rating)
                                    ? "text-amber-400"
                                    : "text-gray-200"
                                }`}
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                              </svg>
                            ))}
                          </div>
                          <span className="ml-2 text-sm text-gray-600">
                            {review.rating ? review.rating.toFixed(1) : "N/A"}
                          </span>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                          {review.comment || "No comment provided."}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No reviews yet.</p>
                )}
              </div>
            )}

            {activeTab === "contact" && (
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Contact {details.name || "Teacher"}
                </h2>
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Ask a question or share your interest..."
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
                      rows="5"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    className="px-6 py-2.5 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-all duration-300 shadow-md"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Send Message
                  </motion.button>
                </form>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      <style jsx>{`
        .half-star {
          position: relative;
          overflow: hidden;
        }
        .half-star::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 50%;
          height: 100%;
          background: linear-gradient(to right, #fbbf24 50%, #e5e7eb 50%);
        }
      `}</style>
    </motion.div>
  );
}
