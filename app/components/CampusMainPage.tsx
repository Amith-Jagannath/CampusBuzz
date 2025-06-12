import React, { useEffect, useState } from "react";
import CreatePostCard from "./CreatePost";
import { useSession } from "next-auth/react";
import { getCollegeIdByUserId } from "../libs/server";
import { getPostsByCollegeId } from "../libs/server"; // Assuming this function exists to fetch posts
const CampusMainPage = () => {
  const { data: session } = useSession();
  const [expandedPosts, setExpandedPosts] = useState<{
    [key: number]: boolean;
  }>({});
  const [showCommentBox, setShowCommentBox] = useState<{
    [key: number]: boolean;
  }>({});
  const [newComments, setNewComments] = useState<{ [key: number]: string }>({});

  const toggleComments = (postId: number) => {
    setExpandedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const toggleCommentBox = (postId: number) => {
    setShowCommentBox((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const handleCommentChange = (postId: number, value: string) => {
    setNewComments((prev) => ({
      ...prev,
      [postId]: value,
    }));
  };

  const handleAddComment = (postId: number) => {
    const commentText = newComments[postId]?.trim();
    if (!commentText) return;

    // You can replace this with a backend call later
    const commenter = "You"; // Replace with actual username

    posts = posts.map((post) =>
      post.id === postId
        ? {
            ...post,
            comments: [...post.comments, { commenter, text: commentText }],
          }
        : post
    );

    // Clear input and hide input box
    setNewComments((prev) => ({ ...prev, [postId]: "" }));
    setShowCommentBox((prev) => ({ ...prev, [postId]: false }));
  };
  useEffect(() => {
    const getAllPosts = async () => {
      console.log("Session", session?.user.id);
      const collegeId = await getCollegeIdByUserId(session?.user.id);
      console.log("CollegeId", collegeId);
      const posts = await getPostsByCollegeId(collegeId);
      console.log(posts);
    };
    getAllPosts();
  }, []);

  // Posts stored in memory (can later be refactored to state/db)
  let posts = [
    {
      id: 1,
      username: "Aarav Mehta",
      userImage: "https://randomuser.me/api/portraits/men/75.jpg",
      description: "Exploring the mountains this weekend! 🏔️❄️",
      image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
      comments: [
        { commenter: "Neha Sharma", text: "Wow! This looks amazing 🌟" },
        { commenter: "Rohan Singh", text: "Take me with you next time 😄" },
        { commenter: "Kriti Rao", text: "Absolutely stunning!" },
      ],
    },
    {
      id: 2,
      username: "Isha Verma",
      userImage: "https://randomuser.me/api/portraits/women/65.jpg",
      description: "Finally completed my assignment. Time for a nap 😴",
      image: null,
      comments: [
        { commenter: "Aman Joshi", text: "Same here 😅" },
        { commenter: "Priya Yadav", text: "Assignment gang unite! 😎" },
      ],
    },
  ];

  return (
    <main className="flex-1 ml-64 mr-80 p-6 space-y-6 h-screen overflow-y-auto">
      <CreatePostCard />

      <div className="space-y-6 pb-6">
        {posts.map((post) => {
          const isExpanded = expandedPosts[post.id];
          const isCommenting = showCommentBox[post.id];
          const visibleComments = isExpanded
            ? post.comments
            : post.comments.slice(0, 2);
          const hasMoreComments = post.comments.length > 2;

          return (
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
                <button
                  className="hover:text-white transition"
                  onClick={() => toggleCommentBox(post.id)}
                >
                  💬 Comment
                </button>
              </div>

              {/* Comment Input */}
              {isCommenting && (
                <div className="mt-3 flex gap-2 items-center">
                  <input
                    type="text"
                    placeholder="Write a comment..."
                    className="flex-1 p-2 rounded bg-zinc-700 text-white placeholder-gray-400"
                    value={newComments[post.id] || ""}
                    onChange={(e) =>
                      handleCommentChange(post.id, e.target.value)
                    }
                  />
                  <button
                    onClick={() => handleAddComment(post.id)}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded hover:cursor-pointer"
                  >
                    Post
                  </button>
                </div>
              )}

              {/* Comments Section */}
              <div className="mt-4 space-y-2">
                {visibleComments.map((comment, idx) => (
                  <div key={idx} className="text-sm text-gray-300">
                    <span className="font-semibold text-white">
                      {comment.commenter}:{" "}
                    </span>
                    {comment.text}
                  </div>
                ))}

                {/* Read More / Show Less */}
                {hasMoreComments && (
                  <button
                    onClick={() => toggleComments(post.id)}
                    className="text-blue-400 hover:underline text-sm mt-1"
                  >
                    {isExpanded
                      ? "Show less"
                      : `Read more (${post.comments.length - 2} more)`}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default CampusMainPage;
