import React from 'react'
import { useState,useEffect } from 'react';
import { addUserToCampus, addUserToClub, getClubs,getColleges
 } from '../libs/server';
import { GenerateRandomUsername } from '../utils/generateUsername';
const Join = ({ belongsTo, userId ,username_param }: { userId: string, belongsTo: string, username_param: string }) => {
    const [showModal, setShowModal] = useState(true);
    const [items, setDropDownItems] = useState<{ id: string; name: string }[]>([]);
    const [item, setItem] = useState("");
    const [username, setUsername] = useState(username_param)

    const closeModal = () => setShowModal(false);

    useEffect(() => {
       
        const fetchItems = async () => {
          // const username = await  GenerateRandomUsername();
          //         setUsername(username);
          if (belongsTo === 'college') {
            const res = await getColleges();
            setDropDownItems(
              res.map((item:any) => ({ id: item.id, name: item.name }))
            );
          } else if (belongsTo === 'club') {
            const res = await getClubs();
            setDropDownItems(
              res.map((item:any) => ({ id: item.id, name: item.name }))
            );
          }
          
        }
      

      fetchItems();

    }, []);
    const handleJoin = async () => {
      if (belongsTo === 'college') {
        console.log(item, username, userId);
        const res = await addUserToCampus(item,username,userId);
        console.log("User added to campus:", res);
      }
      if( belongsTo === 'club') {
        const res = await addUserToClub(item,username,userId);
        console.log("User added to club:", res);
      }
      setShowModal(false);
    }
  
 return (
  <>
    {showModal && (
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

          {/* Club Selection */}
          <label className="block mb-1 text-sm text-gray-400">{`Select ${belongsTo}`} </label>
          <select
            id="clubselect"
            className="w-full p-2 rounded-lg bg-zinc-900 text-white outline-none border border-zinc-700 mb-6"
            onChange={(e) => setItem(e.target.value)}
            value={item}
          >
            <option value="">{`Choose ${belongsTo}`}</option>
            {items.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name}
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
              onClick={handleJoin}
            >
              Join Campus
            </button>
          </div>
        </div>
      </div>
    )}
  </>
);

}

export default Join;