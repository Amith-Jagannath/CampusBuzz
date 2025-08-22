"use client";
import React from "react";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useEffect } from "react";
import { addUserToCampus, getColleges } from "../libs/server";
import { useRouter } from "next/navigation";
import { Belongstocampus } from "../libs/server";
import LoggedInPage from "./LoggedInPage";
// import MainContent from './MainContent'
type MainContentProps = {
  InsideCampus: boolean;
};
const MainContent = ({ InsideCampus }: MainContentProps) => {
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState("");
  const [college, setCollege] = useState("");
  // const [collegeId, setCollegeId] = useState("");
  // const [colleges, setColleges] = useState<string[]>([]);
  const [colleges, setColleges] = useState<{ id: string; name: string }[]>([]);
  const { data: session, status } = useSession();
  const router = useRouter();
  const handleJoinCampus = async () => {
    if (college == "") {
      alert("Please select a college");
      return;
    }

    const res = await addUserToCampus(college, username, session?.user.id);
    console.log(username, college);
    const selectedCollege = colleges.find((c) => c.name === college);
    const collegeId = selectedCollege ? selectedCollege.id : null;
    router.push(`/campus/${collegeId}`);
  };

  const openModal = async () => {
    const belongsTo = await Belongstocampus(session?.user.id);
    console.log("Belong:", belongsTo);
    if (belongsTo) {
      ///He she is a member of campus
      router.push(`/campus/${belongsTo}`);
      return;
    }
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
  useEffect(() => {
    const fetchColleges = async () => {
      const res = await getColleges();

      setColleges(
        res.map((college) => ({ id: college.id, name: college.name }))
      );
      console.log("college:", res);
      closeModal();
    };

    fetchColleges();
  }, []);
  return (
    <>
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
            {/* <aside className="  border-r border-zinc-800 h-screen fixed overflow-y-auto bg-[#1a1a2e]/80 rounded-xl p-4 backdrop-blur-md shadow-lg w-64">
             
              <nav className="space-y-4">
                <div className="space-y-2">
                  <button
                    className="flex items-center gap-2 hover:text-orange-400 hover:cursor-pointer"
                    onClick={() => router.push("/")}
                  >
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
            </aside> */}

           <LoggedInPage userId={session?.user.id || ""} />
            {/* {InsideCampus ? <CampusMainPage /> : <Home />} */}
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
                onChange={(e) => setCollege(e.target.value)}
              >
                <option value="">Choose College</option>{" "}
                {/* Default/placeholder option */}
                {colleges.map((collegeObj) => (
                  <option key={collegeObj.id} value={collegeObj.name}>
                    {collegeObj.name}
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
                <button
                  className="bg-purple-600 text-white px-4 py-2 rounded hover:cursor-pointer"
                  onClick={handleJoinCampus}
                >
                  Join campus
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MainContent;