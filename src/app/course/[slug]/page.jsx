"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaChevronDown,
  FaLock,
  FaVideo,
  FaNotesMedical,
  FaQuestionCircle,
  FaFileVideo,
} from "react-icons/fa";

// Animation variants for smoother transitions
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const tabContentVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const accordionVariants = {
  hidden: { height: 0, opacity: 0, overflow: "hidden" },
  visible: {
    height: "auto",
    opacity: 1,
    transition: {
      height: { type: "spring", stiffness: 300, damping: 25, duration: 0.5 },
      opacity: { duration: 0.4, ease: "easeOut" },
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.1, duration: 0.3, ease: "easeOut" },
  },
};

export default function CoursePage() {
  const [activeTab, setActiveTab] = useState("details");
  const [message, setMessage] = useState("");
  const [booking, setBooking] = useState({
    date: "",
    time: "",
    sessionType: "",
  });
  const [openAccordion, setOpenAccordion] = useState(null);

  // Dummy course data with restructured lesson types
  const courseDetails = {
    id: "course101",
    title: "Introduction to Python Programming",
    teacher: "Dr. Jane Smith",
    description:
      "Master Python programming with interactive Zoom classes, comprehensive notes, quizzes, and live recordings. Ideal for beginners and intermediate learners.",
    image: "/courses/python-course.jpg",
    duration: "8 weeks",
    level: "Beginner to Intermediate",
    price: 199.99,
    enrollmentStatus: "Open",
    subjects: ["Python", "Programming", "Data Science"],
    lessons: [
      {
        title: "Python Fundamentals",
        duration: "2 hours",
        price: 0,
        purchased: true,
        types: [
          {
            type: "Live Meeting",
            items: [
              {
                title: "Live Zoom Lecture",
                price: 0,
                icon: <FaVideo className="text-teal-600" />,
              },
              {
                title: "Interactive Coding Session",
                price: 0,
                icon: <FaVideo className="text-teal-600" />,
              },
              {
                title: "Q&A Session",
                price: 0,
                icon: <FaVideo className="text-teal-600" />,
              },
            ],
          },
        ],
      },
      {
        title: "Python Data Structures",
        duration: "Self-paced",
        price: 29.99,
        purchased: false,
        types: [
          {
            type: "Notes",
            items: [
              {
                title: "PDF Notes",
                price: 15.99,
                icon: <FaNotesMedical className="text-amber-600" />,
              },
              {
                title: "Code Snippets",
                price: 9.99,
                icon: <FaNotesMedical className="text-amber-600" />,
              },
              {
                title: "Reference Material",
                price: 4.99,
                icon: <FaNotesMedical className="text-amber-600" />,
              },
            ],
          },
        ],
      },
      {
        title: "Python Basics Assessment",
        duration: "1 hour",
        price: 19.99,
        purchased: false,
        types: [
          {
            type: "Quiz",
            items: [
              {
                title: "Multiple-Choice Quiz",
                price: 9.99,
                icon: <FaQuestionCircle className="text-blue-600" />,
              },
              {
                title: "Instant Feedback",
                price: 5.99,
                icon: <FaQuestionCircle className="text-blue-600" />,
              },
              {
                title: "Certificate",
                price: 4.99,
                icon: <FaQuestionCircle className="text-blue-600" />,
              },
            ],
          },
        ],
      },
      {
        title: "Advanced Python Workshop",
        duration: "3 hours",
        price: 49.99,
        purchased: false,
        types: [
          {
            type: "Recording",
            items: [
              {
                title: "Recorded Zoom Session",
                price: 29.99,
                icon: <FaFileVideo className="text-purple-600" />,
              },
              {
                title: "Project Demo",
                price: 15.99,
                icon: <FaFileVideo className="text-purple-600" />,
              },
              {
                title: "Downloadable Content",
                price: 4.99,
                icon: <FaFileVideo className="text-purple-600" />,
              },
            ],
          },
        ],
      },
    ],
    reviews: [
      {
        id: 1,
        user: "Alice Brown",
        rating: 4.5,
        comment: "The Zoom classes were super interactive!",
      },
      {
        id: 2,
        user: "Bob Johnson",
        rating: 5.0,
        comment: "Loved the detailed notes and quizzes!",
      },
    ],
  };

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

  const handleEnroll = () => {
    console.log("Enrolling in:", courseDetails.title);
    alert(`Enrolling in ${courseDetails.title}`);
  };

  const handlePurchaseLesson = (lesson) => {
    console.log("Purchasing lesson:", lesson.title);
    alert(`Purchasing ${lesson.title} for $${lesson.price.toFixed(2)}`);
  };

  const handlePurchaseItem = (lesson, item) => {
    console.log(`Purchasing item: ${item.title} from ${lesson.title}`);
    alert(`Purchasing ${item.title} for $${item.price.toFixed(2)}`);
  };

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const averageRating =
    courseDetails.reviews.length > 0
      ? courseDetails.reviews.reduce((sum, review) => sum + review.rating, 0) /
        courseDetails.reviews.length
      : 0;

  const tabs = [
    { id: "details", label: "Course Details" },
    { id: "content", label: "Course Content" },
    { id: "enroll", label: "Enroll" },
    { id: "reviews", label: "Reviews" },
    { id: "contact", label: "Contact" },
  ];

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
          <div className="relative h-48 sm:h-72 lg:h-96">
            <Image
              src={courseDetails.image}
              layout="fill"
              objectFit="cover"
              alt={courseDetails.title}
              className="rounded-t-3xl"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-br from-teal-600/60 to-amber-500/60" />
          </div>
          <div className="pt-8 pb-10 px-6 sm:px-12 lg:flex lg:justify-between lg:items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
                {courseDetails.title}
              </h1>
              <p className="text-lg font-medium text-teal-700 mb-4">
                Taught by {courseDetails.teacher}
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
                  {averageRating.toFixed(1)} ({courseDetails.reviews.length}{" "}
                  reviews)
                </span>
              </div>
            </div>
            <motion.button
              onClick={handleEnroll}
              disabled={courseDetails.enrollmentStatus !== "Open"}
              className={`px-8 py-3 rounded-xl text-white font-semibold text-lg shadow-lg transition-all duration-300 ${
                courseDetails.enrollmentStatus === "Open"
                  ? "bg-teal-600 hover:bg-teal-700 hover:shadow-xl"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              whileHover={{
                scale: courseDetails.enrollmentStatus === "Open" ? 1.05 : 1,
              }}
              whileTap={{
                scale: courseDetails.enrollmentStatus === "Open" ? 0.95 : 1,
              }}
            >
              Buy Now for ${courseDetails.price.toFixed(2)}
            </motion.button>
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
                  About the Course
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {courseDetails.description}
                </p>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Course Details
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600 mb-6">
                  <li className="flex items-center">
                    <span className="font-medium mr-2">Duration:</span>{" "}
                    {courseDetails.duration}
                  </li>
                  <li className="flex items-center">
                    <span className="font-medium mr-2">Level:</span>{" "}
                    {courseDetails.level}
                  </li>
                  <li className="flex items-center">
                    <span className="font-medium mr-2">Price:</span> $
                    {courseDetails.price.toFixed(2)}
                  </li>
                  <li className="flex items-center">
                    <span className="font-medium mr-2">Status:</span>{" "}
                    {courseDetails.enrollmentStatus}
                  </li>
                </ul>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Subjects Covered
                </h3>
                <div className="flex flex-wrap gap-3">
                  {courseDetails.subjects.map((subject, index) => (
                    <span
                      key={index}
                      className="px-4 py-1.5 bg-teal-100 text-teal-700 rounded-full text-sm font-medium"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "content" && (
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Course Content
                </h2>
                <div className="space-y-3">
                  {courseDetails.lessons.map((lesson, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 bg-white"
                    >
                      <button
                        onClick={() => toggleAccordion(index)}
                        className={`w-full flex items-center justify-between p-4 transition-colors duration-300 ${
                          lesson.purchased
                            ? "bg-teal-50 hover:bg-teal-100"
                            : "bg-white hover:bg-gray-50"
                        } rounded-lg focus:outline-none`}
                        disabled={!lesson.purchased}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-teal-600 font-semibold">
                            {index + 1}.
                          </span>
                          <div className="text-left">
                            <h3 className="text-base font-semibold text-gray-800">
                              {lesson.title}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {lesson.duration}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span
                            className={`text-xs font-medium px-3 py-1 rounded-full ${
                              lesson.price === 0
                                ? "bg-teal-100 text-teal-700"
                                : "bg-amber-100 text-amber-700"
                            }`}
                          >
                            {lesson.price === 0
                              ? "Free"
                              : `$${lesson.price.toFixed(2)}`}
                          </span>
                          {!lesson.purchased && (
                            <>
                              <FaLock className="text-gray-400 text-sm" />
                              <motion.button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handlePurchaseLesson(lesson);
                                }}
                                className="px-3 py-1 text-xs font-medium rounded-md bg-teal-600 text-white hover:bg-teal-700 transition-all duration-200"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                Buy
                              </motion.button>
                            </>
                          )}
                          <motion.div
                            animate={{
                              rotate: openAccordion === index ? 180 : 0,
                            }}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 25,
                            }}
                          >
                            <FaChevronDown className="text-gray-500 text-sm" />
                          </motion.div>
                        </div>
                      </button>
                      <AnimatePresence>
                        {openAccordion === index && (
                          <motion.div
                            variants={accordionVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            className="px-4 pb-4 pt-2 bg-gray-50 border-t border-gray-200 rounded-b-lg"
                          >
                            <div className="space-y-4">
                              {lesson.types.map((type, typeIndex) => (
                                <motion.div
                                  key={typeIndex}
                                  variants={itemVariants}
                                  initial="hidden"
                                  animate="visible"
                                  transition={{ delay: typeIndex * 0.1 }}
                                >
                                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                                    {type.type}
                                  </h4>
                                  <div className="space-y-2">
                                    {type.items.map((item, itemIndex) => (
                                      <div
                                        key={itemIndex}
                                        className="flex items-center justify-between p-3 bg-white rounded-md shadow-sm hover:bg-gray-100 transition-colors duration-200"
                                      >
                                        <div className="flex items-center space-x-3">
                                          <span className="text-base">
                                            {item.icon}
                                          </span>
                                          <div>
                                            <p className="text-sm font-medium text-gray-800">
                                              {item.title}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                              {item.price === 0
                                                ? "Free"
                                                : `$${item.price.toFixed(2)}`}
                                            </p>
                                          </div>
                                        </div>
                                        <motion.button
                                          onClick={() =>
                                            handlePurchaseItem(lesson, item)
                                          }
                                          disabled={
                                            lesson.purchased || item.price === 0
                                          }
                                          className={`px-3 py-1 text-xs font-medium rounded-md transition-all duration-200 ${
                                            lesson.purchased || item.price === 0
                                              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                              : "bg-teal-600 text-white hover:bg-teal-700"
                                          }`}
                                          whileHover={{
                                            scale:
                                              lesson.purchased ||
                                              item.price === 0
                                                ? 1
                                                : 1.05,
                                          }}
                                          whileTap={{
                                            scale:
                                              lesson.purchased ||
                                              item.price === 0
                                                ? 1
                                                : 0.95,
                                          }}
                                        >
                                          {lesson.purchased || item.price === 0
                                            ? "Included"
                                            : "Buy"}
                                        </motion.button>
                                      </div>
                                    ))}
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "enroll" && (
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Enroll in {courseDetails.title}
                </h2>
                <div className="mb-6">
                  <p className="text-gray-600 font-medium mb-2">
                    Price: ${courseDetails.price.toFixed(2)}
                  </p>
                  <p
                    className={`text-sm font-medium ${
                      courseDetails.enrollmentStatus === "Open"
                        ? "text-teal-600"
                        : "text-gray-600"
                    } mb-4`}
                  >
                    Status: {courseDetails.enrollmentStatus}
                  </p>
                  <motion.button
                    onClick={handleEnroll}
                    disabled={courseDetails.enrollmentStatus !== "Open"}
                    className={`px-6 py-2 rounded-lg text-white font-semibold ${
                      courseDetails.enrollmentStatus === "Open"
                        ? "bg-teal-600 hover:bg-teal-700"
                        : "bg-gray-400 cursor-not-allowed"
                    } transition-all duration-300 shadow-md`}
                    whileHover={{
                      scale:
                        courseDetails.enrollmentStatus === "Open" ? 1.05 : 1,
                    }}
                    whileTap={{
                      scale:
                        courseDetails.enrollmentStatus === "Open" ? 0.95 : 1,
                    }}
                  >
                    Enroll Now
                  </motion.button>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Book a Session
                </h3>
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
                        <option value="10:00-11:30">
                          Monday, 10:00 - 11:30
                        </option>
                        <option value="14:00-15:30">
                          Friday, 14:00 - 15:30
                        </option>
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
                {courseDetails.reviews.length > 0 ? (
                  <div className="space-y-6">
                    {courseDetails.reviews.map((review) => (
                      <div
                        key={review.id}
                        className="border-b border-gray-200 pb-6"
                      >
                        <div className="flex items-center mb-3">
                          <span className="font-semibold text-gray-800">
                            {review.user}
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
                            {review.rating.toFixed(1)}
                          </span>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                          {review.comment}
                        </p>
                      </div>
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
                  Contact Instructor
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
                      placeholder="Ask a question about the course..."
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
