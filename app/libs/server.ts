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

export async function Belongstocampus(userId: string | undefined) {
  if (!userId) return false;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { belongToCampus: true },
  });

  return user?.belongToCampus ;
}