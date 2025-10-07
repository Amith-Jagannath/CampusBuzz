"use server";

import { prisma } from "../utils/db";

export async function getColleges() {
  const colleges = await prisma.college.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return colleges;
}
export async function getClubs() {
  const clubs = await prisma.club.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return clubs;
}

export async function addUserToCampus(
  collegeName: string,
  username: string,
  userId: string | undefined
) {
  console.log(collegeName);
  const collegeId = await prisma.college.findUnique({
    where: { name: collegeName },
    select: { id: true },
  });
 
  if (!collegeId) {
    throw new Error("College not found");
  }

  const res = await prisma.user.update({
    where: { id: userId },
    data: {
      college: { connect: { id: collegeId.id } }, // use the relation field
      username: username,
    },
  });
  console.log("User updated:", res);
}
export async function addUserToClub(
  clubName: string,
  username: string,
  userId: string | undefined
) {
  console.log(clubName);
  const clubId = await prisma.club.findUnique({
    where: { name: clubName },
    select: { id: true },
  });

  if (!clubId) {
    throw new Error("Club not found");
  }

  const res = await prisma.user.update({
    where: { id: userId },
    data: {
      club: { connect: { id: clubId.id } }, // use the relation field
      username: username,
    },
  });
  console.log("User updated:", res);
  return res;
}

export async function Belongstocampus(userId: string | undefined) {
  if (!userId) return false;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { collegeId: true },
  });

  return user?.collegeId;
}

export async function getCollegeIdByUserId(userId: string | undefined) {
  if (!userId) return null;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { collegeId: true },
  });
  console.log("User's college ID:", user?.collegeId);
  return user?.collegeId || null;
}

export async function getClubIdByUserId(userId: string | undefined) {
  if (!userId) return null;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { clubId: true },
  });
  console.log("User's club ID:", user?.clubId);
  return user?.clubId || null;
}
export async function createPostForCollege(
  userId: string | undefined,
  description: string,
  postUrl: string | null,
  collegeId: string | null
) {
  if (!userId || !collegeId) return;

  const post = await prisma.post.create({
    data: {
      description,
      postUrl,
      user: { connect: { id: userId } },
      college: { connect: { id: collegeId } },
    },
  });

  return post;
}
export async function createPostForClub(
  userId: string | undefined,
  description: string,
  postUrl: string | null,
  clubId: string | null
) {
  if (!userId || !clubId) return;

  const post = await prisma.post.create({
    data: {
      description,
      postUrl,
      user: { connect: { id: userId } },
      club: { connect: { id: clubId } },
    },
  });

  return post;
}

export async function getPostsByCollegeId(collegeId: string | null) {
  if (!collegeId) return [];

  const posts = await prisma.post.findMany({
    where: { collegeId },
    include: {
      user: {
        select: { username: true, image: true },
      },
      comments: {
        orderBy: { createdAt: "desc" },
        include: {
          user: {
            select: { username: true, image: true },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return posts;
}
export async function getPostsByClubId(clubId: string | null) {
  if (!clubId) return [];

  const posts = await prisma.post.findMany({
    where: { clubId },
    include: {
      user: {
        select: { username: true, image: true },
      },
      comments: {
        include: {
          user: {
            select: { username: true, image: true },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return posts;
}

export async function AddCommentToPost(
  postId: string,
  userId: string | undefined,
  description: string
) {
  if (!userId || !postId || !description) return;

  const newComment = await prisma.comment.create({
    data: {
      description,
      post: { connect: { id: postId } },
      user: { connect: { id: userId } },
    },
  });

  return newComment;
}

export async function EditUserBio(
  userId: string | undefined,
  username: string,
  imageUrl: string | null
) {
  if (!userId || !username) return;

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      username,
      image: imageUrl,
    },
  });

  return updatedUser;
}

export async function WhetherUserBelongsOtherThanClub(
  userId: string | undefined
) {
  if (!userId) return false;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { collegeId: true },
  });

  return user?.collegeId || "NOT_FOUND";
}

export async function BelongsToCollegeOrNot(userId: string | undefined) {
  if (!userId) return false;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { collegeId: true },
  });
  console.log("Belongs to college:", user?.collegeId);
  if (user?.collegeId) return true;
  else return false;
}

export async function BelongsToClubOrNot(userId: string | undefined) {
  if (!userId) return false;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { clubId: true },
  });
  console.log("Belongs to club:", user?.clubId);
  if (user?.clubId) return true;
  else return false;
}

export async function getCollegeNameByID(collegeId: string | null) {
  if (!collegeId) return null;

  const college = await prisma.college.findUnique({
    where: { id: collegeId },
    select: { name: true },
  });
  console.log("College name:", college?.name);
  return college?.name || null;
}

export async function getClubNameByID(clubId: string | null) {
  if (!clubId) return null;

  const club = await prisma.club.findUnique({
    where: { id: clubId },
    select: { name: true },
  });
  console.log("Club name:", club?.name);
  return club?.name || null;
}

export async function getPostsByUserId(userId: string | undefined) {
  if (!userId) return [];
  
  const posts = await prisma.post.findMany({
    where: { userId },
    include: {
      user: {
        select: { username: true, image: true },
      },
      comments: {
        include: {
          user: {
            select: { username: true, image: true },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return posts;
}

export async function deletePostById(postId: string) {
  if (!postId) return;

  await prisma.post.delete({
    where: { id: postId },
  });
}
export async function GetUserDetailsByUserId(userId: string) {
  if (!userId) return null;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      college: {
        select: { name: true },
      },
      club: {
        select: { name: true },
      },
    },
  });

  return user;
}