import React from "react";

const Home = () => {
  return (
    <main className="flex-col items-center space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8">

  {/* Example Ad Post 1 */}
  <div className="space-y-4">
    <div className="bg-[#101010] p-4 rounded-lg border border-yellow-600 shadow-lg">
      <div className="flex items-center gap-2 mb-2">
        <div className="bg-yellow-500 rounded-full w-6 h-6 flex items-center justify-center text-black font-bold">
          ⚡
        </div>
        <span className="text-sm text-yellow-400 font-semibold">Sponsored</span>
      </div>
      <h3 className="font-semibold mb-2">🔥 50% Off Campus Merch!</h3>
      <p className="text-gray-300 text-sm mb-3">
        Grab your favorite hoodies and mugs at half price. Limited time only!
      </p>
      <img
        src="/ads/merch.png"
        alt="Campus Merch"
        className="w-full h-40 object-cover rounded-lg mb-3"
      />
      <a
        href="https://shop.campusbuzz.com"
        target="_blank"
        className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded-lg text-sm font-medium"
      >
        Shop Now
      </a>
    </div>
  </div>

  {/* Example Ad Post 2 */}
  <div className="space-y-4">
  <div className="bg-[#101010] p-4 rounded-lg border border-purple-600 shadow-lg ">
    <div className="flex items-center gap-2 mb-2">
      <div className="bg-gray-300 rounded-full w-6 h-6 flex items-center justify-center text-black font-bold">
        🍎
      </div>
      <span className="text-sm text-gray-300 font-semibold">Sponsored</span>
    </div>

    <h3 className="font-semibold mb-2 text-lg">📱 iPhone 16 Pro — Pre-Book Now</h3>
    <p className="text-gray-300 text-sm mb-3">
      Experience the future with the all-new iPhone 16 Pro. Faster, smarter, and sleeker.  
      Limited stock — don’t miss out!
    </p>

    <img
      src="data:image/jpeg;base64,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"
      alt="iPhone 16 Pro"
      className="w-full h-52 object-cover rounded-lg mb-3"
    />

    <a
      href=""
      target="_blank"
      className="inline-block bg-gray-300 hover:bg-white text-black px-3 py-1 rounded-lg text-sm font-medium"
    >
      Pre-Book Now
    </a>
  </div>
</div>

  <div className="space-y-4">
    <div className="bg-[#101010] p-4 rounded-lg border border-blue-600 shadow-lg">
      <div className="flex items-center gap-2 mb-2">
        <div className="bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center text-black font-bold">
          🎓
        </div>
        <span className="text-sm text-blue-400 font-semibold">Sponsored</span>
      </div>
      <h3 className="font-semibold mb-2">📚 Free Online Course</h3>
      <p className="text-gray-300 text-sm mb-3">
        Learn AI & Machine Learning with free certification from XYZ platform.
      </p>
      <img
        src="/ads/course.png"
        alt="Free Course"
        className="w-full h-40 object-cover rounded-lg mb-3"
      />
      <a
        href="https://learnxyz.com"
        target="_blank"
        className="inline-block bg-blue-500 hover:bg-blue-600 text-black px-3 py-1 rounded-lg text-sm font-medium"
      >
        Enroll Now
      </a>
    </div>
  </div>

</main>

  );
};

export default Home;
