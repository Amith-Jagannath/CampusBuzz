import React from "react";
import { useState } from "react";
const Navigation = () => {
  const [showModal, setShowModal] = useState(false);
  

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  return (
    <aside className="  border-r border-zinc-800 h-screen fixed overflow-y-auto bg-[#1a1a2e]/80 rounded-xl p-4 backdrop-blur-md shadow-lg w-64">
      {/* <div className="text-3xl font-bold mb-6 text-orange-400">grapevine</div> */}
      <nav className="space-y-4">
        <div className="space-y-2">
          <button className="flex items-center gap-2 hover:text-orange-400">
            <span>🏠</span> <span>Home</span>
          </button>
          <button className="flex items-center gap-2 hover:text-orange-400">
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
  );
};

export default Navigation;
