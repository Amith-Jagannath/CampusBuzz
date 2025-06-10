import { useState } from "react";

export default function CreatePostCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [description, setDescription] = useState("");

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handlePost = () => {
    // Your post logic here
    console.log("Posting:", { description, image });
    setIsModalOpen(false);
    setDescription("");
    setImage(null);
  };

  return (
    <div className="bg-zinc-800 rounded-xl p-6 text-center">
      <p className="text-sm text-gray-400 mb-2">11:38 AM</p>
      <h2 className="text-xl font-semibold text-white mb-4">Ask Anything...</h2>

      <button
        onClick={() => setIsModalOpen(true)}
        className="w-full flex items-center justify-between bg-zinc-700 text-white px-4 py-3 rounded-lg hover:bg-zinc-600 transition"
      >
        <span className="text-gray-400">Create a post...</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0  flex items-center justify-center  bg-opacity-20 backdrop-blur-sm z-40">
          <div className="bg-zinc-800 p-6 rounded-xl w-full max-w-md mx-4 relative">
            <button
              className="absolute top-2 right-3 text-gray-400 hover:text-white text-xl"
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </button>
            <h3 className="text-lg font-semibold text-white mb-4">
              Create Post
            </h3>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full p-3 rounded bg-zinc-700 text-white placeholder-gray-400 focus:outline-none resize-none h-24 mb-4"
            />

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mb-4 w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-purple-600 file:text-white hover:file:bg-purple-700"
            />

            {image && (
              <img
                src={image}
                alt="Preview"
                className="w-full max-h-60 object-cover rounded mb-4"
              />
            )}

            <button
              onClick={handlePost}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md font-medium transition"
            >
              Post
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
