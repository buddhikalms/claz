"use client";
import { useRef } from "react";
import html2canvas from "html2canvas";
import QRCode from "react-qr-code";
import { FaPhone, FaEnvelope, FaGlobe, FaMapMarkerAlt } from "react-icons/fa";

export default function DownloadBusinessCard() {
  const hiddenCardRef = useRef();

  const handleDownload = async () => {
    // Wait a bit for images/icons to render
    setTimeout(async () => {
      const canvas = await html2canvas(hiddenCardRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
      });
      const link = document.createElement("a");
      link.download = "teacher-business-card.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    }, 500);
  };

  return (
    <>
      {/* Hidden card: invisible but still rendered */}
      <div
        ref={hiddenCardRef}
        style={{
          width: "1011px",
          height: "638px",
          fontFamily: "Poppins, sans-serif",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          visibility: "hidden",
          pointerEvents: "none",
          zIndex: -1,
          display: "flex",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow:
            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Front side */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "40px",
            color: "white",
            background: "linear-gradient(135deg, #0f172a, #2563eb)",
            position: "relative",
          }}
        >
          <img
            src="https://i.pravatar.cc/160" // Use online image for testing
            alt="Teacher"
            style={{
              width: "160px",
              height: "160px",
              borderRadius: "50%",
              border: "4px solid white",
              boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
              objectFit: "cover",
              marginBottom: "20px",
            }}
          />

          <h2
            style={{
              fontSize: "2.5rem",
              fontWeight: "700",
              marginBottom: "8px",
            }}
          >
            Mrs. Jane Doe
          </h2>
          <p
            style={{ fontSize: "1.125rem", opacity: 0.9, marginBottom: "4px" }}
          >
            Senior Mathematics Teacher
          </p>
          <p style={{ opacity: 0.9, marginBottom: "20px" }}>
            Springfield High School
          </p>

          <div style={{ fontSize: "0.875rem", lineHeight: 1.5 }}>
            <p style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <FaPhone /> +1 (234) 567-890
            </p>
            <p style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <FaEnvelope /> jane.doe@school.edu
            </p>
            <p style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <FaGlobe /> www.janedoe.com
            </p>
            <p style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <FaMapMarkerAlt /> 123 Main Street, Springfield, USA
            </p>
          </div>

          <div
            style={{
              marginTop: "24px",
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              padding: "12px",
              borderRadius: "12px",
              fontStyle: "italic",
              fontSize: "0.875rem",
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            }}
          >
            Dedicated to empowering young minds through mathematics and lifelong
            learning.
          </div>
        </div>

        {/* Back side */}
        <div
          style={{
            flex: 1,
            background: "linear-gradient(135deg, #f97316, #f59e0b)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "40px",
            color: "white",
            textAlign: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "16px",
              borderRadius: "12px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
            }}
          >
            <QRCode value="https://example.com/jane-doe" size={150} />
          </div>

          <p
            style={{
              marginTop: "24px",
              fontSize: "1.25rem",
              fontWeight: "600",
              fontStyle: "italic",
              color: "white",
            }}
          >
            "Inspiring young minds every day"
          </p>

          <div
            style={{
              marginTop: "24px",
              backgroundColor: "rgba(0, 0, 0, 0.2)",
              padding: "12px",
              borderRadius: "12px",
              fontSize: "0.875rem",
            }}
          >
            Scan the QR code to view my portfolio, lesson plans, and contact
            details.
          </div>
        </div>
      </div>

      {/* Download Button */}
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f3f4f6",
        }}
      >
        <button
          onClick={handleDownload}
          style={{
            background: "linear-gradient(135deg, #ec4899, #ef4444)",
            color: "white",
            padding: "12px 24px",
            borderRadius: "12px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            fontWeight: "700",
            fontSize: "16px",
            cursor: "pointer",
            border: "none",
          }}
        >
          Download Business Card
        </button>
      </div>
    </>
  );
}
