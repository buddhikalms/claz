"use client";
import { useState, useRef } from "react";
import Head from "next/head";
import jsPDF from "jspdf";

export default function CVGenerator() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    education: [{ institution: "", degree: "", year: "" }],
    experience: [{ company: "", role: "", period: "", description: "" }],
    skills: [""],
    photo: null,
  });
  const fileInputRef = useRef(null);

  const handleInputChange = (e, index, section) => {
    const { name, value } = e.target;
    if (section) {
      const updatedSection = [...formData[section]];
      updatedSection[index][name] = value;
      setFormData({ ...formData, [section]: updatedSection });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    localStorage.setItem(
      "cvData",
      JSON.stringify({ ...formData, [name]: value })
    );
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData({ ...formData, photo: e.target.result });
        localStorage.setItem(
          "cvData",
          JSON.stringify({ ...formData, photo: e.target.result })
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const addSection = (section) => {
    if (section === "skills") {
      setFormData({ ...formData, skills: [...formData.skills, ""] });
    } else {
      setFormData({
        ...formData,
        [section]: [
          ...formData[section],
          section === "education"
            ? { institution: "", degree: "", year: "" }
            : { company: "", role: "", period: "", description: "" },
        ],
      });
    }
    localStorage.setItem("cvData", JSON.stringify(formData));
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFillColor(240, 240, 240);
    doc.rect(0, 0, 210, 297, "F");

    // Header
    doc.setFillColor(0, 51, 102);
    doc.rect(0, 0, 210, 40, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text(formData.name || "Your Name", 20, 25);

    // Photo
    if (formData.photo) {
      doc.addImage(formData.photo, "JPEG", 160, 10, 30, 30);
    }

    // Personal Info
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.text(`Email: ${formData.email || "email@example.com"}`, 20, 50);
    doc.text(`Phone: ${formData.phone || "+123 456 789"}`, 20, 60);
    doc.text(
      `Address: ${formData.address || "123 Street, City, Country"}`,
      20,
      70
    );

    // Education
    doc.setFontSize(16);
    doc.setTextColor(0, 51, 102);
    doc.text("Education", 20, 90);
    doc.setLineWidth(0.5);
    doc.setDrawColor(0, 51, 102);
    doc.line(20, 92, 190, 92);
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    let yPos = 100;
    formData.education.forEach((edu, index) => {
      doc.text(
        `${edu.degree || "Degree"} - ${edu.institution || "Institution"} (${
          edu.year || "Year"
        })`,
        20,
        yPos
      );
      yPos += 10;
    });

    // Experience
    doc.setFontSize(16);
    doc.setTextColor(0, 51, 102);
    doc.text("Experience", 20, yPos + 10);
    doc.line(20, yPos + 12, 190, yPos + 12);
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    yPos += 20;
    formData.experience.forEach((exp, index) => {
      doc.text(
        `${exp.role || "Role"} at ${exp.company || "Company"} (${
          exp.period || "Period"
        })`,
        20,
        yPos
      );
      doc.text(exp.description || "Description", 20, yPos + 5);
      yPos += 15;
    });

    // Skills
    doc.setFontSize(16);
    doc.setTextColor(0, 51, 102);
    doc.text("Skills", 20, yPos + 10);
    doc.line(20, yPos + 12, 190, yPos + 12);
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    yPos += 20;
    formData.skills.forEach((skill, index) => {
      doc.text(`- ${skill || "Skill"}`, 20, yPos);
      yPos += 10;
    });

    doc.save("cv.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Head>
        <title>European CV Generator</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-blue-900 mb-6">
          European CV Generator
        </h1>

        {/* Personal Information */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">
            Personal Information
          </h2>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full p-2 mb-2 border rounded"
            onChange={(e) => handleInputChange(e)}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-2 mb-2 border rounded"
            onChange={(e) => handleInputChange(e)}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            className="w-full p-2 mb-2 border rounded"
            onChange={(e) => handleInputChange(e)}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            className="w-full p-2 mb-2 border rounded"
            onChange={(e) => handleInputChange(e)}
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handlePhotoUpload}
            className="w-full p-2 mb-2 border rounded"
          />
        </div>

        {/* Education */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">
            Education
          </h2>
          {formData.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <input
                type="text"
                name="institution"
                placeholder="Institution"
                className="w-full p-2 mb-2 border rounded"
                value={edu.institution}
                onChange={(e) => handleInputChange(e, index, "education")}
              />
              <input
                type="text"
                name="degree"
                placeholder="Degree"
                className="w-full p-2 mb-2 border rounded"
                value={edu.degree}
                onChange={(e) => handleInputChange(e, index, "education")}
              />
              <input
                type="text"
                name="year"
                placeholder="Year"
                className="w-full p-2 mb-2 border rounded"
                value={edu.year}
                onChange={(e) => handleInputChange(e, index, "education")}
              />
            </div>
          ))}
          <button
            onClick={() => addSection("education")}
            className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Education
          </button>
        </div>

        {/* Experience */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">
            Experience
          </h2>
          {formData.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <input
                type="text"
                name="company"
                placeholder="Company"
                className="w-full p-2 mb-2 border rounded"
                value={exp.company}
                onChange={(e) => handleInputChange(e, index, "experience")}
              />
              <input
                type="text"
                name="role"
                placeholder="Role"
                className="w-full p-2 mb-2 border rounded"
                value={exp.role}
                onChange={(e) => handleInputChange(e, index, "experience")}
              />
              <input
                type="text"
                name="period"
                placeholder="Period (e.g., 2020-2023)"
                className="w-full p-2 mb-2 border rounded"
                value={exp.period}
                onChange={(e) => handleInputChange(e, index, "experience")}
              />
              <textarea
                name="description"
                placeholder="Description"
                className="w-full p-2 mb-2 border rounded"
                value={exp.description}
                onChange={(e) => handleInputChange(e, index, "experience")}
              />
            </div>
          ))}
          <button
            onClick={() => addSection("experience")}
            className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Experience
          </button>
        </div>

        {/* Skills */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">Skills</h2>
          {formData.skills.map((skill, index) => (
            <input
              key={index}
              type="text"
              name="skill"
              placeholder="Skill"
              className="w-full p-2 mb-2 border rounded"
              value={skill}
              onChange={(e) => {
                const updatedSkills = [...formData.skills];
                updatedSkills[index] = e.target.value;
                setFormData({ ...formData, skills: updatedSkills });
                localStorage.setItem(
                  "cvData",
                  JSON.stringify({ ...formData, skills: updatedSkills })
                );
              }}
            />
          ))}
          <button
            onClick={() => addSection("skills")}
            className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Skill
          </button>
        </div>

        <button
          onClick={generatePDF}
          className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
        >
          Generate and Download CV
        </button>
      </div>
    </div>
  );
}
