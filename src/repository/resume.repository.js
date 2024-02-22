import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const selectAllSortedResumes = async (sort) => {
  const resumes = await prisma.resume.findMany({
    select: {
      resumeId: true,
      title: true,
      content: true,
      user: {
        select: {
          name: true,
        },
      },
      createdAt: true,
    },
    orderBy: {
      [sort.orderkey]: sort.orderValue,
    },
  });
  return resumes;
};

const selectOneResumeByResumeId = async (resumeId) => {
  const resume = await prisma.resume.findFirst({
    where: {
      resumeId: +resumeId,
    },
    select: {
      resumeId: true,
      title: true,
      content: true,
      status: true,
      user: {
        select: {
          name: true,
        },
      },
      createdAt: true,
    },
  });
  return resume;
};

const createResume = async (data) => {
  await Prisma.resume.create({
    data,
  });
};

export {selectAllSortedResumes,selectOneResumeByResumeId,createResume};
