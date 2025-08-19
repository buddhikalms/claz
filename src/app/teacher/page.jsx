import DownloadBusinessCard from "./[slug]/BusinessCard";

const page = async () => {
  const data = await fetch("http://localhost:3001/api/teachers");
  const posts = await data.json();

  if (!posts) return <p>No profile data</p>;

  return (
    <div>
      <DownloadBusinessCard />
      {posts.map((post) => (
        <li key={post.id}>
          {post.name} _{post.subject}
        </li>
      ))}
    </div>
  );
};

export default page;
