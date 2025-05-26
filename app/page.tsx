"use client";

import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Navigation from "./components/Navigation";
import MainContent from "./components/MainContent";
import Ads from "./components/Ads";
export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="text-white p-10">Loading...</div>;
  }

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
                className="border border-purple-400 hover:bg-purple-800 text-purple-300 font-semibold py-2 px-6 rounded-full transition"
                onClick={() => signIn()}
              >
                Log in
              </button>
            </div>
          </section>
        ) : (
          <div className="flex w-full">
            <Navigation />
            <MainContent />
            {/* <Ads /> */}
          </div>
        )}
      </main>
    </div>
  );
}
