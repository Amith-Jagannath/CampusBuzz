import React from "react";
import CreatePostCard from "./CreatePost";
const CampusMainPage = () => {
  const posts = [
  {
    id: 1,
    username: 'Aarav Mehta',
    userImage: 'https://randomuser.me/api/portraits/men/75.jpg',
    description: 'Exploring the mountains this weekend! 🏔️❄️',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470',
    comments: [
      {
        commenter: 'Neha Sharma',
        text: 'Wow! This looks amazing 🌟',
      },
      {
        commenter: 'Rohan Singh',
        text: 'Take me with you next time 😄',
      },
    ],
  },
  {
    id: 2,
    username: 'Isha Verma',
    userImage: 'https://randomuser.me/api/portraits/women/65.jpg',
    description: 'Finally completed my assignment. Time for a nap 😴',
    image: null,
    comments: [
      {
        commenter: 'Aman Joshi',
        text: 'Same here 😅',
      },
    ],
  },
];


  return (
    <main className="flex-1 ml-64 mr-80 p-6  space-y-6 h-screen">
      <CreatePostCard />

      <div className="space-y-6 pb-6">
  {posts.map((post) => (
    <div
      key={post.id}
      className="bg-zinc-800 p-4 rounded-lg shadow-md text-white"
    >
      {/* User Info */}
      <div className="flex items-center mb-3">
        <img
          src={post.userImage}
          alt={`${post.username} profile`}
          className="w-10 h-10 rounded-full mr-3"
        />
        <span className="font-semibold">{post.username}</span>
      </div>

      {/* Post Description */}
      <p className="mb-2">{post.description}</p>

      {/* Post Image */}
      {post.image && (
        <img
          src={post.image}
          alt="Post"
          className="w-3/4 rounded-lg mt-2 object-cover"
        />
      )}

      {/* Like & Comment Buttons */}
      <div className="flex gap-4 mt-4 text-sm text-gray-300">
        <button className="hover:text-white transition">❤️ Like</button>
        <button className="hover:text-white transition">💬 Comment</button>
      </div>

      {/* Comments Section */}
      <div className="mt-4 space-y-2">
        {post.comments.map((comment, idx) => (
          <div key={idx} className="text-sm text-gray-300">
            <span className="font-semibold text-white">{comment.commenter}: </span>
            {comment.text}
          </div>
        ))}
      </div>
    </div>
  ))}
</div>

    </main>
  );
};

export default CampusMainPage;
