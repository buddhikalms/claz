import React from "react";
import TeacherProfile from "./ProfileDetails";

async function Page({ params }) {
  const { slug } = params;
  // Fetch teacher data (example)
  const res = await fetch(`http://localhost:3001/api/teachers/${slug}`);
  const data = await res.json();

  console.log("Teacher data:", data); // Debug the data

  return (
    <div>
      <TeacherProfile details={data} />
    </div>
  );
}

export default Page;
