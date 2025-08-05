"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import {
  getCollegeIdByUserId,
  getClubIdByUserId,
  createPostForCollege,
  createPostForClub,
} from "../libs/server";

export default function CreatePostCard({ belongsTo }: { belongsTo?: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const { data: session } = useSession();

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const convertToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handlePost = async () => {
    let imageUrl;
    if (imageFile) {
      const base64 = await convertToBase64(imageFile);
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64 }),
      });
      const data = await res.json();
      imageUrl = data.autoCropUrl;
      if (!imageUrl) return;
    }
    if (belongsTo == "college") {
      const collegeId = await getCollegeIdByUserId(session?.user.id);
      await createPostForCollege(
        session?.user.id,
        description,
        imageUrl,
        collegeId
      );
    }
    if (belongsTo == "club") {
      const clubId = await getClubIdByUserId(session?.user.id);
      await createPostForClub(session?.user.id, description, imageUrl, clubId);
    }

    setIsModalOpen(false);
    setDescription("");
    setImage(null);
  };

  return (
    <div className="bg-[#0f0f0f] rounded-xl p-6 shadow-md mb-4">
      {/* <p className="text-sm text-gray-400 mb-2">11:54 AM</p>
      <h2 className="text-xl font-semibold text-white mb-4">Ask Anything...</h2> */}

      <button
        onClick={() => setIsModalOpen(true)}
        className="w-full bg-[#1a1a1a] text-gray-400 text-left px-4 py-3 rounded-lg hover:bg-[#2a2a2a] transition"
      >
        Create a post...
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex justify-center items-center px-4">
          <div className="bg-[#121212] w-full max-w-2xl rounded-2xl p-6 relative">
            <button
              className="absolute top-3 right-4 text-gray-400 text-2xl hover:text-white"
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </button>

            <h3 className="text-white text-lg font-semibold mb-6">
              Create a Post <span className="text-green-500">✔</span>
            </h3>

            <textarea
              className="w-full bg-transparent text-white placeholder-gray-500 text-lg font-medium outline-none resize-none mb-2"
              placeholder="What would you like to share?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
            />

            <p className="text-sm text-gray-500 mb-4">
              Add more details... (optional)
            </p>

            <div className="border-t border-zinc-800 pt-4 flex flex-wrap justify-between items-center">
              <div className="flex gap-4 text-gray-400 text-xl">
                <label htmlFor="file-upload" className="cursor-pointer">
                  <span>🖼️</span>
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
                {/* <span>🎬</span>
                <span>🔗</span>
                <span>📋</span>
                <span>😊</span> */}
              </div>

              <button
                onClick={handlePost}
                className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-sm opacity-70 cursor-not-allowed"
              >
                Next
              </button>
            </div>

            {image && (
              <img
                src={image}
                alt="Preview"
                className="mt-4 rounded-xl w-full max-h-60 object-cover border border-zinc-800"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
