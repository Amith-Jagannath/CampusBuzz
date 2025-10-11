"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Camera } from "lucide-react";
import {
  getColleges,
  getClubs,
  GetUserDetailsByUserId,
  EditUserBio,
} from "../libs/server"; // your APIs

export default function ProfilePage() {
  const { data: session } = useSession();
  const [username, setUsername] = useState("");
  const [college, setCollege] = useState("");
  const [club, setClub] = useState("");
  const [collegeId, setCollegeId] = useState("");
  const [clubId, setClubId] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [colleges, setColleges] = useState<any[]>([]);
  const [clubs, setClubs] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  // ✅ Load colleges and clubs
  useEffect(() => {
    const loadData = async () => {
      const [collegesData, clubsData] = await Promise.all([
        getColleges(),
        getClubs(),
      ]);
      setColleges(collegesData || []);
      setClubs(clubsData || []);
    };
    loadData();
  }, []);

  // ✅ Fetch user details and prefill data
  useEffect(() => {
    const getUserDetails = async () => {
      if (!session?.user?.id) return;

      const userDetails = await GetUserDetailsByUserId(session.user.id);
      if (userDetails) {
        setUsername(userDetails.username || "");
        setCollege(userDetails.college?.name || "");
        setClub(userDetails.club?.name || "");

        // ✅ store both ID and name
        setCollegeId(userDetails.collegeId || "");
        setClubId(userDetails.clubId || "");

        setImage(userDetails.image || session.user.image || null);
      }
    };
    getUserDetails();
  }, [session]);

  // ✅ Handle saving profile edits
  const handleSave = async () => {
    if (!session?.user?.id) return;
   await EditUserBio(session.user.id, username, image, collegeId, clubId);
    console.log(username, collegeId, clubId, image);
    setIsEditing(false);
  };

  // ✅ Handle image upload preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full flex justify-center mt-12">
      {session ? (
        <div className="w-full max-w-2xl bg-black border border-slate-600 rounded-2xl shadow-2xl p-8 hover:shadow-purple-500/40">
          {/* Profile Header */}
          <div className="flex flex-col items-center mb-8 pb-8 border-b border-slate-700">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-purple-500 shadow-lg">
              <Image
                src={image ? image : session.user.image!}
                alt="User Avatar"
                width={300}
                height={300}
                className="object-cover object-center w-full h-full"
              />

              {isEditing && (
                <label
                  htmlFor="imageUpload"
                  className="absolute bottom-0 right-0 bg-purple-600 p-2 rounded-full cursor-pointer hover:bg-purple-700"
                >
                  <Camera className="text-white w-5 h-5" />
                  <input
                    type="file"
                    id="imageUpload"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              )}
            </div>

            <h2 className="text-2xl font-bold mt-4 text-white">
              {username || "Unnamed User"}
            </h2>
            <p className="text-slate-400 mt-2">{session.user?.email}</p>
          </div>

          {/* Profile Edit Section */}
          <div className="space-y-6">
            {/* Username */}
            <div>
              <label className="text-sm text-slate-400">Username</label>
              <input
                type="text"
                value={username}
                disabled={!isEditing}
                onChange={(e) => setUsername(e.target.value)}
                className={`w-full p-3 mt-1 rounded-lg bg-slate-800 text-white border ${
                  isEditing
                    ? "border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    : "border-slate-700"
                }`}
              />
            </div>

            {/* College */}
            <div>
              <label className="text-sm text-slate-400">College</label>
              {isEditing ? (
                <select
                  value={collegeId}
                  onChange={(e) => {
                    setCollegeId(e.target.value);
                    const selected = colleges.find(
                      (c) => c.id === e.target.value
                    );
                    setCollege(selected?.name || "");
                  }}
                  className="w-full p-3 mt-1 bg-slate-800 text-white border border-purple-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Choose College</option>
                  {colleges.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              ) : (
                <p className="p-3 mt-1 bg-slate-800 text-white rounded-lg border border-slate-700">
                  {college || "Not specified"}
                </p>
              )}
            </div>

            {/* Club */}
            <div>
              <label className="text-sm text-slate-400">Club</label>
              {isEditing ? (
                <select
                  value={clubId}
                  onChange={(e) => {
                    setClubId(e.target.value);
                    const selected = clubs.find(
                      (c) => c.id === e.target.value
                    );
                    setClub(selected?.name || "");
                  }}
                  className="w-full p-3 mt-1 bg-slate-800 text-white border border-purple-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Choose Club</option>
                  {clubs.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              ) : (
                <p className="p-3 mt-1 bg-slate-800 text-white rounded-lg border border-slate-700">
                  {club || "Not specified"}
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 pt-4">
              {isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-2 rounded-lg bg-slate-700 text-white hover:bg-slate-600 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-6 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition"
                  >
                    Save
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-white">Please log in to view your profile.</p>
      )}
    </div>
  );
}
