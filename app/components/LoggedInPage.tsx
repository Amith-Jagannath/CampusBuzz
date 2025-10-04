import React, {  useState } from "react";
// Assuming these are server-side functions
import Home from "./Home"; // Assuming you have a Home component for the home feed

import CampusPage from "./CampusPage"; // Assuming you have a CampusPage component for campus feed
import Club from "./ClubPage"; // Assuming you have a Club component for club feed
import MyPost from "./MyPost";

// Define the Post type for better type safety


const LoggedInPage = () => {
  const [home, setHome] = useState(true);
  const [campus, setCampus] = useState(false);
  const [club,setClub] = useState(false);
  const [myPost, setMyPost] = useState(false);
  const [profile, setProfile] = useState(false);

  const handleHomeTabClick = () => {
    setHome(true);
    setCampus(false);
     setProfile(false);
    setMyPost(false);
    setClub(false);
  };
  const handleCampusTabClick = () => {
    setHome(false);
    setCampus(true);
     setProfile(false);
    setMyPost(false);
    setClub(false);
  };
  const handleClubTabClick = () => {
    setHome(false);
    setCampus(false);
    setProfile(false);
    setMyPost(false);
    setClub(true);
  };
  const handleMyPostTabClick = () => {
    setHome(false);
    setCampus(false);
    setClub(false);
    setProfile(false);
    setMyPost(true);
  }
  const handleProfileTabClick = () => {
    setHome(false);
    setCampus(false);
    setClub(false);
    setMyPost(false);
    setProfile(true);
  };
  return (
    <main className="flex-1 lg:ml-64 lg:mr-80 p-4 md:p-6 space-y-6 min-h-screen bg-black text-white font-sans">
      {/* Create Post Card */}

      
      <div className="flex space-x-6 border-b border-gray-700 mb-6 text-sm font-medium">
        <button
          onClick={handleHomeTabClick}
          className={` text-gray-400 hover:text-white pb-2 border-b-2 transition-all hover:cursor-pointer ${
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
          Campus
        </button>

        <button
          onClick={handleClubTabClick}
          className={` text-gray-400 hover:text-white pb-2 border-b-2 transition-all hover:cursor-pointer ${
            club ? "border-purple-500 text-white" : "border-transparent"
          }`}
        >
          Club
        </button>
        <button
          onClick={handleMyPostTabClick}
          className={` text-gray-400 hover:text-white pb-2 border-b-2 transition-all hover:cursor-pointer ${
            myPost ? "border-purple-500 text-white" : "border-transparent"
          }`}
        >
          My Post
        </button>
        <button
          onClick={handleProfileTabClick}
          className={` text-gray-400 hover:text-white pb-2 border-b-2 transition-all hover:cursor-pointer ${
            profile ? "border-purple-500 text-white" : "border-transparent"
          }`}
        >
          Profile
        </button>
      </div>
     

      {/* Posts Feed */}
      {home && <Home />}
      {campus && <CampusPage />}
      {club && <Club />}
      {myPost && <MyPost />}
    </main>
  );
};

export default LoggedInPage;
