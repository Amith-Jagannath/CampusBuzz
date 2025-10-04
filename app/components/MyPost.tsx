import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getPostsByUserId , deletePostById} from "../libs/server";
import Image from "next/image";

type RawPost = {
  id: string;
  description: string;
  postUrl: string | null;
  createdAt: Date;
  collegeId: string;
  userId: string;
  user: {
    username: string | null;
    image: string | null;
  };
  comments: {
    id: string;
    postId: string;
    userId: string;
    description: string;
    user: {
      username: string | null;
      image: string | null;
    } | null;
  }[];
};

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

const MyPost = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);
  const [expandedPosts, setExpandedPosts] = useState<Record<string, boolean>>(
    {}
  );

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);

  const openDeleteModal = (postId: string) => {
    setPostToDelete(postId);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setPostToDelete(null);
  };

  const confirmDelete = async () => {
    if (!postToDelete) return;
    console.log("Deleting post:", postToDelete);

    await deletePostById(postToDelete);
    setPosts(posts.filter((p) => p.id !== postToDelete));

    closeDeleteModal();
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const rawPosts = await getPostsByUserId(session?.user.id);
        const posts: Post[] = (rawPosts as RawPost[]).map((post) => ({
          id: post.id,
          description: post.description,
          postUrl: post.postUrl ?? null,
          createdAt: post.createdAt,
          collegeId: post.collegeId,
          userId: post.userId,
          user: {
            username: post.user?.username?.trim() ?? "Anonymous",
            image: post.user?.image ?? "/default-avatar.png",
          },
          comments: post.comments.map((comment) => ({
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
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, [session?.user.id]);

  const toggleComments = (postId: string) => {
    setExpandedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  return (
    <>
      {/* MAIN POSTS LIST */}
      <section className="space-y-6 pb-6">
        {posts.length === 0 ? (
          <div className="text-center text-gray-400 py-10">
            No posts yet! Be the first to share something with your campus.
          </div>
        ) : (
          posts.map((post) => {
            const isExpanded = expandedPosts[post.id];
            const visibleComments = isExpanded
              ? post.comments
              : post.comments.slice(0, 2);
            const hasMoreComments = post.comments.length > 2;

            return (
              <div
                key={post.id}
                className="bg-black p-4 sm:p-6 rounded-xl shadow-lg border border-gray-900 transition-all duration-300 ease-in-out"
              >
                {/* HEADER (User + Delete) */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <Image
                      src={post.user.image}
                      alt={`${post.user.username}'s avatar`}
                      className="w-12 h-12 rounded-full mr-4 object-cover border-2"
                      width={48}
                      height={48}
                    />
                    <div>
                      <span className="font-bold text-lg text-white">
                        {post.user.username.trim()}
                      </span>
                      <p className="text-sm text-gray-400">
                        {new Date(post.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>

                  {/* 🗑️ Delete Icon */}
                  <button
                    onClick={() => openDeleteModal(post.id)}
                    className="text-red-400 hover:text-red-600 transition-colors text-xl"
                    title="Delete Post"
                  >
                    🗑️
                  </button>
                </div>

                {/* POST CONTENT */}
                <p className="mb-4 text-gray-200 leading-relaxed">
                  {post.description}
                </p>

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

                {/* ACTION BUTTONS */}
                <div className="flex items-center gap-6 mt-4 pt-4">
                  <button className="flex items-center gap-1 text-base font-medium focus:outline-none">
                    <span className="text-2xl text-red-500 scale-125">❤️</span>
                    <span className="text-white">Likes</span>
                  </button>

                  <button className="flex items-center text-gray-400 hover:text-purple-400 transition-colors duration-200 text-base font-medium">
                    <span className="mr-2 text-xl">💬</span> Comment
                  </button>
                </div>

                {/* COMMENTS */}
                <div className="mt-6 space-y-3">
                  {visibleComments.length === 0 ? (
                    <p className="text-gray-500 text-sm italic">
                      No comments yet!
                    </p>
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

      {/* 🟢 DELETE CONFIRMATION MODAL */}
      {/* 🟢 DELETE CONFIRMATION MODAL */}
{isDeleteModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
    <div className="bg-gray-900/70 backdrop-blur-md rounded-lg shadow-xl p-6 w-full max-w-sm text-center border border-white/20">
      <h2 className="text-xl font-semibold text-white mb-4">
        Confirm Delete
      </h2>
      <p className="text-gray-300 mb-6">
        Are you sure you want to delete this post? This action cannot be
        undone.
      </p>
      <div className="flex justify-center gap-4">
        <button
          onClick={confirmDelete}
          className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-md transition-colors"
        >
          Delete
        </button>
        <button
          onClick={closeDeleteModal}
          className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

    </>
  );
};

export default MyPost;
