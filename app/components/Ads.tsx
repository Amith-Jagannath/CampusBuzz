import React from "react";
import Image from "next/image";
const Ads = () => {
  return (
    <aside className="w-80 bg-zinc-900 border-l border-zinc-800 p-4 fixed right-0 bottom-0 overflow-y-auto">
      <div className="bg-gradient-to-br from-orange-900 to-red-900 rounded-xl p-4 text-center">
        <h3 className="font-bold text-lg mb-2">
          Round1<sup>ai</sup>
        </h3>
        {/* <Image src="https://via.placeholder.com/100" alt="AI Interview" className="rounded-full mx-auto mb-2" /> */}
        <p className="text-sm text-white mb-2">9 minute ⏱️AI Interviews</p>
        <button className="bg-white text-black px-4 py-2 rounded font-semibold hover:bg-gray-300">
          Try now ↗
        </button>
      </div>
    </aside>
  );
};

export default Ads;
