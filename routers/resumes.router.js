import express from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import jwtvalidate from '../middleware/jwt-validate.middleware.js';

const prisma = new PrismaClient();

const router = express.Router();

router.get('/', async (req, res) => {
  const orderkey = req.query.orderkey ?? 'resumeId';
  const orderValue = req.query.orderValue ?? 'desc';

  if (!['resumeId', 'status'].includes(orderkey)) {
    return res.status(400).json({
      success: false,
      message: 'orderKey가 올바르지 않습니다.',
    });
  }
  if (!['asc', 'desc'].includes(orderValue.toLowerCase())) {
    return res.status(400).json({
      success: false,
      message: 'orderKey가 올바르지 않습니다.',
    });
  }

  const resumes = await prisma.resumes.findMany({
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
      [orderkey]: orderValue.toLowerCase(),
    },
  });
  resumes.forEach((resume) => {
    resume.name = resume.user.name;
    delete resume.user;
  });

  return res.json({ data: resumes });
});

export default router;
