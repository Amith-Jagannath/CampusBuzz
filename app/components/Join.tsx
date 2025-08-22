import React, { useState, useEffect } from "react";
import { addUserToCampus, addUserToClub, getClubs, getColleges } from "../libs/server";

type JoinProps = {
  userId: string;
  belongsTo: string;
  username_param: string;
  onClose: () => void;
  onJoined: () => void;
};
type College = {
  id: string;
  name: string;
 
};

type Club = {
  id: string;
  name: string;

};

const Join = ({ belongsTo, userId, username_param, onClose, onJoined }: JoinProps) => {
  const [showModal, setShowModal] = useState(true);
  const [items, setDropDownItems] = useState<{ id: string; name: string }[]>([]);
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [username, setUsername] = useState(username_param);
  const [errorMsg, setErrorMsg] = useState("");
  const [isJoining, setIsJoining] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const closeModal = () => {
    setShowModal(false);
    onClose();
  };

  useEffect(() => {
    const fetchItems = async () => {
    try {
      if (belongsTo === "college") {
        const res: College[] = await getColleges();
        setDropDownItems(res.map((item) => ({ id: item.id, name: item.name })));
      } else if (belongsTo === "club") {
        const res: Club[] = await getClubs();
        setDropDownItems(res.map((item) => ({ id: item.id, name: item.name })));
      }
    } catch (error) {
      console.error("Failed to fetch dropdown items:", error);
      // You might also want to set an error state here
    }
  };
    fetchItems();
  }, [belongsTo]);

  const handleJoin = async () => {
    if (!username.trim()) {
      setErrorMsg("Please enter a username.");
      return;
    }
    if (!selectedItem.trim()) {
      setErrorMsg(`Please choose a ${belongsTo}.`);
      return;
    }
    setErrorMsg("");
    setIsJoining(true);

    try {
      if (belongsTo === "college") {
        await addUserToCampus(selectedItem, username, userId);
      }
      if (belongsTo === "club") {
        await addUserToClub(selectedItem, username, userId);
      }
      setShowModal(false);
      onJoined();
    } catch (error) {
      console.log(error);
      setErrorMsg("An error occurred. Please try again.");
    } finally {
      setIsJoining(false);
      onClose();
    }
  };

  const filteredItems = items.filter((i) =>
    i.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex justify-center items-center px-4 backdrop-blur-sm bg-black/40">
          <div
            className="bg-[#121212] text-white w-full max-w-md rounded-2xl p-6 relative border border-zinc-800"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-4 text-gray-400 text-2xl hover:text-white"
              onClick={closeModal}
            >
              &times;
            </button>

            <h2 className="text-lg font-semibold mb-6">
              Enter Details <span className="text-green-500">✔</span>
            </h2>

            {errorMsg && <div className="mb-4 text-red-400 text-sm">{errorMsg}</div>}

            {/* Anonymous Name */}
            <label className="block mb-1 text-sm text-gray-400">Anonymous Name</label>
            <input
              type="text"
              className="w-full p-2 rounded-lg bg-zinc-900 text-white placeholder-gray-500 outline-none border border-zinc-700 mb-4"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              placeholder="Enter a nickname"
            />

            {/* Searchable Club/College */}
            <label className="block mb-1 text-sm text-gray-400">{`Select ${belongsTo}`} </label>
            <div className="relative mb-6">
              <input
                type="text"
                value={search || selectedItem}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSelectedItem("");
                  setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
                placeholder={`Search ${belongsTo}`}
                className="w-full p-2 rounded-lg bg-zinc-900 text-white outline-none border border-zinc-700"
              />
              {showDropdown && filteredItems.length > 0 && (
                <ul className="absolute w-full bg-zinc-900 border border-zinc-700 rounded-lg mt-1 max-h-40 overflow-y-auto z-50">
                  {filteredItems.map((i) => (
                    <li
                      key={i.id}
                      onClick={() => {
                        setSelectedItem(i.name);
                        setSearch(i.name);
                        setShowDropdown(false);
                      }}
                      className="px-3 py-2 cursor-pointer hover:bg-zinc-800"
                    >
                      {i.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-2 rounded-lg text-sm"
                disabled={isJoining}
              >
                Cancel
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-sm ${
                  isJoining
                    ? "bg-purple-400 cursor-not-allowed"
                    : "bg-purple-500 hover:bg-purple-600"
                } text-white`}
                onClick={handleJoin}
                disabled={isJoining}
              >
                {isJoining
                  ? "Joining..."
                  : `Join ${belongsTo.charAt(0).toUpperCase() + belongsTo.slice(1)}`}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Join;
