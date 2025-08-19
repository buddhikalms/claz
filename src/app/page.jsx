import React from "react";
import Banner from "@/app/(Home)/Banner";
import PopularTeachers from "@/app/(Home)/PopularTeachers";

const page = async () => {
  const data = await fetch("http://localhost:3001/api/teachers");
  const teachers = await data.json();
  return (
    <>
      <Banner />
      <PopularTeachers teachers={teachers} />
      <h1>Hello test one</h1>
    </>
  );
};

export default page;
