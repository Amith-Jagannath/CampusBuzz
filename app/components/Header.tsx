import React, { useState } from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Image from "next/image";

const Header = () => {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const OpenEditModal = () => {
    setIsOpen(false);
    setShowEditModal(true);
  };
  const CloseEditModal = () => {
    setShowEditModal(false);
  };

  return (
    <>
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
            <span className="text-xl font-semibold text-white">
              Campus Buzz
            </span>
          </div>

          {/* Hamburger Icon */}
          {status === "authenticated" && (
            <button
              onClick={() => setIsOpen(true)}
              className="text-white focus:outline-none"
            >
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          )}
        </div>
      </header>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Transparent Slide-in Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white/10 backdrop-blur-md z-50 transform transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } duration-300 shadow-xl border-l border-white/20`}
      >
        <div className="flex justify-between items-center px-4 py-4 border-b border-white/20 text-white">
          <h2 className="text-lg font-semibold">Profile</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white text-xl"
          >
            ✕
          </button>
        </div>
        <div className="p-4 text-white">
          <div className="flex flex-col items-center space-y-2">
            <Image
              src={session?.user?.image || "/default-profile.png"}
              alt="User"
              width={70}
              height={70}
              className="rounded-full border-2 border-purple-600"
            />
            <p className="text-lg font-medium">
              {session?.user?.name || "User"}
            </p>
          </div>

          <div className="mt-6 space-y-3">
            <button
              className="w-full text-left px-4 py-2 rounded hover:bg-white/10 transition"
              onClick={OpenEditModal}
            >
              ✏️ Edit Profile
            </button>
            <button className="w-full text-left px-4 py-2 rounded hover:bg-white/10 transition">
              🖼️ Change Image
            </button>
            <button className="w-full text-left px-4 py-2 rounded hover:bg-white/10 transition">
              ⚙️ Settings
            </button>
            <button
              onClick={() => signOut()}
              className="w-full text-left px-4 py-2 rounded text-red-400 hover:bg-white/10 transition"
            >
              🚪 Sign Out
            </button>
          </div>
        </div>
      </div>
      {showEditModal && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex justify-center items-center px-4">
          <div className="bg-[#121212] w-full max-w-2xl rounded-2xl p-6 relative">
            <button
              className="absolute top-3 right-4 text-gray-400 text-2xl hover:text-white"
              onClick={() => CloseEditModal}
            >
              &times;
            </button>

            <h3 className="text-white text-lg font-semibold mb-6">
              Edit profile <span className="text-green-500">✔</span>
            </h3>

            <input
              className="w-full bg-transparent text-white placeholder-gray-500 text-lg font-medium outline-none resize-none mb-2"
              placeholder="What would you name yourself"

              // onChange={(e) => setDescription(e.target.value)}
              // rows={2}
            />

  

            <div className="border-t border-zinc-800 pt-4 flex flex-wrap justify-between items-center">
              <div className="flex gap-4 text-gray-400 text-xl">
                <label htmlFor="file-upload" className="cursor-pointer">
                  <span>🖼️</span>
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    // onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
                {/* <span>🎬</span>
                <span>🔗</span>
                <span>📋</span>
                <span>😊</span> */}
              </div>

              <button
                // onClick={handlePost}
                className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-sm opacity-70 cursor-not-allowed"
              >
                Next
              </button>
            </div>

            <img
              src={session?.user.image || ""}
              alt="Preview"
              className="mt-4 rounded-xl w-full max-h-60 object-cover border border-zinc-800"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
