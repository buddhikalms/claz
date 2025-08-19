"use client";
export default function Footer() {
  const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/teachers", label: "Teachers" },
    { href: "/courses", label: "Courses" },
    { href: "/contact", label: "Contact" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
  ];

  return (
    <footer className="bg-gradient-to-r from-slate-900 to-emerald-900 py-12 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <h3 className="text-lg font-semibold text-slate-200 mb-4">
              About LMS Platform
            </h3>
            <p className="text-slate-300 text-sm">
              Empowering education through expert-led courses and personalized
              learning experiences. Connect with top teachers and master new
              skills today.
            </p>
          </div>

          {/* Quick Links */}
          <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <h3 className="text-lg font-semibold text-slate-200 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-slate-300 hover:text-amber-400 text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <h3 className="text-lg font-semibold text-slate-200 mb-4">
              Contact Us
            </h3>
            <p className="text-slate-300 text-sm mb-2">
              Email: support@lmsplatform.com
            </p>
            <p className="text-slate-300 text-sm mb-2">Phone: (123) 456-7890</p>
            <div className="flex space-x-4 mt-4">
              <a
                href="https://twitter.com"
                className="text-slate-300 hover:text-amber-400 transition-colors duration-200"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                className="text-slate-300 hover:text-amber-400 transition-colors duration-200"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                className="text-slate-300 hover:text-amber-400 transition-colors duration-200"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.024-3.037-1.85-3.037-1.852 0-2.136 1.447-2.136 2.941v5.665H9.352V9.747h3.415v1.561h.048c.476-.898 1.637-1.85 3.367-1.85 3.604 0 4.267 2.37 4.267 5.455v6.539zM5.337 8.186c-1.144 0-2.066-.932-2.066-2.081 0-1.148.922-2.081 2.066-2.081 1.143 0 2.066.933 2.066 2.081 0 1.149-.923 2.081-2.066 2.081zm1.777 12.266H3.56V9.747h3.554v10.705zM22.225 0H1.771C.792 0 0 .792 0 1.771v20.458C0 23.208.792 24 1.771 24h20.454c.979 0 1.771-.792 1.771-1.771V1.771C24 .792 23.208 0 22.225 0z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-slate-800 text-center">
          <p className="text-sm text-slate-300">
            © {new Date().getFullYear()} LMS Platform. All rights reserved.
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(10px);
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
    </footer>
  );
}
