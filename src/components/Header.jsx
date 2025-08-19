"use client";
import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/teachers", label: "Teachers" },
    { href: "/courses", label: "Courses" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="bg-emerald-900 shadow-md sticky top-0 z-50 animate-fade-in">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-slate-50 hover:text-emerald-600 transition-colors duration-200"
        >
          CLAZZ
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-slate-50 hover:text-emerald-600 font-medium transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
          {/* Auth Controls */}

          <button
            onClick={() => signIn("google")}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 hover:scale-105 transition-transform duration-200"
          >
            Sign In
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-slate-800 hover:text-emerald-600 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={
                isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-emerald-50 px-4 py-4 shadow-inner animate-fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-2 text-slate-800 hover:text-emerald-600 font-medium transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <button
            onClick={(window.location = "http://localhost:3001/auth")}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 hover:scale-105 transition-transform duration-200 mt-2"
          >
            Sign In
          </button>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </header>
  );
}
