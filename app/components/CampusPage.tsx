import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Join from "./Join";
import {
  AddCommentToPost,
  BelongsToCollegeOrNot,
  getCollegeIdByUserId,
  getPostsByCollegeId,
} from "../libs/server";
import {
  GenerateRandomUsername,
  GenerateRandomUsernameLocal,
} from "../utils/generateUsername";
import CreatePostCard from "./CreatePost";

type Post = {
  id: string;
  description: string;
  postUrl: string | null;
  createdAt: Date;
  collegeId: string;
  userId: string;
  user: {
    username: string;
    image: string;
  };
  comments: {
    id: string;
    postId: string;
    userId: string;
    description: string;
    user?: {
      username: string;
      image?: string;
    };
  }[];
};

const CampusPage = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [join, setJoin] = useState(false);
  const [username, setUsername] = useState("");
  const [beforeJoin, setBeforeJoin] = useState(false);

  const [expandedPosts, setExpandedPosts] = useState<Record<string, boolean>>({});
  const [showCommentBox, setShowCommentBox] = useState<Record<string, boolean>>({});
  const [newComments, setNewComments] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [Joined, setJoined] = useState(false)

  const toggleLike = (postId: string) => {
    setLikedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const toggleComments = (postId: string) => {
    setExpandedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const toggleCommentBox = (postId: string) => {
    setShowCommentBox((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const handleAddComment = async (postId: string) => {
    const commentText = newComments[postId]?.trim();
    if (!commentText) return;
    await AddCommentToPost(postId, session?.user?.id, commentText);

    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [
                {
                  id: crypto.randomUUID(),
                  postId,
                  userId: session?.user?.id ?? "unknown",
                  description: commentText,
                  user: {
                    username: session?.user?.username ?? "Anonymous",
                    image: session?.user?.image || "/default-avatar.png",
                  },
                },
                ...post.comments,
              ],
            }
          : post
      )
    );
    setNewComments((prev) => ({ ...prev, [postId]: "" }));
    setShowCommentBox((prev) => ({ ...prev, [postId]: false }));
  };

  useEffect(() => {
    const getAllPosts = async () => {
      if (!session?.user?.id) {
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const collegeId = await getCollegeIdByUserId(session.user.id);
        if (!collegeId) {
          setError("You don't belong to a campus.");
          setLoading(false);
          return;
        }
        const rawPosts = await getPostsByCollegeId(collegeId);
        const posts: Post[] = rawPosts.map((post: any) => ({
          id: post.id,
          description: post.description,
          postUrl: post.postUrl ?? null,
          createdAt: new Date(post.createdAt),
          collegeId: post.collegeId,
          userId: post.userId,
          user: {
            username: post.user?.username?.trim() ?? "Anonymous",
            image: post.user?.image ?? "/default-avatar.png",
          },
          comments: post.comments.map((comment: any) => ({
            id: comment.id,
            postId: comment.postId,
            userId: comment.userId,
            description: comment.description,
            user: {
              username: comment.user?.username?.trim() ?? "Anonymous",
              image: comment.user?.image ?? "/default-avatar.png",
            },
          })),
        }));
        setPosts(
          posts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        );
      } catch (err) {
        setError("Failed to load posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    const CollegeCheck = async () => {
      const res = await BelongsToCollegeOrNot(session?.user?.id);
      if (res) {
        setBeforeJoin(false);
        setJoin(false);
        getAllPosts();
      } else {
        setLoading(false);
        const username = GenerateRandomUsernameLocal();
        setUsername(username);
        setJoin(true);         // Show Join modal by default
        setBeforeJoin(false);  // Hide beforeJoin prompt
      }
    };
    CollegeCheck();
  }, [session,Joined]);

  if (loading) {
    return (
      <main className="flex-1 lg:ml-64 lg:mr-80 p-4 md:p-6 space-y-6 h-screen overflow-y-auto flex justify-center items-center">
        <div className="text-xl text-gray-400">Loading campus feed...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex-1 lg:ml-64 lg:mr-80 p-4 md:p-6 space-y-6 h-screen overflow-y-auto flex justify-center items-center">
        <div className="text-xl text-red-500">{error}</div>
      </main>
    );
  }

  return (
    <>
     
      {join && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <Join
            belongsTo="college"
            userId={session?.user?.id || ""}
            username_param={username}
            onClose={() => {
              setJoin(false);
              setBeforeJoin(true);
            }}
             onJoined={() => {
             setJoined(true);
     // <-- This triggers useEffect
  }}
          />
        </div>
      )}

      {/* Show join prompt if beforeJoin is true and join is false */}
      {beforeJoin && !join && (
        <div className="flex flex-col items-center justify-center min-h-[40vh]">
          <h1 className="text-4xl font-bold text-center text-purple-400 mb-6">
            Please join campus chat here
          </h1>
          <a
            href="#"
            className="text-lg text-blue-400 underline hover:text-blue-600 transition"
            onClick={(e) => {
              e.preventDefault();
              setJoin(true);
              setBeforeJoin(false);
            }}
          >
            Click here to join
          </a>
        </div>
      )}

      {/* Main content */}
      {!beforeJoin && !join && (
        <>
          <CreatePostCard belongsTo="college" />
          <section className="space-y-6 pb-6">
            {posts.length === 0 ? (
              <div className="text-center text-gray-400 py-10">
                No posts yet! Be the first to share something with your campus.
              </div>
            ) : (
              posts.map((post) => {
                const isExpanded = expandedPosts[post.id];
                const isCommenting = showCommentBox[post.id];
                const visibleComments = isExpanded
                  ? post.comments
                  : post.comments.slice(0, 2);
                const hasMoreComments = post.comments.length > 2;

                return (
                  <div
                    key={post.id}
                    className="bg-black p-4 sm:p-6 rounded-xl shadow-lg border border-gray-900 transition-all duration-300 ease-in-out"
                  >
                    {/* User Info */}
                    <div className="flex items-center mb-4">
                      <Image
                        src={post.user.image}
                        alt={`${post.user.username}'s avatar`}
                        className="w-12 h-12 rounded-full mr-4 object-cover border-2"
                        width={30}
                        height={30}
                      />
                      <div>
                        <span className="font-bold text-lg text-white">
                          {post.user.username.trim()}
                        </span>
                        <p className="text-sm text-gray-400">
                          {new Date(post.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Post Description */}
                    <p className="mb-4 text-gray-200 leading-relaxed">
                      {post.description}
                    </p>

                    {/* Post Image */}
                    {post.postUrl && (
                      <div className="mb-4">
                        <Image
                          src={post.postUrl}
                          alt="Post image"
                          width={150}
                          height={100}
                          className="rounded-lg h-auto w-full object-cover shadow-md"
                        />
                      </div>
                    )}

                    {/* Interaction Buttons */}
                    <div className="flex items-center gap-6 mt-4 pt-4">
                      <button
                        onClick={() => toggleLike(post.id)}
                        className="flex items-center gap-1 text-base font-medium focus:outline-none"
                      >
                        <span
                          className={`text-2xl transition-all duration-300 ${
                            likedPosts[post.id]
                              ? "text-red-500 scale-125"
                              : "text-gray-400 hover:text-red-400"
                          }`}
                        >
                          ❤️
                        </span>
                        <span
                          className={`transition-all duration-300 ${
                            likedPosts[post.id] === true
                              ? "text-white"
                              : "text-gray-400"
                          }`}
                        >
                          {likedPosts[post.id] ? "Liked" : "Like"}
                        </span>
                      </button>

                      <button
                        className="flex items-center text-gray-400 hover:text-purple-400 transition-colors duration-200 text-base font-medium"
                        onClick={() => toggleCommentBox(post.id)}
                      >
                        <span className="mr-2 text-xl">💬</span> Comment
                      </button>
                    </div>

                    {/* Comment Input */}
                    {isCommenting && (
                      <div className="mt-5 w-full overflow-hidden">
                        <div className="flex items-center gap-2 w-full">
                          <input
                            type="text"
                            placeholder="Write a comment..."
                            className="flex-grow p-3 rounded-xl bg-gray-900 text-white placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 min-w-0"
                            value={newComments[post.id] || ""}
                            onChange={(e) =>
                              setNewComments((prev) => ({
                                ...prev,
                                [post.id]: e.target.value,
                              }))
                            }
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                handleAddComment(post.id);
                              }
                            }}
                          />
                          <button
                            onClick={() => handleAddComment(post.id)}
                            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl font-semibold shadow-md transition-all whitespace-nowrap"
                          >
                            Post
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Comments Section */}
                    <div className="mt-6 space-y-3">
                      {visibleComments.length === 0 ? (
                        isCommenting ? null : (
                          <p className="text-gray-500 text-sm italic">
                            No comments yet. Be the first to comment!
                          </p>
                        )
                      ) : (
                        visibleComments.map((comment) => (
                          <div
                            key={comment.id}
                            className="text-sm text-gray-300 bg-black p-1 rounded-lg flex items-start gap-3"
                          >
                            <Image
                              src={comment.user?.image || "/default-avatar.png"}
                              alt="Commenter Avatar"
                              className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                              width={32}
                              height={32}
                            />
                            <div>
                              <p className="font-semibold text-white">
                                {comment.user?.username?.trim() ?? "Anonymous"}
                              </p>
                              <p>{comment.description}</p>
                            </div>
                          </div>
                        ))
                      )}

                      {/* Show More Comments */}
                      {hasMoreComments && (
                        <button
                          onClick={() => toggleComments(post.id)}
                          className="text-purple-400 hover:text-purple-300 font-medium text-sm mt-3 inline-flex items-center"
                        >
                          {isExpanded
                            ? "Show less comments"
                            : `View all ${post.comments.length} comments`}
                          <svg
                            className={`ml-1 w-4 h-4 transition-transform duration-200 ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </section>
        </>
      )}
    </>
  );
};

export default CampusPage;