import React, { useEffect, useState } from 'react';
import { WhetherUserBelongsOtherThanClub } from '../libs/server';
import { GenerateRandomUsername} from '../utils/generateUsername';
import { getClubs } from '../libs/server';
import { addUserToClub } from '../libs/server';
const ClubPage = ({ userId }: { userId: string }) => {
  const [showModal, setShowModal] = useState(false);
  const [clubs, setclubs] = useState<{ id: string; name: string }[]>([]);
  const [club, setclub] = useState("");
  const [username, setUsername] = useState("")

  const closeModal = () => setShowModal(false);

  useEffect(() => {
    const checks = async () => {
      const res = await WhetherUserBelongsOtherThanClub(userId);
      if (res === 'NOT_FOUND') {
        console.log("Eligible to join club");
        const username = await  GenerateRandomUsername();
        setUsername(username);
        setShowModal(true);
      } else {
        console.log("Not eligible to join club");
      }
    };
    const fetchclubs = async () => {
      const res = await getClubs();
      setclubs(
        res.map((club) => ({ id: club.id, name: club.name }))
      );
      console.log("club:", res);
    };

    fetchclubs();

    checks();
  }, []);
  const handleJoinClub = async () => {
    const res = await addUserToClub(
      club,
      username,
      userId
    );
    console.log("User added to club:", res);
    setShowModal(false);
  };



  return (
    <div>
      <h1>Club</h1>
      <p>Welcome to the club page!</p>
      {showModal &&<>
   <div className="fixed inset-0 z-50 flex justify-center items-center px-4 backdrop-blur-sm bg-black/40">
  <div
    className="bg-[#121212] text-white w-full max-w-md rounded-2xl p-6 relative border border-zinc-800"
    onClick={(e) => e.stopPropagation()}
  
  >
    {/* Optional close button */}
    <button
      className="absolute top-3 right-4 text-gray-400 text-2xl hover:text-white"
      onClick={closeModal}
    >
      &times;
    </button>

    <h2 className="text-lg font-semibold mb-6">
      Enter Details <span className="text-green-500">✔</span>
    </h2>

    {/* Anonymous Name */}
    <label className="block mb-1 text-sm text-gray-400">Anonymous Name</label>
    <input
      type="text"
      className="w-full p-2 rounded-lg bg-zinc-900 text-white placeholder-gray-500 outline-none border border-zinc-700 mb-4"
      onChange={(e) => setUsername(e.target.value)}
      value={username}
      placeholder="Enter a nickname"
    />

    {/* club Selection */}
    <label className="block mb-1 text-sm text-gray-400">Select club</label>
    <select
      id="clubselect"
      className="w-full p-2 rounded-lg bg-zinc-900 text-white outline-none border border-zinc-700 mb-6"
      onChange={(e) => setclub(e.target.value)}
      value={club}
    >
      <option value="">Choose club</option>
      {clubs.map((clubObj) => (
        <option key={clubObj.id} value={clubObj.name}>
          {clubObj.name}
        </option>
      ))}
    </select>

    {/* Buttons */}
    <div className="flex justify-end gap-3">
      <button
        onClick={closeModal}
        className="bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-2 rounded-lg text-sm"
      >
        Cancel
      </button>
      <button
        className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-sm"
        onClick={handleJoinClub}
      >
        Join Campus
      </button>
    </div>
  </div>
  </div>
      
      
      
      
      
      
      </>}
    </div>
  )
}

export default ClubPage;