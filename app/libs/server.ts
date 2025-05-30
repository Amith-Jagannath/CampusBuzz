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
}
