import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { getColleges, getClubs, GetUserDetailsByUserId } from "../libs/server"; // your APIs

interface StyledInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
}

const Profile: React.FC = () => {
  const { data: session } = useSession();

  // initial values
  const [username, setUsername] = useState(session?.user?.name || "");
  const [college, setCollege] = useState("");
  const [club, setClub] = useState("");
  const [bio] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState("");
  const [colleges, setColleges] = useState<{ id: string; name: string }[]>([]);
  const [clubs, setClubs] = useState<{ id: string; name: string }[]>([]);

  // fetch dropdowns
  const fetchDropdownData = async () => {
    try {
      const [collegeRes, clubRes] = await Promise.all([
        getColleges(),
        getClubs(),
      ]);
      setColleges(collegeRes.map((c: any) => ({ id: c.id, name: c.name })));
      setClubs(clubRes.map((c: any) => ({ id: c.id, name: c.name })));
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    fetchDropdownData();
  };

  const handleSave = () => {
    setIsEditing(false);
    setStatus("Profile updated successfully!");
    setTimeout(() => setStatus(""), 3000);
    console.log({ username, college, club, bio });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setStatus("Editing cancelled.");
    setTimeout(() => setStatus(""), 3000);
  };

  const StyledInput: React.FC<StyledInputProps> = ({
    label,
    value,
    onChange,
    placeholder = "",
    disabled = false,
  }) => (
    <div className="flex flex-col space-y-1 w-full max-w-md">
      <label className="text-sm font-medium text-slate-400">{label}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full p-3 bg-black text-white border ${
          disabled ? "border-slate-800" : "border-purple-500"
        } rounded-lg shadow-inner transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500`}
      />
    </div>
  );
  useEffect(() => {
    const getUserDetails = async () => {
      const userDetails = await GetUserDetailsByUserId(
        session?.user?.id as string
      );
      if (userDetails) {
        setUsername(userDetails.username || "");
        setCollege(userDetails.college?.name || "");
        setClub(userDetails.club?.name || "");
        //  setBio(userDetails.bio || "");
      }
    };

    getUserDetails();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-4 flex justify-center items-start pt-10">
      <div className="w-full max-w-2xl">
        {session ? (
          <div className="bg-black border border-slate-600 rounded-2xl shadow-2xl p-8 hover:shadow-purple-500/40">
            {/* Profile Header */}
            <div className="flex flex-col items-center mb-8 pb-8 border-b border-slate-700">
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-purple-500 shadow-lg">
                {session.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || "User Avatar"}
                    width={128}
                    height={128}
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-purple-600 flex items-center justify-center text-4xl font-bold">
                    {session.user?.name ? session.user.name[0] : "U"}
                  </div>
                )}
              </div>
              <h2 className="mt-4 text-2xl font-bold text-white">
                {session.user?.name || "Unnamed User"}
              </h2>
              <p className="text-sm text-gray-400">{session.user?.email}</p>
            </div>

            {/* Editable Fields */}
            <div className="flex flex-col gap-6 items-center">
              {/* Username - always editable */}
              <StyledInput
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                disabled={!isEditing} // always editable
              />

              {/* College */}
              {isEditing ? (
                <div className="flex flex-col space-y-1 w-full max-w-md">
                  <label className="text-sm font-medium text-slate-400">
                    College / Institution
                  </label>
                  <select
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    className="w-full p-3 bg-slate-800 text-white border border-purple-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Choose College</option>
                    {colleges.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <StyledInput
                  label="College / Institution"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  placeholder="Select college"
                  disabled={true}
                />
              )}

              {/* Club */}
              {isEditing ? (
                <div className="flex flex-col space-y-1 w-full max-w-md">
                  <label className="text-sm font-medium text-slate-400">
                    Club / Affiliation
                  </label>
                  <select
                    value={club}
                    onChange={(e) => setClub(e.target.value)}
                    className="w-full p-3 bg-slate-800 text-white border border-purple-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Choose Club</option>
                    {clubs.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <StyledInput
                  label="Club / Affiliation"
                  value={club}
                  onChange={(e) => setClub(e.target.value)}
                  placeholder="Select club"
                  disabled={true}
                />
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-center gap-4 mt-10">
              {status && (
                <p className="text-sm text-green-400 self-center">{status}</p>
              )}
              {isEditing ? (
                <>
                  <button
                    onClick={handleCancel}
                    className="px-6 py-2 border border-red-500 text-red-400 rounded-lg font-semibold hover:bg-red-900/40 transition duration-300 shadow-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition duration-300 shadow-xl shadow-purple-500/30"
                  >
                    Save Changes
                  </button>
                </>
              ) : (
                <button
                  onClick={handleEdit}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition duration-300 shadow-xl shadow-purple-500/30"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center bg-slate-900/50 p-8 rounded-xl shadow-lg border border-slate-600">
            <p className="text-lg text-yellow-400">
              Please log in to view and manage your profile.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
