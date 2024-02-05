import express from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import jwtvalidate from '../middleware/jwt-validate.middleware.js';

const prisma = new PrismaClient();
const router = express.Router();

router.post('/sign-up', async (req, res) => {
  const { email, password, passwordConfirm, name } = req.body;
  if (!email) {
    return res
      .status(400)
      .json({ succes: false, message: '이메일은 필수값입니다.' });
  }
  if (!password) {
    return res
      .status(400)
      .json({ succes: false, message: '비밀번호는 필수값입니다.' });
  }
  if (!passwordConfirm) {
    return res
      .status(400)
      .json({ succes: false, message: '비밀번호 확인은 필수값입니다.' });
  }
  if (!name) {
    return res
      .status(400)
      .json({ succes: false, message: '이름은 필수값입니다.' });
  }
  if (password.length < 6) {
    return res
      .status(400)
      .json({ succes: false, message: '비밀번호는 최소 6자 이상입니다.' });
  }
  if (password !== passwordConfirm) {
    return res.status(400).json({
      succes: false,
      message: '비밀번호와 비밀번호 확인값이 일치하지 않습니다.',
    });
  }

  const user = await prisma.user.findFirst({
    where: { email },
  });

  if (user) {
    return res
      .status(400)
      .json({ succes: false, message: '사용할 수 없는 이메일 입니다.' });
  }

  await prisma.user.create({
    data: {
      email,
      password,
      name,
    },
  });

  return res.status(201).json({
    email,
    name,
  });
});

router.post('/sign-in', async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: '이메일은 필수값입니다.' });
  }
  if (!password) {
    return res
      .status(400)
      .json({ success: false, message: '비밀번호는 필수값입니다.' });
  }

  const user = await prisma.user.findFirst({
    where: {
      email,
      // password, 
    },
  });
  
  if (!user) {
    return res
      .status(401)
      .json({ success: false, message: '올바르지 않는 로그인 정보입니다.' });
  }
  // console.log("user");
  // 로그인 성공
  //   const accessToken = jwt.sign({ userId: user.userId }, 'resume@#');
  //   return res.cookie('authorization', `Bearer ${accessToken}`);
  // });
  const token = jwt.sign(
    {
      userId: user.userId,
    },
    'custom-secret-key'
  );
  return res.cookie('authorization', `Bearer ${token}`);
}); 
router.get('/me', jwtvalidate, (req, res) => {
  const user = res.locals.user;
  return res.json({
    email: user.email,
    name: user.name,
  });
});
export default router;
