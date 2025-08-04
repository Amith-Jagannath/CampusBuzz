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
export async function createPost(
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

export async function getPostsByCollegeId(collegeId: string | null) {
  if (!collegeId) return [];
  

  const posts = await prisma.post.findMany({
    where: { collegeId },
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

export async function WhetherUserBelongsOtherThanClub(userId: string | undefined) {
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
if(user?.collegeId) return true;
else return false;
}

export async function BelongsToClubOrNot(userId: string | undefined) {
  if (!userId) return false;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { clubId: true },
  });
  console.log("Belongs to club:", user?.clubId);
if(user?.clubId) return true;
else return false;
}
