"use client";

import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Navigation from "./components/Navigation";
import { useEffect } from "react";
import MainContent from "./components/MainContent";
import { useState } from "react";
export default function Home() {
  const { data: session, status } = useSession();
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState("");
  const colleges = [
    "NMAM Institute Of Technolgy, Nitte",
    "MIT Engineering College, Manipal",
    "Alvas College of Engineering, Moodidri",
  ];
  const openModal = async () => {
    const res = await fetch("/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt:
          "Please generate a random username for my application user, just return one username without any extra character, since your response will be set as the username",
      }),
    });

    const data = await res.json();
    console.log(data);
    setUsername(data.result);
    setShowModal(true);
  };
  const closeModal = () => setShowModal(false);
  if (status === "loading") {
    return <div className="text-white p-10">Loading...</div>;
  }
  const handleJoinCampus = () => {

  }

  useEffect(() => {
    first
  
    return () => {
      second
    }
  }, [])
  

  return (
    <div className="bg-[#0e0b1f] text-white font-sans min-h-screen">
      {/* Fixed Top Header */}
      <header className="fixed top-0 left-0 right-0 bg-[#0e0b1f] z-50 border-b border-zinc-800">
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between p-6">
          {/* Left Section */}
          <div className="flex items-center space-x-2">
            <div className="bg-purple-600 p-2 rounded-md">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2 5a2 2 0 012-2h2l4 4H18a2 2 0 012 2v2a2 2 0 01-2 2h-8l-4 4H4a2 2 0 01-2-2V5z" />
              </svg>
            </div>
            <span className="text-xl font-semibold">Campus Buzz</span>
          </div>

          {/* Right Section */}
          {status == "authenticated" ? (
            <button
              onClick={() => signOut()}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md font-medium transition"
            >
              Sign Out
            </button>
          ) : (
            ""
          )}
        </div>
      </header>

      {/* Scrollable Content */}
      <main className="pt-28">
        {status === "unauthenticated" ? (
          <section className="w-full max-w-7xl mx-auto text-center px-4">
            {/* Hero Section and content */}
            <h1 className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">
              Engage with Your Campus Community
            </h1>
            <p className="text-gray-300 mb-10">
              Stay connected and informed with latest campus news, events, and
              discussions.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="bg-[#16132e] p-6 rounded-xl shadow-md">
                <div className="text-purple-400 mb-2">
                  <svg
                    className="w-6 h-6 mx-auto"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 10c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a8.963 8.963 0 01-4.9-1.479l-3.255.813a.75.75 0 01-.912-.912l.812-3.255A8.963 8.963 0 012 10z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">Anonymous Confessions</h3>
                <p className="text-sm text-gray-400 mt-2">
                  Share your thoughts without revealing your identity. Be heard
                  safely.
                </p>
              </div>

              <div className="bg-[#16132e] p-6 rounded-xl shadow-md">
                <div className="text-purple-400 mb-2">
                  <svg
                    className="w-6 h-6 mx-auto"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M6 2a1 1 0 00-1 1v1H5a2 2 0 00-2 2v1h14V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H8V3a1 1 0 00-1-1zM3 8v8a2 2 0 002 2h10a2 2 0 002-2V8H3z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">Upcoming Events</h3>
                <p className="text-sm text-gray-400 mt-2">
                  Discover and RSVP to campus events and activities.
                </p>
              </div>

              <div className="bg-[#16132e] p-6 rounded-xl shadow-md">
                <div className="text-purple-400 mb-2">
                  <svg
                    className="w-6 h-6 mx-auto"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M18 10c0 3.866-3.582 7-8 7a8.963 8.963 0 01-4.9-1.479l-3.255.813a.75.75 0 01-.912-.912l.812-3.255A8.963 8.963 0 012 10c0-3.866 3.582-7 8-7s8 3.134 8 7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">Join Discussions</h3>
                <p className="text-sm text-gray-400 mt-2">
                  Discuss the formal things informally
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-center space-y-3 md:space-y-0 md:space-x-4">
              <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-full transition">
                Get Started
              </button>
              <button
                className="border border-purple-400 hover:bg-purple-800 text-purple-300 font-semibold py-2 px-6 rounded-full transition hover:cursor-pointer"
                onClick={() => signIn()}
              >
                Log in
              </button>
            </div>
          </section>
        ) : (
          <div className="flex w-full">
            <aside className="  border-r border-zinc-800 h-screen fixed overflow-y-auto bg-[#1a1a2e]/80 rounded-xl p-4 backdrop-blur-md shadow-lg w-64">
              {/* <div className="text-3xl font-bold mb-6 text-orange-400">grapevine</div> */}
              <nav className="space-y-4">
                <div className="space-y-2">
                  <button className="flex items-center gap-2 hover:text-orange-400 hover:cursor-pointer">
                    <span>🏠</span> <span>Home</span>
                  </button>
                  <button
                    className="flex items-center gap-2 hover:text-orange-400 hover:cursor-pointer"
                    onClick={openModal}
                  >
                    <span>🏢</span> <span>Connect with campus</span>
                  </button>
                </div>

                <div className="space-y-1 mt-4 text-sm">
                  <details className="group">
                    <summary className="cursor-pointer group-hover:text-orange-400">
                      Careers
                    </summary>
                  </details>
                  <details className="group">
                    <summary className="cursor-pointer group-hover:text-orange-400">
                      Sectors
                    </summary>
                  </details>
                  <details className="group">
                    <summary className="cursor-pointer group-hover:text-orange-400">
                      What's Happening
                    </summary>
                  </details>
                  <details className="group">
                    <summary className="cursor-pointer group-hover:text-orange-400">
                      Interests
                    </summary>
                  </details>
                  <details className="group">
                    <summary className="cursor-pointer group-hover:text-orange-400">
                      Cities
                    </summary>
                  </details>
                  <details className="group">
                    <summary className="cursor-pointer group-hover:text-orange-400">
                      For everything else
                    </summary>
                  </details>
                </div>
              </nav>
            </aside>
            <MainContent />
            {/* <Ads /> */}
          </div>
        )}
      </main>
      {showModal && (
        <>
          {/* Blurred background */}
          <div
            className="fixed inset-0  bg-opacity-20 backdrop-blur-sm z-40"
            onClick={closeModal}
          ></div>

          {/* Modal box */}
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white text-black rounded-xl p-6 w-full max-w-md shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Enter Details</h2>

              <label className="block mb-2">Anonymous name</label>
              <input
                type="text"
                className="w-full p-2 border rounded mb-4"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />

              <label className="block mb-2">Select College</label>
              <select
                id="collegeSelect" // Good for accessibility
                className="w-full p-2 border rounded mb-4"
              >
                <option value="">Choose College</option>{" "}
                {/* Default/placeholder option */}
                {colleges.map((college, index) => (
                  <option key={index} value={college}>
                    {college}
                  </option>
                ))}
              </select>

              <div className="flex justify-end gap-2">
                <button
                  onClick={closeModal}
                  className="bg-gray-300 px-4 py-2 rounded hover:cursor-pointer"
                >
                  Cancel
                </button>
                <button className="bg-purple-600 text-white px-4 py-2 rounded hover:cursor-pointer" onClick={handleJoinCampus}>
                  Join campus
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
