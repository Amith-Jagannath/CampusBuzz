import React, { useEffect, useState } from "react";
import CreatePostCard from "./CreatePost";
// Assuming these are server-side functions
import Home from "./Home"; // Assuming you have a Home component for the home feed
import CampusPage from "./CampusPage";

// Define the Post type for better type safety
type Post = {
  id: string;
  description: string;
  postUrl: string | null;
  createdAt: Date;
  collegeId: string;
  userId: string;
  user: {
    username: string;
    image: string;
  };
  comments: {
    id: string;
    postId: string;
    userId: string;
    description: string;
    // Assuming comment also has a user, or we'll display "Anonymous"
    user?: {
      username: string;
    };
  }[];
};

const LoggedInPage = () => {
  const [home, setHome] = useState(true);
  const [campus, setCampus] = useState(false);

  const handleHomeTabClick = () => {
    setHome(true);
    setCampus(false);
  };
  const handleCampusTabClick = () => {
    setHome(false);
    setCampus(true);
  };
  return (
    <main className="flex-1 lg:ml-64 lg:mr-80 p-4 md:p-6 space-y-6 min-h-screen bg-black text-white font-sans">
      {/* Create Post Card */}

      <CreatePostCard />
      <div className="flex space-x-6 border-b border-gray-700 mb-6 text-sm font-medium">
        <button
          onClick={handleHomeTabClick}
          className={`m-2.5 text-gray-400 hover:text-white pb-2 border-b-2 transition-all hover:cursor-pointer ${
            home ? "border-purple-500 text-white" : "border-transparent"
          }`}
        >
          Home
        </button>
        <button
          onClick={handleCampusTabClick}
          className={`text-gray-400 hover:text-white pb-2 border-b-2 transition-all hover:cursor-pointer ${
            campus ? "border-purple-500 text-white" : "border-transparent"
          }`}
        >
          Campus chat
        </button>
      </div>

      {/* Posts Feed */}
      {home && <Home />}
      {campus && <CampusPage />}
    </main>
  );
};

export default LoggedInPage;
